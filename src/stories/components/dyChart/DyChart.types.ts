export type FieldType = {
  type?: 'title' | 'button' | 'ecgChart' | 'heatMapChart';
  label?: string;
  className?: string;
  fields?: FieldType[][];
  data?: any;
};

export type ChartSchemaType = {
  className?: string;
  fields: FieldType[];
};
