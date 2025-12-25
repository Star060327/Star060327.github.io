import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Layout = lazy(() => import('../pages/Layout/index.tsx'));
const About = lazy(() => import('../pages/About/index.tsx'));
const File = lazy(() => import('../pages/File/index.tsx'));
const ContentPage = lazy(() => import('../pages/ContentPage/index.tsx'));
const NotFound = lazy(() => import('../pages/NotFound/index.tsx'));
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
  },
  {
    path: 'content/*',
    element: (
      <Suspense fallback={'加载中'}>
        <ContentPage></ContentPage>
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={'加载中'}>
        <NotFound></NotFound>
      </Suspense>
    )
  }
];
const router = createBrowserRouter(routes);
export default router;
