import classNames from 'classnames';
import React from 'react';

// 공통된 요소
// data, layout, config
const chartComponents = {};

const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return <div className={className}>{children}</div>;
};
export const DyChart = ({ className }: { className: string }) => {
  return (
    <ChartContainer className={className}>
      <div className='col-span-12 bg-slate-600'>
        <div>a</div>
        <div>b</div>
      </div>
    </ChartContainer>
  );
};
