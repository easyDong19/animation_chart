import Plot from 'react-plotly.js';

export interface RiskBarProps {
  riskData: RiskDataType[];
  range: [number, number];
  tickStep: number;
  threshold: [number, number];
  chartStyle: ChartStyleType;
}

export type RiskDataType = {
  label: string;
  value: number;
};

export type ChartStyleType = {
  title: {
    size: number;
    color: string;
  };
  number: {
    size: number;
    color: string;
    weight: number;
  };
  tickfont: {
    size: number;
    color: string;
  };
  step: {
    color: string;
  };
  margin: {
    l: number;
    r: number;
    t: number;
    b: number;
  };
};

// todo : 스타일은 한번에 객체로 담아서 props로 받는게 나아 보임
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
    value: 87,
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
    if (value <= threshold[0]) return '#2563EB';
    if (value <= threshold[1]) return '#0D9488';
    return '#B91C1C';
  };

  const makeTickVals = (start, end, step) => {
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
                  tickvals: makeTickVals(range[0], range[1], tickStep),
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
