import classNames from 'classnames';
import React from 'react';
import { IFieldComponents } from './types/dynamicChart.type';
import { isArray } from 'lodash';
import { ChartContainer } from './component/ChartContainer';
import { Title } from './component/header/Title';
// 공통된 요소
// data, layout, config

/**
 * 헤더 안에 버튼과 제목
 */
const fieldComponents = {
  title: ({ field }) => <Title name={field.name} />,
};

const renderField = (field: any, idx: number) => {
  if (field.fields && isArray(field.fields)) {
    return (
      <div
        key={`nested_${idx}`}
        className={classNames('w-full', field.className)}
      ></div>
    );
  }

  const FieldComponent = fieldComponents[field.type];
  if (!FieldComponent) return null;

  return <div key={`${field.name}_${idx}`}>{FieldComponent({ field })}</div>;
};

export const DyChart = ({ chartSchema }: { chartSchema: any }) => {
  return (
    <ChartContainer className={chartSchema.className}>
      {(chartSchema?.fields || []).map((section, index: number) => (
        <div key={index} className={section.className}>
          {(section?.fields || []).map((field: any, idx: number) =>
            renderField(field, idx)
          )}
        </div>
      ))}
    </ChartContainer>
  );
};
