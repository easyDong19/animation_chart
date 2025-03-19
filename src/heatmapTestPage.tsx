import xy_mag from '@/data/current_xy_mag.json';
import bz_data from '@/data/bzData.json';
import raw_data from '@/data/feature_data_Rounding.json';
import { useHeatMap } from '@/component/dyChart/chart/hook/useHeatMap';
import { HeatMapChart } from '@/component/dyChart/chart/components/HeatMapChart';

const generateHeatmapData = (size: number, series_length: number) => {
  const data = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      data.push(raw_data[i]['Bz'][j][0]);
    }
  }
  return [data];
};
export const HeatmapTestPage = () => {
  console.log(xy_mag);
  console.log(bz_data);
  console.log(raw_data);
  const chartData = generateHeatmapData(21, 461);
  console.log(chartData);

  const {
    plotRef,
    resetHeatMap,
    startUpdate,
    stopUpdate,
    layoutConfig,
    defaultConfig,
    data,
  } = useHeatMap(chartData, 21);

  return (
    <div className='w-1/5'>
      <HeatMapChart
        field={{
          plotRef,
          resetHeatMap,
          startUpdate,
          stopUpdate,
          layoutConfig,
          defaultConfig,
          data,
        }}
      />
    </div>
  );
};
