import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Layout = lazy(() => import('../pages/Layout/index.tsx'));
const Article = lazy(() => import('../pages/Article/index.tsx'));
const Growth = lazy(() => import('../pages/Growth/index.tsx'));
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
    path: 'article',
    element: (
      <Suspense fallback={'加载中'}>
        <Article></Article>
      </Suspense>
    )
  },
  {
    path: 'growth',
    element: (
      <Suspense fallback={'加载中'}>
        <Growth></Growth>
      </Suspense>
    )
  }
];
const router = createBrowserRouter(routes);
export default router;
