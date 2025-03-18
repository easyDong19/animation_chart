import { HealthScore } from '@/stories/components/static/HealthScore';
import { ChartStyleType } from '@/stories/components/static/types/HealthScore.types';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Static/HealthScore',
  component: HealthScore,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '건강 점수를 시각화하는 게이지 차트 컴포넌트 \n\n',
      },
    },
  },

  tags: ['autodocs'],
} satisfies Meta<typeof HealthScore>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultChartStyle: ChartStyleType = {
  delta: {
    increasingColor: '#2563EB',
    decreasingColor: '#B91C1C',
    font: {
      size: 24,
    },
  },
  threshold: ['#2563EB', '#0D9488', '#B91C1C'],
  margin: { t: 30, r: 50, l: 50, b: 60 },
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

export const Default: Story = {
  args: {
    value: 80,
    range: [0, 100],
    prevValue: 32,
    tickStep: 20,
    threshold: [33, 66],
    chartStyle: defaultChartStyle,
  },
};

export const NoPrevData: Story = {
  args: {
    value: 80,
    range: [0, 100],
    prevValue: null,
    tickStep: 20,
    threshold: [33, 66],
    chartStyle: defaultChartStyle,
  },
};
