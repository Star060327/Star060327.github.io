import { type File } from '../../hooks/usePlayground';
import { getReactTransformImports as transformImports } from '../transformImports.ts';
import { getReactCompiler as compileFile } from '../compilerFile.ts';
import type { CompiledFile, FileCache } from '../../types/index.ts';

//  定义 importmap 映射，将第三方库映射到 CDN 地址
const IMPORT_MAP: Record<string, string> = {
  react: 'https://esm.sh/react@18.3.1?dev',
  'react-dom': 'https://esm.sh/react-dom@18.3.1?dev',
  'react-dom/client': 'https://esm.sh/react-dom@18.3.1/client?dev',
  'react/jsx-runtime': 'https://esm.sh/react@18.3.1/jsx-runtime?dev',
  'react-router-dom': 'https://esm.sh/react-router-dom@6?dev&external=react,react-dom',
  zustand: 'https://esm.sh/zustand@4.5.7?dev&external=react,react-dom,use-sync-external-store',
  'zustand/middleware':
    'https://esm.sh/zustand@4.5.7/middleware?dev&external=react,react-dom,use-sync-external-store',
  'zustand/vanilla': 'https://esm.sh/zustand@4.5.7/vanilla?dev&external=react,react-dom',
  'use-sync-external-store':
    'https://esm.sh/use-sync-external-store@1.2.0?dev&external=react,react-dom',
  'use-sync-external-store/shim':
    'https://esm.sh/use-sync-external-store@1.2.0/shim?dev&external=react,react-dom',
  'use-sync-external-store/shim/with-selector':
    'https://esm.sh/use-sync-external-store@1.2.0/shim/with-selector?dev&external=react,react-dom',
  'use-sync-external-store/shim/with-selector.js':
    'https://esm.sh/use-sync-external-store@1.2.0/shim/with-selector?dev&external=react,react-dom'
};

const fileCache = new Map<string, FileCache>();

