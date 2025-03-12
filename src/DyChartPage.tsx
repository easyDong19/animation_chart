import React from 'react';
import { DyChart } from './component/dyChart/dyChart';

const chartSchema: any = {
  className: 'grid grid-cols-12 gap-4 bg-green-50',
  fields: [
    {
      className: 'col-span-12 flex flex-row',
      fields: [
        {
          className: '',
          name: 'Signal information',
          type: 'title',
        },
        {
          className: '',
          name: '인쇄',
          type: 'title',
        },
        {
          className: '',
          name: '확대',
          type: 'title',
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
