import React from 'react';
import { useHeatMap } from './component/dyChart/chart/hook/useHeatMap';
import { DyChart } from './component/dyChart/DyChart';

const generateHeatmapData = (size: number, frames: number) => {
  return Array.from({ length: frames }, () =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.random() * 100)
    )
  );
};

export const DyHeatmapChartPage = () => {
  const {
    plotRef,
    resetHeatMap,
    startUpdate,
    stopUpdate,
    layoutConfig,
    defaultConfig,
    data,
  } = useHeatMap(generateHeatmapData(30, 500), 30);
  const HeatMapchartSchema: any = {
    className:
      'grid grid-cols-12 gap-4 border border-gray-700 p-4 rounded-[0.25rem] ',
    //헤더영역
    fields: [
      {
        className: 'col-span-12 flex flex-row justify-between items-center ',
        fields: [
          {
            className: 'text-lg flex flex-row items-center ',
            name: 'HeatMap',
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
            type: 'heatMapChart',
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
                  // 버튼 스타일 기본 값
                  default: true,
                  clickEvent: startUpdate,
                },
                {
                  className: '',
                  name: '중지',
                  type: 'button',
                  default: true,
                  clickEvent: stopUpdate,
                },
                {
                  className: '',
                  name: '초기화',
                  type: 'button',
                  default: true,
                  clickEvent: resetHeatMap,
                },
              ],
            ],
          },
        ],
      },
    ],
  };
  return (
    <div className='w-5/6 '>
      <DyChart chartSchema={HeatMapchartSchema} />
    </div>
  );
};
