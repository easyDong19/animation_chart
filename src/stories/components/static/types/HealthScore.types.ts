export interface HealthScoreProps {
  /** 예시ㅇ1 */
  value: number;
  prevValue?: number | null;
  threshold: [number, number];
  range: [number, number];
  tickStep: number;
  chartStyle: ChartStyleType;
}

export type ChartStyleType = {
  delta: {
    increasingColor: string;
    decreasingColor: string;
    font: {
      size: number;
    };
  };
  threshold: [string, string, string];
  margin: {
    t: number;
    r: number;
    l: number;
    b: number;
  };
  tickfont: {
    size: number;
    color: string;
  };
  steps: {
    color: string;
  };
  number: {
    font: {
      size: number;
      color: string;
    };
  };
};
