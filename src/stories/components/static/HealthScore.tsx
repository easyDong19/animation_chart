import {
  ChartStyleType,
  HealthScoreProps,
} from '@/stories/components/static/types/HealthScore.types';
import Plot from 'react-plotly.js';

const defaultChartStyle: ChartStyleType = {
  delta: {
    increasingColor: '#2563EB',
    decreasingColor: '#B91C1C',
    font: {
      size: 24,
    },
  },
  threshold: ['#2563EB', '#0D9488', '#B91C1C'],
  margin: { t: 30, r: 50, l: 50, b: 30 },
  steps: {
    color: '#E2E8F0',
  },
  tickfont: {
    size: 20,
    color: '#64748B',
  },
  number: {
    font: {
      size: 100,
      color: '#1E293B',
    },
  },
};

export const HealthScore = ({
  value = 50,
  prevValue = 60,
  range = [0, 100],
  tickStep = 20,
  threshold = [33, 66],
  chartStyle = defaultChartStyle,
}: HealthScoreProps) => {
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
      <Plot
        data={[
          {
            type: 'indicator',
            mode: `gauge+number${prevValue ? '+delta' : ''}`,
            value: value, // 현재 값
            delta: {
              reference: prevValue !== null ? prevValue : undefined,
              increasing: {
                color: chartStyle.delta.increasingColor,
              },
              decreasing: {
                color: chartStyle.delta.decreasingColor,
              },
              font: {
                size: chartStyle.delta.font.size,
              },
            },

            number: {
              font: {
                size: chartStyle.number.font.size,
                color: chartStyle.number.font.color,
              },
            },
            gauge: {
              axis: {
                range: range,
                tickvals: makeTickVals(range, tickStep),
                showgrid: false,
                ticks: '',

                tickfont: chartStyle.tickfont,
              },
              bar: { color: getBarColor(value), thickness: 1.0 },
              borderwidth: 0,
              steps: [{ range: range, color: chartStyle.steps.color }],
            },
            domain: { x: [0, 1], y: [0, 1] },
          },
        ]}
        layout={{
          autosize: true,
          margin: chartStyle.margin,
          font: { color: 'darkblue', family: 'Arial' },
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
