import { parse, compileScript, compileStyle } from '@vue/compiler-sfc';
import { parse as parseImports, init } from 'es-module-lexer';
import type { File } from '@/components/VuePlayground/hooks/useVuePlayground';

// 每个文件的编译结果
interface CompiledFile {
  code: string;
  css?: string;
}
// 转换结果
interface FileCache {
  code: string;
  css?: string;
  blobUrl: string;
}

// 缓存已编译的文件
const fileCache = new Map<string, FileCache>();

// 默认的 Import Map 配置
const IMPORT_MAP: Record<string, string> = {
  vue: 'https://esm.sh/vue@3.5.13',
  'vue-router': 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13',
  pinia: 'https://esm.sh/pinia@2.1.7?deps=vue@3.5.13'
};

/**
 * 利用 es-module-lexer 转换代码中的 import 语句
 * 将本地文件 import 转换为 src/文件名 的形式，以便通过 importmap 解析
 */
async function transformImports(code: string, files: File[]) {
  await init;
  const [imports] = parseImports(code);
  let transformed = code;
  const fileNames = new Set(files.map((f) => f.name));

  for (let i = imports.length - 1; i >= 0; i--) {
    const { s, e, n } = imports[i];
    if (!n) continue;

    // 1. 如果是已知第三方库，不做替换，交给 importmap
    if (IMPORT_MAP[n]) continue;

    // 2. 处理本地文件 import
    // 移除 ./ 前缀
    const cleanName = n.replace(/^\.\//, '');

    // 简单的文件名匹配逻辑
    let targetFile = '';
    if (fileNames.has(cleanName)) {
      targetFile = cleanName;
    } else if (fileNames.has(cleanName + '.vue')) {
      targetFile = cleanName + '.vue';
    } else if (fileNames.has(cleanName + '.js')) {
      targetFile = cleanName + '.js';
    }

    if (targetFile) {
      // 统一替换为 src/文件名，并将在 importmap 中注册
      const replacement = `src/${targetFile}`;
      transformed = transformed.slice(0, s) + replacement + transformed.slice(e);
    } else if (!n.startsWith('http') && !n.startsWith('.')) {
      // 3. 未知第三方库，走 esm.sh
      const replacement = `https://esm.sh/${n}`;
      transformed = transformed.slice(0, s) + replacement + transformed.slice(e);
    }
  }
  return transformed;
}

/**
 * 利用 @vue/compiler-sfc 将 SFC 编译为 JS
 */
async function compileFile(filename: string, code: string): Promise<CompiledFile> {
  if (filename.endsWith('.js')) return { code };
  if (!filename.endsWith('.vue')) return { code };

  try {
    const { descriptor, errors } = parse(code, { filename });
    if (errors.length > 0) {
      throw new Error(errors[0].message);
    }

    const id = Math.random().toString(36).slice(2, 10);
    const scriptResult = compileScript(descriptor, {
      id,
      inlineTemplate: true
    });

    const css = descriptor.styles
      .map(
        (s) =>
          compileStyle({
            id,
            filename,
            source: s.content,
            scoped: s.scoped
          }).code
      )
      .join('\n');

    return { code: scriptResult.content, css };
  } catch (e) {
    console.error(`Compilation error in ${filename}:`, e);
    return {
      code: `console.error(\`Compilation error in ${filename}: \${${JSON.stringify(String(e))}}\`)`,
      css: ''
    };
  }
}
// 组合成html
export async function generatePlaygroundHtml(files: File[], instanceId: string, vueId: string) {
  // 1. 清理旧 URL
  fileCache.forEach((f) => URL.revokeObjectURL(f.blobUrl));
  fileCache.clear();

  const compiledMap = new Map<string, CompiledFile>();

  // 2. 编译所有文件
  for (const file of files) {
    const res = await compileFile(file.name, file.content);
    compiledMap.set(file.name, res);
  }

  // 3. 转换 import 并生成 Blob URL
  const importMap: Record<string, string> = { ...IMPORT_MAP };
  {
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
    const shimUrl = URL.createObjectURL(shimBlob);
    importMap['vue-router'] = shimUrl;
  }

  for (const file of files) {
    const compiled = compiledMap.get(file.name)!;
    // 转换 import 路径为 src/xxx 形式
    const finalCode = await transformImports(compiled.code, files);

    const blob = new Blob([finalCode], { type: 'text/javascript' });
    const blobUrl = URL.createObjectURL(blob);

    fileCache.set(file.name, {
      code: finalCode,
      css: compiled.css,
      blobUrl
    });

    // 注册到 importmap: src/Filename.vue -> blobUrl
    importMap[`src/${file.name}`] = blobUrl;
  }

  // 记录 shimUrl 以便后续清理 (利用 fileCache 机制)
  if (importMap['vue-router']) {
    fileCache.set('__router_shim__', {
      code: '',
      blobUrl: importMap['vue-router']
    });
  }

  // 4. 确定入口脚本
  let entryScript = '';
  // 优先查找 main.js
  if (fileCache.has('main.js')) {
    entryScript = `<script type="module" src="${importMap['src/main.js']}"></script>`;
  } else {
    // 降级：查找 App.vue 并自动挂载
    const appFile = files.find((f) => f.name === 'App.vue') || files[0];
    if (appFile) {
      entryScript = `
        <script type="module">
          import { createApp } from 'vue'
          import App from 'src/${appFile.name}'
          createApp(App).mount('#app')
        </script>
      `;
    } else {
      return '<h1>Error: No App.vue or main.js found</h1>';
    }
  }

  // 5. 组装 HTML
  const allCss = Array.from(fileCache.values())
    .map((f) => f.css || '')
    .join('\n');

  const consoleScript = `
        <script>
          (function() {
            const instanceId = "${instanceId}";
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            const originalInfo = console.info;

            function sendLog(type, args) {
              try {
                const message = args.map(arg => {
                  if (typeof arg === 'object') {
                    try {
                      return JSON.stringify(arg);
                    } catch(e) {
                      return String(arg);
                    }
                  }
                  return String(arg);
                }).join(' ');
                window.parent.postMessage({ type: 'console', id: instanceId, log: { type, message } }, '*');
              } catch (e) {
                // ignore
              }
            }

            console.log = function(...args) {
              originalLog.apply(console, args);
              sendLog('log', args);
            };
            console.error = function(...args) {
              originalError.apply(console, args);
              sendLog('error', args);
            };
            console.warn = function(...args) {
              originalWarn.apply(console, args);
              sendLog('warn', args);
            };
            console.info = function(...args) {
              originalInfo.apply(console, args);
              sendLog('info', args);
            };

            window.onerror = function(msg, url, line, col, error) {
              let detailedMsg = String(msg);
              if (url) {
                const cleanUrl = url.startsWith('blob:') ? 'script.js' : url;
                detailedMsg += '\\nAt: ' + cleanUrl + ':' + line + ':' + col;
              }
              if (error && error.stack) {
                detailedMsg += '\\n\\nStack Trace:\\n' + error.stack;
              }
              sendLog('error', [detailedMsg]);
              return false;
            };

    // 拦截所有 A 标签，防止其逃逸到父窗口
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      
      // 如果是普通外部链接，完全禁止跳转
      if (!href || href.startsWith('http') || href.startsWith('//')) {
        e.preventDefault();
        console.warn('预览模式下禁止外部链接跳转');
        return;
      }

      // 内部链接，尝试通过 router 跳转
      e.preventDefault();
      const path = href.replace(/^#/, ''); // 兼容 hash 写法
      
      if (window.v_router) {
        window.v_router.push(path);
      } else {
        console.warn('Router not ready or not found');
      }
    }, true);

            // 拦截表单提交
            document.addEventListener('submit', function(e) {
              e.preventDefault();
              const form = e.target;
              const action = form.getAttribute('action');
              console.warn('预览模式下禁止表单提交: ' + (action || '无动作'));
            }, true);
          })();
        </script>
      `;

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

  // 4. 禁止任何可能导致 SecurityError 的原生 History 操作
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
