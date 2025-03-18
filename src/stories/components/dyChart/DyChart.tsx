import React from 'react';
import { isArray } from 'lodash';
import {
  ChartSchemaType,
  FieldType,
} from '@/stories/components/dyChart/DyChart.types';
import { Title } from '@/component/dyChart/component/header/Title';
import { Button } from '@/component/dyChart/component/header/Button';
import { EcgChart } from '@/component/dyChart/chart/components/EcgChart';
import { HeatMapChart } from '@/component/dyChart/chart/components/HeatMapChart';
import { ChartContainer } from '@/component/dyChart/component/ChartContainer';

const fieldComponents: Record<
  FieldType['type'],
  React.FC<{ field: FieldType }>
> = {
  title: Title,
  button: Button,
  ecgChart: EcgChart,
  heatMapChart: HeatMapChart,
};

const renderArrayFields = (
  arrayFields: FieldType[][],
  parentIdx: number
): JSX.Element => {
  return (
    <>
      {arrayFields.map((row, rowIdx) =>
        row.map((field, colIdx) => {
          const FieldComponent = fieldComponents[field.type];
          if (!FieldComponent) return null;

          return (
            <div key={`${parentIdx}_${rowIdx}_${colIdx}`}>
              <FieldComponent field={field} />
            </div>
          );
        })
      )}
    </>
  );
};

const renderField = (field: FieldType, idx: number): JSX.Element | null => {
  if (field.fields && isArray(field.fields)) {
    return (
      <div key={`nested_${idx}`} className={field.className}>
        {renderArrayFields(field.fields, idx)}
      </div>
    );
  }

  const FieldComponent = fieldComponents[field.type];
  if (!FieldComponent) return null;

  return (
    <React.Fragment key={`nested_${idx}`}>
      <FieldComponent field={field} />
    </React.Fragment>
  );
};

export const DyChart: React.FC<{ chartSchema: ChartSchemaType }> = ({
  chartSchema,
}) => {
  return (
    <ChartContainer className={chartSchema.className || ''}>
      {chartSchema.fields.map((section, index) => (
        <div key={`${index}`} className={section.className}>
          {section.fields.map((field, idx) => renderField(field, idx))}
        </div>
      ))}
    </ChartContainer>
  );
};
