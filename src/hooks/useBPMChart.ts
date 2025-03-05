import useChart from './useChart';
type ChartInitialState = {
  xRange: number[];
  yRange: number[];
  speed: number;
};

type InitDataState = {
  x: number[];
  y: number[];
};

type BPMDataState = {
  x_horizontal: (number | null)[];
  y_horizontal: (number | null)[];
};

/**
 * 1. x_horizontal y_horizontal을 구함(수평선)
 * 2. x값이 유지되고 y값이 유지
 */
const makeBPMData = (data: InitDataState): BPMDataState => {
  const { x, y } = data;
  const x_horizontal = [];
  const y_horizontal = [];

  // null을 넣으면 다음 점과 연결을 끊음(선이 분리됨)
  for (let i = 0; i < x.length - 1; i++) {
    x_horizontal.push(x[i], x[i + 1], null);
    y_horizontal.push(y[i], y[i], null);
  }

  return { x_horizontal, y_horizontal };
};

const useBPMChart = (initState: ChartInitialState, data: InitDataState) => {
  const {
    layout,
    startAutoMove,
    stopAutoMove,
    resetChart,
    changeSpeed,
    handleRelayOut,
  } = useChart(initState);

  const BPMData: BPMDataState = makeBPMData(data);

  return {
    layout,
    startAutoMove,
    stopAutoMove,
    resetChart,
    changeSpeed,
    handleRelayOut,
    BPMData,
  };
};
export default useBPMChart;
