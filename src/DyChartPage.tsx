import { useEcgChart } from './component/dyChart/chart/hook/useEcgChart';
import { DyChart } from './component/dyChart/DyChart';
import ecgData from '@/data/ecgData.json';

const JsonToChartData = (ecgData) => {
  const x = [];
  const y = [];
  ecgData.map((item, idx) => {
    x.push(item.x);
    y.push(item.y * 10000);
  });

  return { x, y };
};

const ecgChartData = JsonToChartData(ecgData);

const DyChartPage = () => {
  const {
    plotRef,
    moveXAxis,
    resetChart,
    stopMoveXAxis,
    layoutConfig,
    defaultConfig,
    data,
  } = useEcgChart(ecgChartData);

  const chartSchema: any = {
    className:
      'grid grid-cols-12 gap-4 border border-gray-700 p-4 rounded-[0.25rem]',

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
      {
        className: 'col-span-12',
        fields: [
          {
            className: 'flex flex-row gap-2',
            fields: [
              [
                {
                  className: '',
                  name: '시작',
                  type: 'button',

                  default: true,
                  clickEvent: moveXAxis,
                },
                {
                  className: '',
                  name: '중지',
                  type: 'button',
                  default: true,
                  clickEvent: stopMoveXAxis,
                },
                {
                  className: '',
                  name: '초기화',
                  type: 'button',
                  default: true,
                  clickEvent: resetChart,
                },
              ],
            ],
          },
        ],
      },
    ],
  };
  const generateRandomVectors = (count: number, length: number = 1) => {
    return Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: 0,
        ux: Math.cos(angle) * length,
        vy: Math.sin(angle) * length,
        wz: Math.sin(angle) * length,
      };
    });
  };

  return (
    <div className='w-5/6 '>
      <DyChart chartSchema={chartSchema} />
      <div></div>
    </div>
  );
};

export default DyChartPage;
