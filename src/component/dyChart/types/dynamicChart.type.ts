export type IFieldComponents = {
  field?: {
    title?: string;
    label?: string;
    opts?: {
      className: string;
    };
  };
};

export type ISectionProps = {
  fields?: IFieldType[];
};

export type IFieldType = {
  label?: string;
  name?: string;
  type?: ComponentType & ChartType;
};

/**
 * legend
 * XAxis
 * YAxis
 * data
 */

type ComponentType = 'HEADER';
type ChartType = 'ECG' | 'HEATMAP';
