import { type File } from '../../hooks/usePlayground';
import { getVueTransformImports as transformImports } from '../transformImports';
import { getVueCompiler as compileFile } from '../compilerFile';
import type { CompiledFile, FileCache } from '../../types';
import { IMPORT_VUE_MAP } from './data';

// 默认的 Import Map 配置
const IMPORT_MAP: Record<string, string> = { ...IMPORT_VUE_MAP };
type CachedFile = FileCache & { hash: number };

function hashContent(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return hash;
}

function revokeLater(url: string) {
  setTimeout(() => URL.revokeObjectURL(url), 15_000);
}

function createEntryModuleCode(files: File[]) {
  const hasRouter = files.some((f) => f.name === 'router.js');
  const hasAppVue = files.some((f) => f.name === 'App.vue');

  if (!hasAppVue) return '';

  return [
    `import { createApp } from "vue";`,
    hasRouter ? `import router from "src/router.js";` : ``,
    `import App from "src/App.vue";`,
    `import { createPinia } from "pinia";`,
    `const pinia = createPinia();`,
    `const app = createApp(App);`,
    hasRouter ? `app.use(router);` : ``,
    `app.use(pinia);`,
    `app.mount("#app");`
  ]
    .filter(Boolean)
    .join('\n');
}

// 缓存已编译的文件
const fileCache = new Map<string, CachedFile>();
let routerShimUrl: string | null = null;

