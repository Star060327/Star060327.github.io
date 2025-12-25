import router from './router/index.tsx';
import { RouterProvider } from 'react-router-dom';
import mdxComponents from './components/MDXComponents/index.tsx';
import { MDXProvider } from '@mdx-js/react';
function App() {
  return (
    <>
      {/* 确保mdx组件映射生效 */}
      <MDXProvider components={mdxComponents}>
        <RouterProvider router={router}></RouterProvider>
      </MDXProvider>
    </>
  );
}

export default App;
