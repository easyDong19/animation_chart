import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import ProtoTypeChart from './ProtoTypeChart';
import { TestChart } from './component/chart/test/TestChart';
import XAxisMovingChart from './component/chart/test/TmpTestChart';
import HeatmapRChart from './component/chart/test/TestHeatmapR';
import DyChartPage from './DyChartPage';
import { DyHeatmapChartPage } from './DyHeatmapChartPage';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<ProtoTypeChart />} />
      <Route path='/test' element={<TestChart />} />
      <Route path='/experiment' element={<XAxisMovingChart />} />
      <Route path='/experiment2' element={<HeatmapRChart />} />
      <Route path='/dychart' element={<DyChartPage />} />
      <Route path='/dyheatmap' element={<DyHeatmapChartPage />} />
    </Route>
  );

  const router = createBrowserRouter(routers, {});
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
