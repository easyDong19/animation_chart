import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlotWithArrows = () => {
  // 점의 시작 위치 (출발점)
  const xStart = [1, 2, 3];
  const yStart = [1, 2, 3];

  // 화살표의 끝 위치 (도착점)
  const xEnd = [1.5, 2.5, 3.5];
  const yEnd = [1.5, 2.5, 3.5];

  // Scatter plot 데이터 (파란색 점)
  const scatterData = {
    x: xStart,
    y: yStart,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 8, color: 'blue' },
    name: 'Points',
  };

  // 화살표를 추가하는 annotations 배열 생성
  const annotations = xStart.map((x, i) => ({
    x: xEnd[i], // 화살표 끝점 X
    y: yEnd[i], // 화살표 끝점 Y
    ax: xStart[i], // 화살표 시작점 X
    ay: yStart[i], // 화살표 시작점 Y
    xref: 'x',
    yref: 'y',
    axref: 'x',
    ayref: 'y',
    showarrow: true,
    arrowhead: 3, // 화살표 스타일 (1~5)
    arrowsize: 2, // 화살표 크기
    arrowwidth: 2, // 화살표 두께
    arrowcolor: 'red',
  }));

  // 레이아웃 설정 (grid 없애기)
  const layout = {
    title: '2D Scatter Plot with Arrows',
    xaxis: { title: 'X Axis', showgrid: false },
    yaxis: { title: 'Y Axis', showgrid: false },
    annotations: annotations, // 화살표 추가
  };

  return <Plot data={[scatterData]} layout={layout} />;
};

export default ScatterPlotWithArrows;
