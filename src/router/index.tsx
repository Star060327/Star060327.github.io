import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Layout = lazy(() => import('../pages/Layout/index.tsx'));
const About = lazy(() => import('../pages/About/index.tsx'));
const File = lazy(() => import('../pages/File/index.tsx'));
const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={'加载中'}>
        <Layout></Layout>
      </Suspense>
    )
  },
  {
    path: 'about',
    element: (
      <Suspense fallback={'加载中'}>
        <About></About>
      </Suspense>
    )
  },
  {
    path: 'file',
    element: (
      <Suspense fallback={'加载中'}>
        <File></File>
      </Suspense>
    )
  }
];
const router = createBrowserRouter(routes);
export default router;
