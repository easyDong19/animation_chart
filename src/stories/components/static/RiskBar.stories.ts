import { RiskBar } from '@/stories/components/static/RiskBar';
import {
  ChartStyleType,
  RiskDataType,
} from '@/stories/components/static/RiskBarType';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Static/RiskBar',
  component: RiskBar,
  parameters: {
    docs: {
      description: {
        component: '이 차트는 Static입니다',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs`'],
} satisfies Meta<typeof RiskBar>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  threshold: ['#2563EB', '#0D9488'],
};

export const Primary: Story = {
  args: {
    riskData: defaultRiskData,
    range: [0, 100],
    tickStep: 20,
    threshold: [33, 66],
    chartStyle: defaultChartStyle,
  },
};
