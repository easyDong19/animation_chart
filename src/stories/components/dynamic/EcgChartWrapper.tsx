import { EcgChart } from '@/component/dyChart/chart/components/EcgChart';
import { useEcgChart } from '@/component/dyChart/chart/hook/useEcgChart';

const generateChartData = () => {
  const numPoints = 1000;
  const x = Array.from({ length: numPoints }, (_, i) => i * 2);
  const y = Array.from({ length: numPoints }, () => Math.random() * 50);
  return { x, y };
};

const chartData = generateChartData();

export const EcgChartWrapper = () => {
  const {
    plotRef,
    moveXAxis,
    resetChart,
    stopMoveXAxis,
    layoutConfig,
    defaultConfig,
    data,
  } = useEcgChart(chartData);

  return (
    <div className='flex flex-col  w-[1200px] gap-4'>
      <EcgChart field={{ plotRef, data, layoutConfig, defaultConfig }} />
      <div className='flex flex-row gap-2'>
        <button
          onClick={moveXAxis}
          className='px-4 py-2 text-white bg-blue-500 rounded'
        >
          Move X
        </button>
        <button
          onClick={stopMoveXAxis}
          className='px-4 py-2 text-white bg-red-500 rounded'
        >
          Stop
        </button>
        <button
          onClick={resetChart}
          className='px-4 py-2 text-white bg-gray-500 rounded'
        >
          Reset
        </button>
      </div>
    </div>
  );
};
