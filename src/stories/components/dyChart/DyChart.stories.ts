import { DyChart } from '@/stories/components/dyChart/DyChart';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'layout',
  component: DyChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DyChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSchema = {
  className:
    'grid grid-cols-12 gap-4 border border-gray-700 p-4 rounded-[0.25rem] w-[1200px]',
  //헤더영역
  fields: [
    {
      className: 'col-span-12 flex flex-row justify-between items-center',
      fields: [
        {
          className: 'text-lg flex flex-row items-center',
          name: 'Signal information',
          type: 'title',
        },
        {
          className: 'flex flex-row gap-2',
          fields: [
            [
              {
                className: '',
                name: '인쇄',
                type: 'button',
                // 버튼 스타일 기본 값
                default: true,
              },
              {
                className: '',
                name: '확대',
                type: 'button',
                default: true,
              },
            ],
          ],
        },
      ],
    },
    {
      className: 'col-span-12',
      fields: [
        {
          className: 'flex flex-row gap-2',
          fields: [
            [
              {
                className: '',
                name: '시작',
                type: 'button',
                // 버튼 스타일 기본 값
                default: true,
              },
              {
                className: '',
                name: '중지',
                type: 'button',
                default: true,
              },
              {
                className: '',
                name: '초기화',
                type: 'button',
                default: true,
              },
            ],
          ],
        },
      ],
    },
  ],
};
export const Example: Story = {
  args: {
    chartSchema: defaultSchema,
  },
};
