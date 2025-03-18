import { RiskBar } from './RiskBar';
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

export const Primary: Story = {};
