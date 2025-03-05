import Plot from 'react-plotly.js';

const TestBPM = () => {
  // 원본 데이터
  const x = [1, 2, 3, 4, 5];
  const y = [10, 15, 8, 20, 12];

  const x_horizontal = [];
  const y_horizontal = [];

  const x_vertical = [];
  const y_vertical = [];

  for (let i = 0; i < x.length - 1; i++) {
    // 수평선: X값 변하고, Y값 유지
    // null을 넣으면 다음 점과 연결을 끊음(선이 분리됨)
    x_horizontal.push(x[i], x[i + 1], null);
    y_horizontal.push(y[i], y[i], null);

    // 수직선: X값 유지, Y값 변함
    x_vertical.push(x[i + 1], x[i + 1], null);
    y_vertical.push(y[i], y[i + 1], null);
  }

  return (
    <Plot
      data={[
        {
          x: x_horizontal,
          y: y_horizontal,
          mode: 'lines',
          line: { shape: 'linear', width: 5, color: 'blue' },
          type: 'scatter',
          hoverinfo: 'none',
        },
      ]}
      layout={{
        title: 'Step Graph (Horizontal: Blue, Vertical: Red)',
        xaxis: { title: 'X Axis' },
        yaxis: { title: 'Y Axis' },
      }}
    />
  );
};

export default TestBPM;
