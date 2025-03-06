import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import ProtoTypeChart from './ProtoTypeChart';
import { TestChart } from './component/chart/test/TestChart';
import { TestHeatmap } from './component/chart/test/TestHeatmap';
import { TestBPMChart } from './component/chart/test/TestBPMChart';
import XAxisMovingChart from './component/chart/test/TmpTestChart';
import HeatmapRChart from './component/chart/test/TestHeatmapR';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<ProtoTypeChart />} />
      <Route path='/test' element={<TestChart />} />
      <Route path='/heatmaptest' element={<TestHeatmap />} />
      <Route path='/bpmtest' element={<TestBPMChart />} />
      <Route path='/experiment' element={<XAxisMovingChart />} />
      <Route path='/experiment2' element={<HeatmapRChart />} />
    </Route>
  );

  const router = createBrowserRouter(routers, {});
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
