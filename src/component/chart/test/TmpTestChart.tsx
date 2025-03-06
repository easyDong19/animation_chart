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
  const xRangeRef = useRef<[number, number]>([0, 10]);

  const handleRelayout = (eventData: any) => {
    console.log(eventData);
    console.log(plotRef.current);
  };
  const [isMoving, setIsMoving] = useState(false);

  const moveXAxis = () => {
    setIsMoving(true);
    if (plotRef.current) {
      xRangeRef.current = [
        xRangeRef.current[0] + 0.5,
        xRangeRef.current[1] + 0.5,
      ];

      console.log(plotRef.current.props.layout.xaxis);

      plotRef.current.props.layout.xaxis = {
        ...plotRef.current.props.layout.xaxis,
        range: xRangeRef.current,
      };
      window.Plotly.relayout(plotRef.current.el, {
        'xaxis.range': xRangeRef.current,
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
          yaxis: { range: [0, 30] },
        }}
        config={{ staticPlot: false }}
        onRelayout={handleRelayout}
      />
    </div>
  );
};

export default XAxisMovingChart;
