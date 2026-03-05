import { parse as parseImports, init } from "es-module-lexer";
import { type File } from "../hooks/usePlayground";
import {
  IMPORT_REACT_MAP,
  IMPORT_VUE_MAP,
} from "./generatePlaygroundHtml/data";

// react路径转换
export async function getReactTransformImports(code: string, files: File[]) {
  if (!code) return "";
  await init;
  try {
    const [imports] = parseImports(code);
    let transformed = code;
    const fileNames = new Set(files.map((f) => f.name));
    if (!imports.length) return transformed;

    // 从后往前替换，避免影响前面的索引
    for (let i = imports.length - 1; i >= 0; i--) {
      const { s, e, n } = imports[i]!;
      if (!n) continue;

      // 1. 如果是已知第三方库，不做替换，交给 importmap
      if (IMPORT_REACT_MAP[n]) continue;

      // 2. 处理本地文件 import
      // 移除 ./ 前缀
      const cleanName = n.replace(/^\.\//, "");

      // 简单的文件名匹配逻辑
      let targetFile = "";
      const extensions = ["", ".jsx", ".tsx", ".js", ".ts", ".css"];
      for (const ext of extensions) {
        if (fileNames.has(cleanName + ext)) {
          targetFile = cleanName + ext;
          break;
        }
      }

      if (targetFile) {
        // 统一替换为 src/文件名，并将在 importmap 中注册
        const replacement = `src/${targetFile}`;
        transformed =
          transformed.slice(0, s) + replacement + transformed.slice(e);
      } else if (!n.startsWith("http") && !n.startsWith(".")) {
        // 3. 未知第三方库，走 esm.sh
        // 核心修复：始终添加 ?dev 和 external=react,react-dom
        // 这样可以确保任何依赖 React 的第三方库都使用我们 importmap 中定义的同一个 React 实例
        const replacement = `https://esm.sh/${n}?dev&external=react,react-dom`;
        transformed =
          transformed.slice(0, s) + replacement + transformed.slice(e);
      }
    }
    return transformed;
  } catch (e) {
    console.error("Transform imports failed:", e);
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
    const { s, e, n } = imports[i]!;
    if (!n) continue;

    // 1. 如果是已知第三方库，不做替换，交给 importmap
    if (IMPORT_VUE_MAP[n]) continue;

    // 2. 处理本地文件 import
    // 移除 ./ 前缀
    const cleanName = n.replace(/^\.\//, "");

    // 简单的文件名匹配逻辑
    let targetFile = "";
    if (fileNames.has(cleanName)) {
      targetFile = cleanName;
    } else if (fileNames.has(cleanName + ".vue")) {
      targetFile = cleanName + ".vue";
    } else if (fileNames.has(cleanName + ".js")) {
      targetFile = cleanName + ".js";
    }

    if (targetFile) {
      // 统一替换为 src/文件名，并将在 importmap 中注册
      const replacement = `src/${targetFile}`;
      transformed =
        transformed.slice(0, s) + replacement + transformed.slice(e);
    } else if (!n.startsWith("http") && !n.startsWith(".")) {
      // 3. 未知第三方库，走 esm.sh
      const replacement = `https://esm.sh/${n}`;
      transformed =
        transformed.slice(0, s) + replacement + transformed.slice(e);
    }
  }
  return transformed;
}