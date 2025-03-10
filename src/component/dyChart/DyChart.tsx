import classNames from 'classnames';
import React from 'react';
import { IFieldComponents } from './types/dynamicChart.type';
import { isArray } from 'lodash';
// 공통된 요소
// data, layout, config
const ChartComponents = {
  title: ({ field }: IFieldComponents) => {
    <>
      {field?.title && (
        <div
          className={classNames(
            field?.opts?.className,
            'text-sm text-stone-800'
          )}
        >
          {field.title}
        </div>
      )}
    </>;
  },
};

const renderField = (field: any, idx: number) => {
  if (field.fields && isArray(field.fields)) {
    return <div></div>;
  }
};

const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return <div className={className}>{children}</div>;
};
export const DyChart = ({
  className,
  chartSchema,
}: {
  className: string;
  chartSchema: any;
}) => {
  return (
    <ChartContainer className={className}>
      <div>
        <div>a</div>
        <div>b</div>
      </div>
    </ChartContainer>
  );
};
