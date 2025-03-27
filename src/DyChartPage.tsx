import Plot from 'react-plotly.js';
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

  return (
    <div className='w-5/6 '>
      <TrackingChart />
      {/* <DyChart chartSchema={chartSchema} /> */}
      {/* <div></div> */}
    </div>
  );
};

export default DyChartPage;

import { useRef, useState } from 'react';

export const TrackingChart = () => {
  const plotRef = useRef<any>(null);
  const [xCursor, setXCursor] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 데이터 (예제용)
  const xData = Array.from({ length: 500 }, (_, i) => i);
  const yData = xData.map((x) => Math.sin(x * 0.04) * 2);

  // 버튼 클릭 → 애니메이션 시작
  const handlePlay = () => {
    setIsPlaying(true);
    let pos = xCursor;

    const interval = setInterval(() => {
      pos += 5;
      setXCursor(pos);

      if (plotRef.current) {
        window.Plotly.relayout(plotRef.current, {
          'shapes[0].x0': pos,
          'shapes[0].x1': pos,
        });
      }

      if (pos > 500) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 50);
  };

  return (
    <div style={{ background: '#111', padding: 20 }}>
      <Plot
        data={[
          {
            x: xData,
            y: yData,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#00f2ff' },
          },
        ]}
        layout={{
          title: {
            text: 'Tracking Line Example',
            font: { color: 'white' },
          },
          plot_bgcolor: '#222',
          paper_bgcolor: '#222',
          font: { color: 'white' },
          xaxis: { range: [0, 500] },
          yaxis: { range: [-3, 3] },
          shapes: [
            {
              type: 'line',
              x0: xCursor,
              x1: xCursor,
              y0: -3,
              y1: 3,
              line: {
                color: 'red',
                width: 2,
                dash: 'dot',
              },
            },
          ],
        }}
        config={{
          responsive: true,

          displayModeBar: true, // 모드 바 보이게
        }}
        onInitialized={(_, gd) => {
          plotRef.current = gd;
        }}
        onUpdate={(_, gd) => {
          plotRef.current = gd;
        }}
        style={{ width: '100%', height: '500px' }}
      />
      <button
        onClick={handlePlay}
        disabled={isPlaying}
        style={{
          marginTop: 20,
          padding: '8px 20px',
          background: '#f33',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        {isPlaying ? 'Playing...' : '▶ Play'}
      </button>
    </div>
  );
};
