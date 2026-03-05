
import { type File } from "../../hooks/usePlayground";
import { getReactTransformImports as transformImports } from "../transformImports";
import { getReactCompiler as compileFile } from "../compilerFile";
import type { CompiledFile, FileCache } from "../../types";
import { IMPORT_REACT_MAP } from "./data";

//  定义 importmap 映射，将第三方库映射到 CDN 地址
const IMPORT_MAP: Record<string, string> = { ...IMPORT_REACT_MAP };

type CachedFile = FileCache & { hash: number };

function hashContent(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return hash;
}

function createEntryModuleCode(files: File[]) {
  const entryApp =
    files.find((f) => f.name === "App.jsx" || f.name === "App.tsx") || null;
  if (!entryApp) return "";

  return [
    `import React from "react";`,
    `import { createRoot } from "react-dom/client";`,
    `import * as AppModule from "src/${entryApp.name}";`,
    `const el = document.getElementById("root");`,
    `if (!el) throw new Error("Missing #root");`,
    `const root = createRoot(el);`,
    `const App = AppModule.default ?? AppModule.App;`,
    `const Fallback = () => React.createElement("pre", { style: { padding: 16, whiteSpace: "pre-wrap" } }, "App 入口模块缺少可用导出（期望 default 或 App）。\\n\\n请检查 App 文件是否编译成功。");`,
    `root.render(React.createElement(typeof App === "function" ? App : Fallback));`,
  ].join("\n");
}

const fileCache = new Map<string, CachedFile>();
let routerShimUrl: string | null = null;

function revokeLater(url: string) {
  setTimeout(() => URL.revokeObjectURL(url), 15_000);
}

// 组合成html
export async function generateReactHtml(
  files: File[],
  reactId: string,
  consoleScript: string,
) {
  const currentNames = new Set(files.map((f) => f.name));
  for (const [name, cached] of fileCache.entries()) {
    if (!currentNames.has(name)) {
      fileCache.delete(name);
      revokeLater(cached.blobUrl);
    }
  }

  // 3. 转换 import 并生成 Blob URL
  const importMap: Record<string, string> = { ...IMPORT_MAP };

  if (!routerShimUrl) {
    const routerShim = `
import React from 'react';
import * as ReactRouterDOM from 'https://esm.sh/react-router-dom@6?dev&deps=react@18.3.1,react-dom@18.3.1';

// 拦截 console.warn 以屏蔽 React Router v7 的 future flag 警告
(function() {
  const originalWarn = console.warn;
  console.warn = function(...args) {
    const msg = typeof args[0] === 'string' ? args[0] : JSON.stringify(args[0]);
    const isRoutersV7FutureWarn = msg.includes('React Router Future Flag Warning') || 
      msg.includes('v7_startTransition') ||
      msg.includes('v7_relativeSplatPath')
    if(!isRoutersV7FutureWarn) {
      originalWarn.apply(console, args);
    }
  };
})();

export * from 'https://esm.sh/react-router-dom@6?dev&deps=react@18.3.1,react-dom@18.3.1';

// 强制使用 MemoryRouter，适配 Playground 环境
export function createBrowserRouter(routes, opts) {
    
  const router = ReactRouterDOM.createMemoryRouter(routes, {...opts, future: { v7_startTransition: true } });
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
     routerRef.current = ReactRouterDOM.createMemoryRouter(routes, { ...props, future: { v7_startTransition: true } });
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
     routerRef.current = ReactRouterDOM.createMemoryRouter(routes, { ...props, future: { v7_startTransition: true } });
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
    const shimBlob = new Blob([routerShim], { type: "text/javascript" });
    routerShimUrl = URL.createObjectURL(shimBlob);
  }
  importMap["react-router-dom"] = routerShimUrl;

  const transformPromises = files.map(async (file) => {
    const contentHash = hashContent(file.content);
    const cached = fileCache.get(file.name);
    if (cached && cached.hash === contentHash) {
      importMap[`src/${file.name}`] = cached.blobUrl;
      return;
    }

    const compiled = (await compileFile(
      file.content,
      file.name,
    )) as CompiledFile;
    const rawCode = compiled.code ?? "";
    const rawCss = compiled.css ?? "";

    let finalCode = rawCode;
    try {
      finalCode = await transformImports(rawCode, files);
    } catch {
      finalCode = rawCode;
    }

    // 移除注释和字符串后再检查是否有未编译的 JSX，防止注释或字符串中的标签触发误报
    // 1. 移除字符串
    // 2. 移除注释
    const codeSafe = finalCode
      .replace(/("(\\.|[^"\\])*"|'(\\.|[^'\\])*'|`(\\.|[^`\\])*`)/g, "")
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");

    const hasUncompiledJsx =
      (file.name.endsWith(".jsx") || file.name.endsWith(".tsx")) &&
      /<\s*[A-Za-z]/.test(codeSafe);

    if (hasUncompiledJsx) {
      finalCode = [
        `import React from "react";`,
        `console.error("Playground 编译失败：${file.name}");`,
        `export default function __PlaygroundCompileError() {`,
        `  return React.createElement("pre", { style: { padding: 16, whiteSpace: "pre-wrap" } }, "编译失败：${file.name}\\n\\n请检查 JSX/语法是否正确。");`,
        `}`,
      ].join("\n");
    }

    const blob = new Blob([finalCode], { type: "text/javascript" });
    const blobUrl = URL.createObjectURL(blob);

    if (cached) revokeLater(cached.blobUrl);
    fileCache.set(file.name, {
      code: finalCode,
      css: rawCss,
      blobUrl,
      hash: contentHash,
    });
    importMap[`src/${file.name}`] = blobUrl;
  });

  await Promise.all(transformPromises);

  // 4. 确定入口脚本
  let entryScript = "";
  // 优先查找 main.jsx 或 main.tsx
  const entryFile = files.find(
    (f) => f.name === "main.jsx" || f.name === "main.tsx",
  );

  if (entryFile && fileCache.has(entryFile.name)) {
    entryScript = `<script type="module" src="${importMap[`src/${entryFile.name}`]}"></script>`;
  } else {
    // 降级：查找 App.jsx 或 App.tsx 并自动挂载
    const appFile =
      files.find((f) => f.name === "App.jsx" || f.name === "App.tsx") ||
      files[0];
    if (appFile) {
      const entryModuleCode = createEntryModuleCode(files);
      if (!entryModuleCode)
        return "<h1>Error: No App.jsx or App.tsx found</h1>";
      entryScript = `<script type="module">\n${entryModuleCode}\n</script>`;
    } else {
      return "<h1>Error: No App.jsx or main.jsx found</h1>";
    }
  }

  // 5. 组装 HTML
  const allCss = Array.from(fileCache.values())
    .map((f) => f.css || "")
    .join("\n");


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
