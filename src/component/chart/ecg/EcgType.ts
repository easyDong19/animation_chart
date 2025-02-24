export type XaxisType = {
  X_MIN: number;
  X_MAX: number;
  xRange: number[];
};

export type YaxisType = {
  Y_MIN: number;
  Y_MAX: number;
  yRange: number[];
};

export type EcgChartType = {
  axis: XaxisType & YaxisType;
};

export type EcgChartAction = 'MOVE' |'RESET' | 'CHANGESPEEDX2' | 'CHANGESPEEDX5' | 'CHANGESPEEDX10';
