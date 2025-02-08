import React from 'react';
import Plot from 'react-plotly.js';

const TestChart: React.FC = () => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3, 4, 5],
          y: [10, 15, 13, 17, 20],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'purple' },
        },
      ]}
      layout={{
        width: 600,
        height: 400,
        title: 'Drag to Move X-Axis (Y-axis Fixed)',
        dragmode: 'pan', // 드래그 모드 활성화 (x축 이동만 가능)
        xaxis: { range: [0, 5], fixedrange: false }, // x축 이동 가능
        yaxis: { fixedrange: true }, // y축 이동 금지
      }}
    />
  );
};

export default TestChart;
