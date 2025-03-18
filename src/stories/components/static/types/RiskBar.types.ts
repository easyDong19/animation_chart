export type RiskBarProps = {
  /** 예시1 */
  riskData: RiskDataType[];
  range: [number, number];
  tickStep: number;
  threshold: [number, number];
  chartStyle: ChartStyleType;
};

export type RiskDataType = {
  label: string;
  value: number;
};

export type ChartStyleType = {
  title: {
    size: number;
    color: string;
  };
  number: {
    size: number;
    color: string;
    weight: number;
  };
  tickfont: {
    size: number;
    color: string;
  };
  step: {
    color: string;
  };
  margin: {
    l: number;
    r: number;
    t: number;
    b: number;
  };
  threshold: [string, string, string];
};
