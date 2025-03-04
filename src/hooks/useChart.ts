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
  const [state, dispatch] = useReducer(reducer, initState);
  const [layout, setLayout] = useState<Partial<Layout>>({
    autosize: true,
    dragmode: 'pan' as const,
  });

  const initialStateRef = useRef(initState);
  const isMovingRef = useRef<boolean | null>(false);

  function reducer(
    state: ChartInitialState,
    action: ChartActionType
  ): ChartInitialState {
    switch (action.type) {
      case 'MOVE':
        return {
          ...state,
          xRange: state.xRange.map((val) => val + 10 * state.speed) as [
            number,
            number
          ],
        };
      case 'RESET':
        return initialStateRef.current;
      case 'CHANGE_SPEED':
        return {
          ...state,
          speed: action.payload ?? state.speed,
        };
      default:
        return state;
    }
  }

  useInterval(
    () => {
      if (isMovingRef.current) {
        dispatch({ type: 'MOVE' });
      }
    },
    isMovingRef.current ? 25 : null
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
    isMovingRef.current = true;
  };

  const stopAutoMove = () => {
    isMovingRef.current = false;
  };

  const resetChart = () => {
    dispatch({ type: 'RESET' });
  };
  const changeSpeed = (changeSpeed: number) => {
    dispatch({ type: 'CHANGE_SPEED', payload: changeSpeed });
  };

  return { layout, startAutoMove, stopAutoMove, resetChart, changeSpeed };
};

export default useChart;
