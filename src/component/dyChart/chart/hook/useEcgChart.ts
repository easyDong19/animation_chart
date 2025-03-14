import React, { useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { useInterval } from '../../../../util/useInterval';

export const useEcgChart = (chartData) => {
  const plotRef = useRef<any>(null);
  const [isMoving, setIsMoving] = useState(false);

  const initialXRange = useRef<[number, number]>([0, 10]);
  const initialYRange = useRef<[number, number]>([0, 50]);

  const xRangeRef = useRef<[number, number]>([...initialXRange.current]);
  const yRangeRef = useRef<[number, number]>([...initialYRange.current]);

  // 이동
  const moveXAxis = () => {
    setIsMoving(true);
    if (plotRef.current) {
      xRangeRef.current = [
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
  useInterval(
    () => {
      if (isMoving) {
        moveXAxis();
      }
    },
    isMoving ? 25 : null
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
