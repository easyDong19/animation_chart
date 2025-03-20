import { useEcgChart } from '@/component/dyChart/chart/hook/useEcgChart';
import { DyChart } from '@/component/dyChart/DyChart';
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

export const CocurrentChartPage = () => {
  const {
    plotRef,
    moveXAxis,
    resetChart,
    stopMoveXAxis,
    layoutConfig,
    defaultConfig,
    data,
  } = useEcgChart(ecgChartData);

  const {
    plotRef: plotRef2,
    moveXAxis: moveXAxis2,
    resetChart: resetChart2,
    stopMoveXAxis: stopMoveXAxis2,
    layoutConfig: layoutConfig2,
    defaultConfig: defaultConfig2,
    data: data2,
  } = useEcgChart(ecgChartData);

  const {
    plotRef: plotRef3,
    moveXAxis: moveXAxis3,
    resetChart: resetChart3,
    stopMoveXAxis: stopMoveXAxis3,
    layoutConfig: layoutConfig3,
    defaultConfig: defaultConfig3,
    data: data3,
  } = useEcgChart(ecgChartData);

  const cocurrentStartEvent = () => {
    moveXAxis();
    moveXAxis2();
    moveXAxis3();
  };

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

  const chartSchema2: any = {
    className:
      'grid grid-cols-12 gap-4 border border-gray-700 p-4 rounded-[0.25rem]',

    fields: [
      {
        className: 'col-span-12 flex flex-row justify-between items-center',
        fields: [
          {
            className: 'text-lg flex flex-row items-center',
            name: 'Signal information2',
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
            plotRef: plotRef2,
            data: data2,
            layoutConfig: layoutConfig2,
            defaultConfig: defaultConfig2,
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
                  clickEvent: moveXAxis2,
                },
                {
                  className: '',
                  name: '중지',
                  type: 'button',
                  default: true,
                  clickEvent: stopMoveXAxis2,
                },
                {
                  className: '',
                  name: '초기화',
                  type: 'button',
                  default: true,
                  clickEvent: resetChart2,
                },
              ],
            ],
          },
        ],
      },
    ],
  };

  const chartSchema3: any = {
    className:
      'grid grid-cols-12 gap-4 border border-gray-700 p-4 rounded-[0.25rem]',

    fields: [
      {
        className: 'col-span-12 flex flex-row justify-between items-center',
        fields: [
          {
            className: 'text-lg flex flex-row items-center',
            name: 'Signal information3',
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
            plotRef: plotRef3,
            data: data3,
            layoutConfig: layoutConfig3,
            defaultConfig: defaultConfig3,
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
                  clickEvent: moveXAxis3,
                },
                {
                  className: '',
                  name: '중지',
                  type: 'button',
                  default: true,
                  clickEvent: stopMoveXAxis3,
                },
                {
                  className: '',
                  name: '초기화',
                  type: 'button',
                  default: true,
                  clickEvent: resetChart3,
                },
              ],
            ],
          },
        ],
      },
    ],
  };
  return (
    <div className='flex flex-col w-full '>
      <DyChart chartSchema={chartSchema} />
      <DyChart chartSchema={chartSchema2} />
      <DyChart chartSchema={chartSchema3} />

      <div>
        <button onClick={cocurrentStartEvent}>동시실행</button>
      </div>
    </div>
  );
};
