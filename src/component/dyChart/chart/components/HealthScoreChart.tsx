import Plot from 'react-plotly.js';

export const HealthScoreChart = () => {
  return (
    <Plot
      data={[
        {
          type: 'indicator',
          mode: 'gauge+number+delta',
          value: 80, // 현재 값
          delta: { reference: 100, increasing: { color: 'green' } },
          gauge: {
            axis: {
              range: [0, 100],
              tickvals: [0, 20, 40, 60, 80, 100],
              showgrid: false,
              ticks: '',
            },
            bar: { color: 'red', thickness: 1.0 },
            borderwidth: 0,

            steps: [{ range: [0, 100], color: 'gray' }],
          },
          domain: { x: [0, 1], y: [0, 1] },
        },
      ]}
      layout={{
        width: 500,
        height: 400,
        margin: { t: 30, r: 30, l: 30, b: 30 },
        paper_bgcolor: 'white',
        font: { color: 'darkblue', family: 'Arial' },
      }}
      config={{ displayModeBar: false }}
    />
  );
};
