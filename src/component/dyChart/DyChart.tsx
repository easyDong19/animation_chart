import React, { ReactElement } from 'react';
import { isArray } from 'lodash';
import { ChartContainer } from './component/ChartContainer';
import { Title } from './component/header/Title';
import { Button } from './component/header/Button';
import { EcgChart } from './chart/components/EcgChart';
import { HeatMapChart } from './chart/components/HeatMapChart';

interface BaseField {
  type: string;
  className?: string;
  [key: string]: any;
}

interface ComponentField {
  type: 'component';
  component: ReactElement;
}

interface NestedField extends BaseField {
  fields: Field[][];
}

type Field = BaseField | ComponentField | NestedField;

// Mapping field types to components
const fieldComponents: Record<string, React.FC<{ field: Field }>> = {
  title: Title,
  button: Button,
  ecgChart: EcgChart,
  heatMapChart: HeatMapChart,
};

const renderArrayFields = (
  arrayFields: Field[][],
  parentIdx: number
): JSX.Element => {
  const elements: JSX.Element[] = [];

  arrayFields.forEach((row, rowIdx) => {
    row.forEach((field, colIdx) => {
      const key = `${parentIdx}_${rowIdx}_${colIdx}`;

      if (
        field.type === 'component' &&
        'component' in field &&
        React.isValidElement(field.component)
      ) {
        elements.push(React.cloneElement(field.component, { key }));
        return;
      }

      const FieldComponent = fieldComponents[field.type];
      if (!FieldComponent) return;

      elements.push(
        <div key={key} className={field.className}>
          <FieldComponent field={field} />
        </div>
      );
    });
  });

  return <>{elements}</>;
};

const renderField = (field: Field, idx: number): JSX.Element | null => {
  const key = `nested_${idx}`;

  if (
    field.type === 'component' &&
    'component' in field &&
    React.isValidElement(field.component)
  ) {
    return React.cloneElement(field.component, { key });
  }

  if ('fields' in field && isArray(field.fields)) {
    return (
      <div key={key} className={field.className}>
        {renderArrayFields(field.fields, idx)}
      </div>
    );
  }

  const FieldComponent = fieldComponents[field.type];
  if (!FieldComponent) return null;

  return (
    <div key={key} className={field.className}>
      <FieldComponent field={field} />
    </div>
  );
};

interface DyChartProps {
  chartSchema: {
    className: string;
    fields?: Field[];
  };
}

export const DyChart: React.FC<DyChartProps> = ({ chartSchema }) => {
  return (
    <ChartContainer className={chartSchema.className}>
      {(chartSchema.fields || []).map((section, index) => (
        <div key={index} className={section.className}>
          {'fields' in section && isArray(section.fields)
            ? section.fields.map((field, idx) => renderField(field, idx))
            : null}
        </div>
      ))}
    </ChartContainer>
  );
};
