import {
  ChartStyleType,
  RiskBarProps,
  RiskDataType,
} from '@/stories/components/static/types/RiskBar.types';
import Plot from 'react-plotly.js';

const defaultChartStyle: ChartStyleType = {
  title: {
    size: 18,
    color: '#333',
  },
  number: {
    size: 24,
    color: '#333',
    weight: 600,
  },
  tickfont: {
    size: 14,
    color: '#333',
  },
  step: {
    color: '#E5E7EB',
  },
  margin: { l: 100, r: 20, t: 0, b: 50 },
  threshold: ['#2563EB', '#0D9488', '#B91C1C'],
};

const defaultRiskData: RiskDataType[] = [
  {
    label: 'CM Risk',
    value: 33,
  },
  {
    label: 'AF Risk',
    value: 50,
  },
  {
    label: 'AF Risk',
    value: 97,
  },
];

export const RiskBar = ({
  riskData = defaultRiskData,
  range = [0, 100],
  tickStep = 20,
  threshold = [33, 66],
  chartStyle = defaultChartStyle,
}: RiskBarProps) => {
  const getBarColor = (value: number) => {
    if (value <= threshold[0]) return chartStyle.threshold[0];
    if (value <= threshold[1]) return chartStyle.threshold[1];
    return chartStyle.threshold[2];
  };

  const makeTickVals = ([start, end]: [number, number], step: number) => {
    return Array.from(
      { length: Math.floor((end - start) / step) + 1 },
      (_, i) => start + i * step
    );
  };

  return (
    <div className='w-full'>
      {riskData.map((risk, index) => (
        <Plot
          key={index}
          data={[
            {
              type: 'indicator',
              mode: 'gauge+number',
              value: risk.value,
              title: { text: risk.label, font: chartStyle.title },
              number: { font: chartStyle.number },
              gauge: {
                shape: 'bullet',
                axis: {
                  range: range,
                  tickvals: makeTickVals(range, tickStep),
                  ticklen: 20,
                  ticks: '',
                  tickfont: chartStyle.tickfont,
                },
                bar: { color: getBarColor(risk.value), thickness: 1 },
                borderwidth: 0,
                // 배경색
                steps: [{ range: range, color: chartStyle.step.color }],
              },
              domain: { x: [0, 1], y: [0, 0.3] },
            },
          ]}
          layout={{
            autosize: true,
            height: 100,
            margin: chartStyle.margin,
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '100%' }}
        />
      ))}
    </div>
  );
};
