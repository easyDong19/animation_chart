import { useEffect, useReducer, useRef, useState } from 'react';
import { useInterval } from '../util/useInterval';
import { Layout } from 'plotly.js';
type ChartInitialState = {
  xRange: number[];
  yRange: number[];
  speed: number;
};

type ChartActionType = {
  type: 'MOVE' | 'RESET' | 'CHANGE_SPEED';
  payload?: number;
};

const useChart = (initState: ChartInitialState) => {
  const [layout, setLayout] = useState<Partial<Layout>>({
    autosize: true,
    dragmode: 'pan' as const,
  });

  const initialStateRef = useRef(initState);
  const [isMoving, setIsMoving] = useState(false);

  const [state, dispatch] = useReducer(reducer, initState);
  function reducer(
    state: ChartInitialState,
    action: ChartActionType
  ): ChartInitialState {
    switch (action.type) {
      case 'MOVE':
        return {
          ...state,
          xRange: state.xRange.map((val) => val + 1 * state.speed) as [
            number,
            number
          ],
        };
      case 'RESET':
        return initialStateRef.current;
      case 'CHANGE_SPEED':
        return {
          ...state,
          speed:
            action.payload && state.speed + action.payload > 0
              ? state.speed + action.payload
              : state.speed,
        };
      default:
        return state;
    }
  }

  useInterval(
    () => {
      if (isMoving) {
        dispatch({ type: 'MOVE' });
      }
    },
    isMoving ? 25 : null
  );

  // x축이 이동 될 때마다 range도 변경
  useEffect(() => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      xaxis: { ...prevLayout.xaxis, range: state.xRange },
    }));
  }, [state.xRange]);

  // 초기에 설정한 yRange 값 설정
  useEffect(() => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      yaxis: { range: state.yRange },
    }));
  }, []);

  const startAutoMove = () => {
    setIsMoving(true);
  };

  const stopAutoMove = () => {
    setIsMoving(false);
  };

  const resetChart = () => {
    dispatch({ type: 'RESET' });
  };
  const changeSpeed = (changeSpeed: number) => {
    dispatch({ type: 'CHANGE_SPEED', payload: changeSpeed });
  };

  const handleRelayOut = (
    newLayout: Partial<Layout> & Record<string, unknown>
  ) => {
    let newXRange = layout.xaxis?.range || [0, 10];
    const newYRange = layout.yaxis?.range || [0, 10];

    if (
      typeof newLayout['xaxis.range[0]'] === 'number' &&
      typeof newLayout['xaxis.range[1]'] === 'number'
    ) {
      newXRange = [
        Math.max(0, newLayout['xaxis.range[0]']),
        newLayout['xaxis.range[1]'],
      ];
    }

    setLayout({
      ...layout,
      xaxis: { ...layout.xaxis, range: newXRange },
      yaxis: { ...layout.yaxis, range: newYRange },
    });
  };
  return {
    layout,
    startAutoMove,
    stopAutoMove,
    resetChart,
    changeSpeed,
    handleRelayOut,
  };
};

export default useChart;
