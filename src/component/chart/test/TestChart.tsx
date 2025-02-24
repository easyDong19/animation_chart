import React, { useEffect, useReducer, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

// 초기 상태: xRange와 이동 속도(speed)를 정의합니다.
const initialState = {
  xRange: [0, 10],
  speed: 1, // 속도값에 따라 이동량이 달라짐
};

// reducer 함수: PAN 액션을 받아 xRange 값을 업데이트합니다.
function reducer(state, action) {
  switch (action.type) {
    case 'PAN':
      // 기존 xRange의 모든 값에 (10 * speed)를 더합니다.
      return {
        ...state,
        xRange: state.xRange.map((val) => val + 10 * state.speed),
      };
    case 'SET_SPEED':
      return {
        ...state,
        speed: action.speed,
      };
    default:
      return state;
  }
}

const AutoPanChartWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef(null);

  // 자동으로 x축을 이동시키는 함수 (25ms마다 'PAN' 액션 dispatch)
  const startAutoPan = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 중복 실행 방지
    intervalRef.current = setInterval(() => {
      dispatch({ type: 'PAN' });
    }, 25);
  };

  // 자동 이동을 중지하는 함수
  const stopAutoPan = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 컴포넌트 언마운트 시 인터벌 클리어
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // layout에서 xaxis range를 reducer 상태로 지정합니다.
  const layout = {
    title: 'Reducer로 관리하는 x축 자동 이동',
    xaxis: { range: state.xRange },
    yaxis: { range: [0, 100] },
    dragmode: 'pan',
  };

  return (
    <div>
      <button
        onMouseDown={startAutoPan}
        onMouseUp={stopAutoPan}
        onMouseLeave={stopAutoPan}
      >
        누르고 있는 동안 자동 이동
      </button>
      <Plot
        data={[
          {
            x: [0, 2, 4, 6, 8, 10],
            y: [10, 20, 15, 25, 18, 30],
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={layout}
        config={{ displayModeBar: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const TestChart: React.FC = () => {
  return <AutoPanChartWithReducer />;
};

export default TestChart;
