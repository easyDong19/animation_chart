import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import ProtoTypeChart from './ProtoTypeChart';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<ProtoTypeChart />} />
    </Route>
  );

  const router = createBrowserRouter(routers, {});
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
