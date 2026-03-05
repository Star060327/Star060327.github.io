import { type CompiledFile } from "../types/index";
import CompilerWorker from "./compiler.worker?worker";
import VueCompilerWorker from "./vueCompiler.worker?worker";

// wordker实例
let reactWorker: Worker | null = null;
const reactWorkerCallbacks = new Map<
  string,
  (data: { type: string; code?: string; message?: string | undefined }) => void
>();

// 获取或创建 Worker 实例
function getReactWorker() {
  if (!reactWorker) {
    reactWorker = new CompilerWorker();
    reactWorker.onmessage = (e) => {
      const { id, ...data } = e.data;
      const callback = reactWorkerCallbacks.get(id);
      if (callback) {
        callback(data);
        reactWorkerCallbacks.delete(id);
      }
    };
  }
  return reactWorker;
}

// 编译 React 代码
export function getReactCompiler(
  code: string,
  filename: string,
): Promise<CompiledFile> {
  // css无须编译
  if (filename.endsWith(".css")) {
    return Promise.resolve({
      code: "",
      css: code,
    });
  }
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const worker = getReactWorker();
    reactWorkerCallbacks.set(id, (data) => {
      if (data.type === "ERROR") {
        resolve({ code: "", error: data.message });
      } else {
        resolve({ code: data.code!, css: "" });
      }
    });
    worker.postMessage({ id, code, filename });
  });
}

// 编译 Vue 代码
let vueWorker: Worker | null = null;
const vueWorkerCallbacks = new Map<
  string,
  (data: {
    type: string;
    code?: string;
    css?: string;
    message?: string;
  }) => void
>();

function getVueWorker() {
  if (!vueWorker) {
    vueWorker = new VueCompilerWorker();
    vueWorker.onmessage = (e) => {
      const { id, ...data } = e.data;
      const callback = vueWorkerCallbacks.get(id);
      if (callback) {
        callback(data);
        vueWorkerCallbacks.delete(id);
      }
    };
  }
  return vueWorker;
}

export async function getVueCompiler(
  filename: string,
  code: string,
): Promise<CompiledFile> {
  if (filename.endsWith(".js")) return { code };
  if (!filename.endsWith(".vue")) return { code };

  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const worker = getVueWorker();
    vueWorkerCallbacks.set(id, (data) => {
      if (data.type === "ERROR") {
        resolve({
          code: `console.error(${JSON.stringify(
            `Compilation error in ${filename}: ${data.message ?? ""}`,
          )});\nexport default {};`,
          css: "",
          error: data.message,
        });
        return;
      }
      resolve({ code: data.code ?? "export default {}", css: data.css ?? "" });
    });
    worker.postMessage({ id, code, filename });
  });
}
