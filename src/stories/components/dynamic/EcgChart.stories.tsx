import { EcgChartWrapper } from '@/stories/components/dynamic/EcgChartWrapper';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Animation/EcgChart',
  component: EcgChartWrapper,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EcgChartWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EcgChartWrapper />,
};