// 组合成html
export async function generateReactHtml(files: File[], reactId: string, consoleScript: string) {
  // 1. 清理旧 URL
  fileCache.forEach((f) => URL.revokeObjectURL(f.blobUrl));
  fileCache.clear();
  // 存储编译后的文件
  const compiledMap = new Map<string, CompiledFile>();

  // 2. 编译所有文件 (并行)
  const compilePromises = files.map(async (file) => {
    const res = await compileFile(file.content, file.name);
    compiledMap.set(file.name, { ...res });
  });
  try {
    await Promise.all(compilePromises);
  } catch (e) {
    console.error('编译文件失败:', e);
  }

  // 3. 转换 import 并生成 Blob URL (并行)
  const importMap: Record<string, string> = { ...IMPORT_MAP };

  {
    const routerShim = `
import React from 'react';
import * as ReactRouterDOM from 'https://esm.sh/react-router-dom@6?dev&deps=react@18.3.1,react-dom@18.3.1';
export * from 'https://esm.sh/react-router-dom@6?dev&deps=react@18.3.1,react-dom@18.3.1';

// 强制使用 MemoryRouter，适配 Playground 环境
export function createBrowserRouter(routes, opts) {
  const router = ReactRouterDOM.createMemoryRouter(routes, opts);
  if (typeof window !== 'undefined') {
    window.v_router = router;
    if (window.initRouterSync) window.initRouterSync(router);
  }
  return router;
}


// 核心修复：拦截 BrowserRouter 和 HashRouter 组件，强制使用 MemoryRouter
export function BrowserRouter({ children, ...props }) {
  const routerRef = React.useRef(null);
  if (!routerRef.current) {
     const routes = [{ path: "*", element: React.createElement(React.Fragment, null, children) }];
     routerRef.current = ReactRouterDOM.createMemoryRouter(routes, props);
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.v_router = routerRef.current;
      if (window.initRouterSync) window.initRouterSync(routerRef.current);
    }
  }, []);

  return React.createElement(ReactRouterDOM.RouterProvider, { router: routerRef.current });
}

export function HashRouter({ children, ...props }) {
  const routerRef = React.useRef(null);
  if (!routerRef.current) {
     const routes = [{ path: "*", element: React.createElement(React.Fragment, null, children) }];
     routerRef.current = ReactRouterDOM.createMemoryRouter(routes, props);
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.v_router = routerRef.current;
      if (window.initRouterSync) window.initRouterSync(routerRef.current);
    }
  }, []);

  return React.createElement(ReactRouterDOM.RouterProvider, { router: routerRef.current });
}
`;
    const shimBlob = new Blob([routerShim], { type: 'text/javascript' });
    const shimUrl = URL.createObjectURL(shimBlob);
    importMap['react-router-dom'] = shimUrl;
  }

  const transformPromises = files.map(async (file) => {
    const compiled = compiledMap.get(file.name)!;
    // 转换 import 路径为 src/xxx 形式
    try {
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
    } catch (e) {
      console.error(`文件import路径转换失败 ${file.name}:`, e);
    }
  });

  await Promise.all(transformPromises);

  // 4. 确定入口脚本
  let entryScript = '';
  // 优先查找 main.jsx 或 main.tsx
  const entryFile = files.find((f) => f.name === 'main.jsx' || f.name === 'main.tsx');

  if (entryFile && fileCache.has(entryFile.name)) {
    entryScript = `<script type="module" src="${importMap[`src/${entryFile.name}`]}"></script>`;
  } else {
    // 降级：查找 App.jsx 或 App.tsx 并自动挂载
    const appFile = files.find((f) => f.name === 'App.jsx' || f.name === 'App.tsx') || files[0];
    if (appFile) {
      entryScript = `
        <script type="module">
          import { createRoot } from 'react-dom/client'
          import App from 'src/${appFile.name}' 
          const root = createRoot(document.getElementById('root'))
      root.render(
    <App />
)
        </script>
      `;
    } else {
      return '<h1>Error: No App.jsx or main.jsx found</h1>';
    }
  }

  // 5. 组装 HTML
  const allCss = Array.from(fileCache.values())
    .map((f) => f.css || '')
    .join('\n');

  const routerScript = `
<script>
window.__PLAYGROUND_INSTANCE_ID__ = "${reactId}";

(function() {
  // 1. 消息处理器
  const handleParentMessage = (e) => {
    const { type, path, id } = e.data;
    if (id !== window.__PLAYGROUND_INSTANCE_ID__) return;

    if (type === 'PUSH_ROUTE' && path) {
      const tryPush = (count = 0) => {
        if (window.v_router) {
          const router = window.v_router;
          window.__syncedFromParent = true;
          
          const doPush = () => {
            if (router.navigate) {
              router.navigate(path).catch(console.error);
            } else if (router.history) {
              router.history.push(path);
            }
          };
          
          if (router.state && router.state.initialized === false) {
             setTimeout(doPush, 50);
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
       if (window.v_router?.navigate) window.v_router.navigate(-1);
       else if (window.v_router?.history) window.v_router.history.back();
       else history.back();
    }

    if (type === 'GO_FORWARD') {
       if (window.v_router?.navigate) window.v_router.navigate(1);
       else if (window.v_router?.history) window.v_router.history.forward();
       else history.forward();
    }
  };

  window.addEventListener('message', handleParentMessage);

  // 2. 路由同步逻辑
  let lastPath = '';
  // 3. 发送消息给父窗口
  function notifyParent(location) {
    const path = (location.pathname || '/') + (location.search || '') + (location.hash || '');
    if (path === lastPath) return; 
    lastPath = path;
    window.parent.postMessage({
      type: 'ROUTER_CHANGE',
      path: path,
      id: window.__PLAYGROUND_INSTANCE_ID__
    }, '*');
  }

  window.initRouterSync = (router) => {
    window.v_router = router;
    
    // 立即同步初始路径
    if (router.state?.location) {
      notifyParent(router.state.location);
    }

    if (router.subscribe) {
      router.subscribe((state) => {
         
        //  如果这次变化是由父窗口指令触发的，我们不应该再通知父窗口
         if (window.__syncedFromParent) {
            window.__syncedFromParent = false;
            return
         }
        notifyParent(state.location);
      });
    }

    setTimeout(() => {
      window.parent.postMessage({ type: 'ROUTER_READY', id: window.__PLAYGROUND_INSTANCE_ID__ }, '*');
    }, 100);
  };

  // 3. 全局点击拦截
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
        console.warn('Playground Router not found. Please ensure you are using BrowserRouter or createBrowserRouter from react-router-dom.');
      }
    };

    // 给 React 一点时间处理可能的并发渲染
    if (!window.v_router) {
      setTimeout(navigate, 0);
    } else {
      navigate();
    }
  }, false);
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
          ${consoleScript}
          ${routerScript}
        <style>
          body { margin: 0;padding: 0; font-family: sans-serif; }
          ${allCss}
        </style>
      </head>
      <body>
        <div id="root"></div>
        ${entryScript}
      </body>
    </html>
  `;
}
