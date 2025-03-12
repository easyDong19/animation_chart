import classNames from 'classnames';
import React from 'react';
import { IFieldComponents } from './types/dynamicChart.type';
import { isArray } from 'lodash';
import { ChartContainer } from './component/ChartContainer';
import { Title } from './component/header/Title';
import { Button } from './component/header/Button';
// 공통된 요소
// data, layout, config

/**
 * 헤더 안에 버튼과 제목
 */
const fieldComponents = {
  title: ({ field }) => <Title field={field} />,
  button: ({ field }) => <Button field={field} />,
};

const renderArrayFields = (arrayFields: any[], parentIdx: number) => {
  const elements: JSX.Element[] = [];

  arrayFields.forEach((row: any[], rowIdx: number) => {
    row.forEach((field, colIdx: number) => {
      const FieldComponent = fieldComponents[field.type];
      if (!FieldComponent) return;

      elements.push(
        <div key={`${parentIdx}_${rowIdx}_${colIdx}`}>
          <FieldComponent field={field} />
        </div>
      );
    });
  });

  return <>{elements}</>;
};

const renderField = (field: any, idx: number) => {
  if (field.fields && isArray(field.fields)) {
    return (
      <div key={`nested_${idx}`} className={field.className}>
        {renderArrayFields(field.fields, idx)}
      </div>
    );
  }

  const FieldComponent = fieldComponents[field.type];
  if (!FieldComponent) return null;

  return <>{FieldComponent({ field })}</>;
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
