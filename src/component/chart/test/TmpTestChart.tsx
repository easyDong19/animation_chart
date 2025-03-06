import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { useInterval } from '../../../util/useInterval';

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

const XAxisMovingChart = () => {
  const plotRef = useRef<any>(null);

  const initialXRange = useRef<[number, number]>([0, 10]);
  const initialYRange = useRef<[number, number]>([0, 50]);

  const xRangeRef = useRef<[number, number]>([...initialXRange.current]);
  const yRangeRef = useRef<[number, number]>([...initialYRange.current]);

  const [isMoving, setIsMoving] = useState(false);

  const moveXAxis = () => {
    setIsMoving(true);
    if (plotRef.current) {
      xRangeRef.current = [
        xRangeRef.current[0] + 0.5,
        xRangeRef.current[1] + 0.5,
      ];

      window.Plotly.relayout(plotRef.current.el, {
        'xaxis.range': xRangeRef.current,
      });
    }
  };

  const resetChart = () => {
    if (plotRef.current) {
      xRangeRef.current = [...initialXRange.current];
      yRangeRef.current = [...initialYRange.current];

      window.Plotly.relayout(plotRef.current.el, {
        'xaxis.range': xRangeRef.current,
        'yaxis.range': yRangeRef.current,
      });
    }
  };

  useInterval(
    () => {
      if (isMoving) {
        moveXAxis();
      }
    },
    isMoving ? 25 : null
  );

  return (
    <div>
      <button onClick={moveXAxis} className='px-4 py-2 text-white bg-blue-500'>
        X축 이동 (버튼 클릭)
      </button>
      <button
        onClick={() => setIsMoving(false)}
        className='px-4 py-2 ml-2 text-white bg-blue-700'
      >
        이동 중지
      </button>
      <button
        onClick={resetChart}
        className='px-4 py-2 ml-2 text-white bg-red-500'
      >
        초기화
      </button>

      <Plot
        ref={plotRef}
        data={[
          {
            x: chartData.x,
            y: chartData.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          dragmode: 'pan',
          xaxis: { range: xRangeRef.current },
          yaxis: { range: yRangeRef.current },
        }}
        config={{ staticPlot: false, scrollZoom: true }}
      />
    </div>
  );
};

export default XAxisMovingChart;
