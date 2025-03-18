import { HeatMapChartWrapper } from '@/stories/components/dynamic/HeatMapChartWrapper';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Animation/HeatMapChart',
  component: HeatMapChartWrapper,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HeatMapChartWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HeatMapChartWrapper />,
};
