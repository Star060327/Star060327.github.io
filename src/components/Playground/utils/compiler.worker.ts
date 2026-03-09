import { transform, type Transform } from 'sucrase';

self.onmessage = async (e: MessageEvent) => {
  const { id, code, filename } = e.data;

  try {
    // 1. 根据后缀决定转换模式
    const transforms: Transform[] = [];
    if (filename.endsWith('.jsx')) {
      transforms.push('jsx' as Transform);
    } else if (filename.endsWith('.tsx')) {
      transforms.push('typescript' as Transform, 'jsx' as Transform);
    } else if (filename.endsWith('.ts')) {
      transforms.push('typescript' as Transform);
    } else if (filename.endsWith('.js')) {
      // 允许 js 文件中写 jsx
      transforms.push('jsx' as Transform);
    }

    // 2. 执行转换
    const result = transform(code, {
      transforms,
      jsxRuntime: 'automatic', // 自动引入 React 运行时
      production: true
    });

    // 3. 返回结果
    self.postMessage({
      id,
      type: 'SUCCESS',
      code: result.code
    });
  } catch (error) {
    self.postMessage({
      id,
      type: 'ERROR',
      message: error
    });
  }
};
