import React from 'react';
import Plot from 'react-plotly.js';

const MyPlot: React.FC = () => {
  return (
    <Plot
      data={[
        { x: [1, 2, 3], y: [2, 4, 6], type: 'scatter', mode: 'lines+markers' },
      ]}
      layout={{ title: 'Test Plot' }}
    />
  );
};
const TestChart: React.FC = () => {
  return <MyPlot />;
};

export default TestChart;
