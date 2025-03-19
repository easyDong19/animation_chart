import React, { useRef, useState } from 'react';
import { useAnimationFrame } from '../../../../util/useAnimationFrame';

export const useEcgChart = (chartData) => {
  const plotRef = useRef<any>(null);
  const [isMoving, setIsMoving] = useState(false);

  const initialXRange = useRef<[number, number]>([0, 500]);
  const initialYRange = useRef<[number, number]>([0, 600]);

  const xRangeRef = useRef<[number, number]>([...initialXRange.current]);
  const yRangeRef = useRef<[number, number]>([...initialYRange.current]);

  // 이동
  const moveXAxis = () => {
    setIsMoving(true);
    if (plotRef.current) {
      xRangeRef.current = [
        // 여기부분 수정해서 속도 조절 가능하게 해야함
        xRangeRef.current[0] + 0.5,
        xRangeRef.current[1] + 0.5,
      ];

      window.Plotly.relayout(plotRef.current.el, {
        'xaxis.range': xRangeRef.current,
      });
    }
  };

  // 중지
  const stopMoveXAxis = () => {
    setIsMoving(false);
  };

  // 초기화
  const resetChart = () => {
    if (plotRef.current) {
      xRangeRef.current = [...initialXRange.current];
      yRangeRef.current = [...initialYRange.current];

      window.Plotly.relayout(plotRef.current.el, {
        'xaxis.range': xRangeRef.current,
        'yaxis.range': yRangeRef.current,
      });
    }
  };

  /**
   * 설정
   * layout, defaultConfig, data
   */
  const layoutConfig = {
    dragmode: 'pan',
    autosize: true,
    xaxis: { range: xRangeRef.current },
    yaxis: { range: yRangeRef.current },
  };
  const defaultConfig = {
    staticPlot: false,
    scrollZoom: true,
    responsive: true,
    displayModeBar: false,
  };
  const data = [
    {
      x: chartData.x,
      y: chartData.y,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    },
  ];

  // 이동 함수
  useAnimationFrame(
    () => {
      if (isMoving) {
        moveXAxis();
      }
    },
    isMoving,
    1
  );

  return {
    plotRef,
    moveXAxis,
    resetChart,
    stopMoveXAxis,
    layoutConfig,
    defaultConfig,
    data,
  };
};
