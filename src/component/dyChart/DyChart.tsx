import React from 'react';
import { isArray } from 'lodash';
import { ChartContainer } from './component/ChartContainer';
import { Title } from './component/header/Title';
import { Button } from './component/header/Button';
import { EcgChart } from './chart/components/EcgChart';
import { HeatMapChart } from './chart/components/HeatMapChart';

// todo : 컴포넌트를 넘겨도 그냥 랜더링할수있게 수정, 원래 설정도
const fieldComponents = {
  title: Title,
  button: Button,
  ecgChart: EcgChart,
  heatMapChart: HeatMapChart,
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

  console.log(field);

  return (
    <React.Fragment key={`nested_${idx}`}>
      {FieldComponent({ field })}
    </React.Fragment>
  );
};

export const DyChart = ({ chartSchema }: { chartSchema: any }) => {
  return (
    <ChartContainer className={chartSchema.className}>
      {(chartSchema?.fields || []).map((section, index: number) => (
        <div key={`${index}`} className={section.className}>
          {(section?.fields || []).map((field: any, idx: number) =>
            renderField(field, idx)
          )}
        </div>
      ))}
    </ChartContainer>
  );
};