// 组合成html
export async function generateVueHtml(files: File[], vueId: string, consoleScript: string) {
  const currentNames = new Set(files.map((f) => f.name));
  for (const [name, cached] of fileCache.entries()) {
    if (!currentNames.has(name)) {
      fileCache.delete(name);
      revokeLater(cached.blobUrl);
    }
  }

  const fileNamesKey = Array.from(currentNames).sort().join('|');

  // 3. 转换 import 并生成 Blob URL（增量）
  const importMap: Record<string, string> = { ...IMPORT_MAP };
  if (!routerShimUrl) {
    const routerShim = `
import * as orig from 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13';
export * from 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13';

// 核心修复：强制使用 Memory 模式，完全解耦浏览器 URL
export const createWebHistory = (base) => orig.createMemoryHistory(base);
export const createWebHashHistory = (base) => orig.createMemoryHistory(base);
export const createMemoryHistory = orig.createMemoryHistory;

export const createRouter = (options) => {
  // 强制覆盖 history 模式
  options.history = orig.createMemoryHistory();
  // 移除 base 配置，防止干扰 MemoryHistory
  if (options.base) delete options.base;
  
  const router = orig.createRouter(options);
  
  // 注入全局对象以便通信
  window.v_router = router;
  if (window.initRouterSync) window.initRouterSync(router);
  
  return router;
};
`;
    const shimBlob = new Blob([routerShim], { type: 'text/javascript' });
    routerShimUrl = URL.createObjectURL(shimBlob);
  }
  importMap['vue-router'] = routerShimUrl;

  const transformPromises = files.map(async (file) => {
    const contentHash = hashContent(`${file.content}\n${fileNamesKey}`);
    const cached = fileCache.get(file.name);
    if (cached && cached.hash === contentHash) {
      importMap[`src/${file.name}`] = cached.blobUrl;
      return;
    }

    const compiled = (await compileFile(file.name, file.content)) as CompiledFile;
    const rawCode = compiled.code ?? '';
    const rawCss = compiled.css ?? '';

    let finalCode = rawCode;
    try {
      finalCode = await transformImports(rawCode, files);
    } catch {
      finalCode = rawCode;
    }

    const blob = new Blob([finalCode], { type: 'text/javascript' });
    const blobUrl = URL.createObjectURL(blob);

    if (cached) revokeLater(cached.blobUrl);
    fileCache.set(file.name, {
      code: finalCode,
      css: rawCss,
      blobUrl,
      hash: contentHash
    });
    importMap[`src/${file.name}`] = blobUrl;
  });

  await Promise.all(transformPromises);

  // 4. 确定入口脚本
  let entryScript = '';
  // 优先查找 main.js
  if (fileCache.has('main.js')) {
    entryScript = `<script type="module" src="${importMap['src/main.js']}"></script>`;
  } else {
    // 降级：查找 App.vue 并自动挂载
    const appFile = files.find((f) => f.name === 'App.vue') || files[0];
    if (appFile) {
      const entryModuleCode = createEntryModuleCode(files);
      if (!entryModuleCode) return '<h1>Error: No App.vue found</h1>';
      entryScript = `<script type="module">\n${entryModuleCode}\n</script>`;
    } else {
      return '<h1>Error: No App.vue or main.js found</h1>';
    }
  }

  // 5. 组装 HTML
  const allCss = Array.from(fileCache.values())
    .map((f) => f.css || '')
    .join('\n');

  const routerScript = `
<script>
window.__PLAYGROUND_INSTANCE_ID__ = "${vueId}";

(function() {
  // 1. 消息处理器：使用闭包变量防止污染
  const handleParentMessage = (e) => {
    const { type, path, id } = e.data;
    if (id !== window.__PLAYGROUND_INSTANCE_ID__) return;

    if (type === 'PUSH_ROUTE' && path) {
      const tryPush = (count = 0) => {
        if (window.v_router) {
          // 性能优化：直接处理纯净路径，不再进行复杂的字符串拼接
          const target = path.startsWith('#') ? path.slice(1) : path;
          syncedFromParent = true;
          // 使用 push 而不是 replace，以支持历史记录堆栈
          const doPush = () => {
            window.v_router
              .push(target)
              .then(() => {
                notifyParent(window.v_router.currentRoute.value.fullPath);
              })
              .catch(() => {});
          };
          if (window.v_router.isReady) {
            window.v_router.isReady().then(doPush).catch(doPush);
          } else {
            doPush();
          }
        } else if (count < 10) {
          setTimeout(() => tryPush(count + 1), 100);
        }
      };
      tryPush();
    }

    if (type === 'GO_BACK') {
      if (window.v_router) window.v_router.go(-1);
      else history.back();
    }
    if (type === 'GO_FORWARD') {
      if (window.v_router) window.v_router.go(1);
      else history.forward();
    }
  };

  window.addEventListener('message', handleParentMessage);

  // 2. 核心通知函数：增加频率限制（Debounce 思想）
  let lastPath = '';
  let syncedFromParent = false;
  function notifyParent(path) {
    if (path === lastPath) return; // 性能优化：路径没变不发消息
    lastPath = path;
    
    window.parent.postMessage({
      type: 'ROUTER_CHANGE',
      path: path,
      id: window.__PLAYGROUND_INSTANCE_ID__
    }, '*');
  }


  // 3. 核心挂载钩子
  window.initRouterSync = (router) => {
    window.v_router = router;
    
    // 监听路由变化
    router.afterEach((to) => {
      if (!syncedFromParent) return;
      notifyParent(to.fullPath);
    });

    // 初始握手：等待 router 完成初始导航后再发 READY
    // 避免 router 还没 install/mount 时 push 无效
    const sendReady = () => {
      // 强制触发一次导航到当前路径，确保 router-view 渲染
      // MemoryHistory 模式下，有时初始导航不会自动触发组件渲染
      const current = router.currentRoute.value.fullPath;
      if (current === '/') {
        // 如果是根路径，显式 replace 一次以激活组件
        router.replace('/').catch(() => {});
      }
      
      window.parent.postMessage(
        {
          type: 'ROUTER_READY',
          id: window.__PLAYGROUND_INSTANCE_ID__
        },
        '*'
      );
    };
    if (router.isReady) {
      router.isReady().then(sendReady).catch(sendReady);
    } else {
      setTimeout(sendReady, 0);
    }
  };
   // 4. 全局点击拦截
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('blob:')) {
      return;
    }

    if (e.defaultPrevented) return;

    e.preventDefault();
    
    const navigate = () => {
      const router = window.v_router;
      if (router) {
        const path = href.startsWith('#') ? href.slice(1) : href;
        if (router.navigate) {
          router.navigate(path);
        } else if (router.history) {
          router.history.push(path);
        }
      } else {
        // 修复2：修正为 Vue Router 提示，移除 React 相关内容
        console.warn('Playground Router not found. Please ensure you are using vue-router.');
      }
    };

    if (!window.v_router) {
      setTimeout(navigate, 0);
    } else {
      navigate();
    }
  }); 
 // 5. 禁止任何可能导致 SecurityError 的原生 History 操作
  // 核心修复：在使用 MemoryHistory 时，禁止所有对浏览器 History 的原生操作
  // 这能彻底防止 SecurityError 和 意外的 URL 变化
  (function() {
    function noop() {}
    try {
      history.pushState = noop;
      history.replaceState = noop;
      history.go = noop;
      history.back = noop;
      history.forward = noop;
    } catch(e) {
      // ignore errors if history is frozen
    }
  })();
 
})();
</script>
`;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script type="importmap">
          ${JSON.stringify({ imports: importMap })}
        </script>
          ${routerScript}
        ${consoleScript}
        <style>
          body { margin: 0; font-family: sans-serif; }
          ${allCss}
        </style>
      </head>
      <body>
        <div id="app"></div>
        ${entryScript}
      </body>
    </html>
  `;
}
