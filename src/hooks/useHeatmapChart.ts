import { useMemo, useReducer, useState } from 'react';
import { useInterval } from '../util/useInterval';

// heatmap z값 시간 별 데이터와 heatmap x,y 좌표 크기
type HeatmapInitialType = {
  index: number;
  maxLength: number;
  speed: number;
};

type HeatmapActionType = {
  type: 'PLAY' | 'RESET' | 'CHANGE_SPEED';
  payload?: number;
};

function reducer(state: HeatmapInitialType, action: HeatmapActionType) {
  switch (action.type) {
    case 'PLAY':
      if (state.index < state.maxLength - 1) {
        return {
          ...state,
          index: state.index + 1,
        };
      }
      return state;
    case 'RESET':
      return {
        ...state,
        index: 0,
        speed: 100,
      };
    case 'CHANGE_SPEED':
      return {
        ...state,
        speed:
          action.payload && state.speed + state.speed * -action.payload > 0
            ? state.speed * -action.payload + state.speed
            : state.speed,
      };
    default:
      return state;
  }
}

export const useHeatmapChart = (size: number, maxLength: number) => {
  // X, Y 좌표 생성
  const x = useMemo(() => Array.from({ length: size }, (_, i) => i), [size]);
  const y = useMemo(() => Array.from({ length: size }, (_, i) => i), [size]);

  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    maxLength: maxLength,
    speed: 100,
  });
  const [isMoving, setIsMoving] = useState(false);

  useInterval(
    () => {
      if (isMoving) {
        dispatch({ type: 'PLAY' });
      }
    },
    isMoving ? state.speed : null
  );

  const startAutoPlay = () => {
    setIsMoving(true);
  };

  const stopAutoPlay = () => {
    setIsMoving(false);
  };

  const resetChart = () => {
    dispatch({ type: 'RESET' });
  };

  const changeSpeed = (changeSpeed: number) => {
    dispatch({ type: 'CHANGE_SPEED', payload: changeSpeed });
  };

  const { index } = state;
  return { x, y, index, startAutoPlay, stopAutoPlay, resetChart, changeSpeed };
};
