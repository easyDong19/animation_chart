import xy_mag from '@/data/current_xy_mag.json';
import bz_data from '@/data/bzData.json';
import raw_data from '@/data/feature_data_Rounding.json';
import { useHeatMap } from '@/component/dyChart/chart/hook/useHeatMap';
import { HeatMapChart } from '@/component/dyChart/chart/components/HeatMapChart';

const generateHeatmapData = (size: number, series_length: number) => {
  const totalData = [];

  for (let s = 0; s < series_length; s++) {
    const data = [];
    for (let i = 0; i < size; i++) {
      const jData = [];

      for (let j = 0; j < size; j++) {
        jData.push(raw_data[i]['Bz'][j][s]);
      }
      data.push(jData);
    }
    totalData.push(data);
  }

  return totalData;
};

const chartData = generateHeatmapData(21, 460);
export const HeatmapTestPage = () => {
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
    <div className='w-2/5'>
      <HeatMapChart
        field={{
          plotRef,
          layoutConfig,
          defaultConfig,
          data,
        }}
      />
      <div>
        <button onClick={startUpdate}>스타트</button>
        <button onClick={stopUpdate}>스탑</button>
        <button onClick={resetHeatMap}>리셋</button>
      </div>
    </div>
  );
};
