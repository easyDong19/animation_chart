import React from 'react';
import Plot from 'react-plotly.js';

const makeDegreeToRad = (degree: number) => {
  return (Math.PI / 180) * degree;
};

const ScatterPlotWithArrows = () => {
  const xStart = [1, 2];
  const yStart = [1, 2];

  let degrees = [135, -45];
  const mag = [0.2, 0.1];
  degrees = degrees.map((degree) => makeDegreeToRad(degree));

  const xEnd = xStart.map((x, i) => x + mag[i] * Math.cos(degrees[i]));
  const yEnd = yStart.map((y, i) => y + mag[i] * Math.sin(degrees[i]));

  const scatterData = {
    x: xStart,
    y: yStart,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 8, color: 'blue' },
    name: 'Points',
  };

  const annotations = xStart.map((_, i) => ({
    x: xEnd[i],
    y: yEnd[i],
    ax: xStart[i],
    ay: yStart[i],
    xref: 'x',
    yref: 'y',
    axref: 'x',
    ayref: 'y',
    showarrow: true,
    arrowhead: 3,
    arrowsize: 2,
    arrowwidth: 2,
    arrowcolor: 'red',
  }));

  const layout = {
    title: '2D Scatter Plot with Arrows',
    xaxis: { title: 'X Axis', showgrid: false },
    yaxis: { title: 'Y Axis', showgrid: false },
    annotations: annotations,
  };

  return <Plot data={[scatterData]} layout={layout} />;
};

export default ScatterPlotWithArrows;
