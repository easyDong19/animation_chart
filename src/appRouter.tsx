import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import ProtoTypeChart from './ProtoTypeChart';
import { TestChart } from './component/chart/test/TestChart';
import { HeatmapTest } from './component/chart/heatmap/HeatmapTest';
import { TestHeatmap } from './component/chart/test/TestHeatmap';
import { TestBPMChart } from './component/chart/test/TestBPMChart';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<ProtoTypeChart />} />
      <Route path='/test' element={<TestChart />} />
      <Route path='/heatmap' element={<HeatmapTest />} />
      <Route path='/heatmaptest' element={<TestHeatmap />} />
      <Route path='/bpmtest' element={<TestBPMChart />} />
      {/* <Route path='/experiment' element={<TmpTestChart />} /> */}
    </Route>
  );

  const router = createBrowserRouter(routers, {});
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
