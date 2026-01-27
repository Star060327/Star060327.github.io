import { parse as parseImports, init } from 'es-module-lexer';
import { type File } from '../hooks/usePlayground';

//  定义 importmap 映射，将第三方库映射到 CDN 地址
const IMPORT_REACT_MAP: Record<string, string> = {
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

const IMPORT_VUE_MAP: Record<string, string> = {
  vue: 'https://esm.sh/vue@3.5.13',
  'vue-router': 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13',
  pinia: 'https://esm.sh/pinia@2.1.7?deps=vue@3.5.13'
};

// react路径转换
export async function getReactTransformImports(code: string, files: File[]) {
  if (!code) return '';
  await init;
  try {
    const [imports] = parseImports(code);
    let transformed = code;
    const fileNames = new Set(files.map((f) => f.name));
    if (!imports.length) return transformed;

    // 从后往前替换，避免影响前面的索引
    for (let i = imports.length - 1; i >= 0; i--) {
      const { s, e, n } = imports[i];
      if (!n) continue;

      // 1. 如果是已知第三方库，不做替换，交给 importmap
      if (IMPORT_REACT_MAP[n]) continue;

      // 2. 处理本地文件 import
      // 移除 ./ 前缀
      const cleanName = n.replace(/^\.\//, '');

      // 简单的文件名匹配逻辑
      let targetFile = '';
      const extensions = ['', '.jsx', '.tsx', '.js', '.ts', '.css'];
      for (const ext of extensions) {
        if (fileNames.has(cleanName + ext)) {
          targetFile = cleanName + ext;
          break;
        }
      }

      if (targetFile) {
        // 统一替换为 src/文件名，并将在 importmap 中注册
        const replacement = `src/${targetFile}`;
        transformed = transformed.slice(0, s) + replacement + transformed.slice(e);
      } else if (!n.startsWith('http') && !n.startsWith('.')) {
        // 3. 未知第三方库，走 esm.sh
        // 核心修复：始终添加 ?dev 和 external=react,react-dom
        // 这样可以确保任何依赖 React 的第三方库都使用我们 importmap 中定义的同一个 React 实例
        const replacement = `https://esm.sh/${n}?dev&external=react,react-dom`;
        transformed = transformed.slice(0, s) + replacement + transformed.slice(e);
      }
    }
    return transformed;
  } catch (e) {
    console.error('Transform imports failed:', e);
    return code;
  }
}

// vue路径转换
/**
 * 利用 es-module-lexer 转换代码中的 import 语句
 * 将本地文件 import 转换为 src/文件名 的形式，以便通过 importmap 解析
 */
export async function getVueTransformImports(code: string, files: File[]) {
  await init;
  const [imports] = parseImports(code);
  let transformed = code;
  const fileNames = new Set(files.map((f) => f.name));

  for (let i = imports.length - 1; i >= 0; i--) {
    const { s, e, n } = imports[i];
    if (!n) continue;

    // 1. 如果是已知第三方库，不做替换，交给 importmap
    if (IMPORT_VUE_MAP[n]) continue;

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
