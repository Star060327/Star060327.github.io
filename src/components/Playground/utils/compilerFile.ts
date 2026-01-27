import { type CompiledFile } from '../types/index';
import { parse, compileScript, compileStyle } from '@vue/compiler-sfc';

// wordker实例
let worker: Worker | null = null;
const workerCallbacks = new Map<
  string,
  (data: { type: string; code?: string; message?: string | undefined }) => void
>();

// 获取或创建 Worker 实例
function getWorker() {
  if (!worker) {
    worker = new Worker(new URL('./compiler.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e) => {
      const { id, ...data } = e.data;
      const callback = workerCallbacks.get(id);
      if (callback) {
        callback(data);
        workerCallbacks.delete(id);
      }
    };
  }
  return worker;
}

// 编译 React 代码
export function getReactCompiler(code: string, filename: string): Promise<CompiledFile> {
  // css无须编译
  if (filename.endsWith('.css')) {
    return Promise.resolve({
      code: '',
      css: code
    });
  }
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    const worker = getWorker();
    workerCallbacks.set(id, (data) => {
      if (data.type === 'ERROR') {
        resolve({ code: '', error: data.message });
      } else {
        resolve({ code: data.code!, css: '' });
      }
    });
    worker.postMessage({ id, code, filename });
  });
}

// 编译 Vue 代码
export async function getVueCompiler(filename: string, code: string): Promise<CompiledFile> {
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
