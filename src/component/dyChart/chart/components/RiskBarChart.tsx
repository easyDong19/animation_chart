import Plot from 'react-plotly.js';

const getBarColor = (value) => {
  if (value <= 33) return '#2563EB';
  if (value <= 66) return '#0D9488';
  return '#B91C1C';
};

const RiskBarChart = () => {
  const riskData = [{ label: 'CM Risk', value: 89 }];

  return (
    <div className='w-full max-w-[1000px]'>
      {riskData.map((risk, index) => (
        <Plot
          key={index}
          data={[
            {
              type: 'indicator',
              mode: 'gauge+number',
              value: risk.value,
              title: { text: risk.label, font: { size: 18 } },
              gauge: {
                shape: 'bullet',
                axis: {
                  range: [0, 100],
                  tickvals: [0, 20, 40, 60, 80, 100],
                  ticks: '',
                },
                bar: { color: getBarColor(risk.value), thickness: 1.0 },
                borderwidth: 0,
                // 배경색
                steps: [{ range: [0, 100], color: '#E5E7EB' }],
              },
              domain: { x: [0, 1], y: [0, 0.2] },
            },
          ]}
          layout={{
            autosize: true,
            height: 150,
            margin: { l: 100, r: 20, t: 0, b: 60 },
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '100%' }}
        />
      ))}
    </div>
  );
};

export default RiskBarChart;
