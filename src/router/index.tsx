import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RouteLoader from '../components/RouteLoader';
const Layout = lazy(() => import('../pages/Layout/index.tsx'));
const About = lazy(() => import('../pages/About/index.tsx'));
const File = lazy(() => import('../pages/File/index.tsx'));
const ContentPage = lazy(() => import('../pages/ContentPage/index.tsx'));
const NotFound = lazy(() => import('../pages/NotFound/index.tsx'));
const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<RouteLoader />}>
        <Layout></Layout>
      </Suspense>
    )
  },
  {
    path: 'about',
    element: (
      <Suspense fallback={<RouteLoader />}>
        <About></About>
      </Suspense>
    )
  },
  {
    path: 'file',
    element: (
      <Suspense fallback={<RouteLoader />}>
        <File></File>
      </Suspense>
    )
  },
  {
    path: 'content/*',
    element: (
      <Suspense fallback={<RouteLoader />}>
        <ContentPage></ContentPage>
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<RouteLoader />}>
        <NotFound></NotFound>
      </Suspense>
    )
  }
];
const router = createBrowserRouter(routes);
export default router;
