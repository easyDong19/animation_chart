import { HeatMapChart } from '@/component/dyChart/chart/components/HeatMapChart';
import { useHeatMap } from '@/component/dyChart/chart/hook/useHeatMap';

const generateHeatmapData = (size: number, frames: number) => {
  return Array.from({ length: frames }, () =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.random() * 100)
    )
  );
};

export const HeatMapChartWrapper = () => {
  const raw_data = generateHeatmapData(30, 500);
  console.log(raw_data);

  const {
    plotRef,
    resetHeatMap,
    startUpdate,
    stopUpdate,
    layoutConfig,
    defaultConfig,
    data,
  } = useHeatMap(raw_data, 30);

  return (
    <div className='flex flex-col gap-4 w-[500px]'>
      <HeatMapChart field={{ plotRef, data, layoutConfig, defaultConfig }} />
      <div className='flex gap-2'>
        <button
          onClick={startUpdate}
          className='px-4 py-2 text-white bg-blue-500 rounded'
        >
          Start
        </button>
        <button
          onClick={stopUpdate}
          className='px-4 py-2 text-white bg-red-500 rounded'
        >
          Stop
        </button>
        <button
          onClick={resetHeatMap}
          className='px-4 py-2 text-white bg-gray-500 rounded'
        >
          Reset
        </button>
      </div>
    </div>
  );
};
