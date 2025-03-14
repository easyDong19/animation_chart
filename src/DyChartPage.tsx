import Plot from 'react-plotly.js';
import { useEcgChart } from './component/dyChart/chart/hook/useEcgChart';
import { DyChart } from './component/dyChart/dyChart';

const generateChartData = () => {
  const numPoints = 1000;
  const x = Array.from({ length: numPoints }, (_, i) => i * 2);
  const y = Array.from(
    { length: numPoints },
    () => Math.floor(Math.random() * 40) + 10
  );
  return { x, y };
};

const chartData = generateChartData();

const DyChartPage = () => {
  const {
    plotRef,
    moveXAxis,
    resetChart,
    stopMoveXAxis,
    layoutConfig,
    defaultConfig,
    data,
  } = useEcgChart(chartData);

  const chartSchema: any = {
    className:
      'grid grid-cols-12 gap-4 border border-gray-700 p-4 rounded-[0.25rem]',
    //헤더영역
    fields: [
      {
        className: 'col-span-12 flex flex-row justify-between items-center',
        fields: [
          {
            className: 'text-lg flex flex-row items-center',
            name: 'Signal information',
            type: 'title',
          },
          {
            className: 'flex flex-row gap-2',
            fields: [
              [
                {
                  className: '',
                  name: '인쇄',
                  type: 'button',
                  // 버튼 스타일 기본 값
                  default: true,
                },
                {
                  className: '',
                  name: '확대',
                  type: 'button',
                  default: true,
                },
              ],
            ],
          },
        ],
      },
      // 차트 영역
      {
        className: 'col-span-12',
        fields: [
          {
            className: 'flex flex-row items-center min-w-0 min-h-0',
            name: 'Signal',
            type: 'ecgChart',
            plotRef: plotRef,
            data: data,
            layoutConfig: layoutConfig,
            defaultConfig: defaultConfig,
          },
        ],
      },
    ],
  };

  return (
    <div className='w-5/6'>
      <DyChart chartSchema={chartSchema} />
    </div>
  );
};

export default DyChartPage;
