import './App.scss';
import router from './router/index.tsx';
import { RouterProvider } from 'react-router-dom';
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
