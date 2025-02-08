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
  isPlaying: boolean;
  speed: number;
  interval: number;
};

export type EcgChartAction = 'move' | 'reset' | 'changeSpeed';
