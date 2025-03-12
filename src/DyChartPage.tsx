import { DyChart } from './component/dyChart/dyChart';

const chartSchema: any = {
  className: 'grid grid-cols-12 gap-4 border border-gray-700 p-4',
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
              },
              {
                className: '',
                name: '확대',
                type: 'button',
              },
            ],
          ],
        },
      ],
    },
  ],
};
const DyChartPage = () => {
  return (
    <div className='w-1/2'>
      <DyChart chartSchema={chartSchema} />
    </div>
  );
};

export default DyChartPage;
