import { useAnimationFrame } from '@/util/useAnimationFrame';
import { useRef, useState } from 'react';

// ! 히트맵은 인덱스가 달라지는 구조
// ! 히트맵의 사이즈는 static 값임
// ! 히트맵의 range는 항상 고정되어야 함

/**
 * input : size
 */
export const useHeatMap = (chartData, size: number) => {
  const plotRef = useRef<any>(null);
  const index = useRef<number>(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const x = Array.from({ length: size }, (_, i) => i);
  const y = Array.from({ length: size }, (_, i) => i);
  const zData = chartData;
  /**
   * 설정
   * layout, defaultConfig, data
   */
  // 초기에 레이아웃 설정(width, height 지정해줘야함)
  const layoutConfig = {
    autosize: true,
    xaxis: { visible: false },
    yaxis: { visible: false },
    margin: { t: 10, b: 10, l: 10, r: 10 },
  };

  const defaultConfig = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
    staticPlot: true,
  };

  const data = [
    {
      x: x,
      y: y,
      z: zData[index.current],
      type: 'heatmap',
      colorscale: 'Jet',
      zsmooth: 'best',
      zmin: Math.min(zData[index.current]),
      zmax: Math.max(zData[index.current]),
    },
  ];

  const stopUpdate = () => {
    setIsUpdate(false);
  };

  const resetHeatMap = () => {
    index.current = 0;
    window.Plotly.react(
      plotRef.current.el,
      [
        {
          x: x,
          y: y,
          z: zData[index.current],
          type: 'heatmap',
          colorscale: 'Jet',
          zsmooth: 'best',
          zmin: Math.min(zData[index.current]),
          zmax: Math.max(zData[index.current]),
        },
      ],
      plotRef.current.props.layout
    );
  };

  const startUpdate = () => {
    setIsUpdate(true);
  };

  const updateHeatMap = () => {
    if (plotRef.current && index.current < zData.length - 1) {
      index.current = index.current + 1;

      window.Plotly.react(
        plotRef.current.el,
        [
          {
            x: x,
            y: y,
            z: zData[index.current],
            type: 'heatmap',
            colorscale: 'Jet',
            zsmooth: 'best',
            zmin: Math.min(zData[index.current]),
            zmax: Math.max(zData[index.current]),
          },
        ],
        plotRef.current.props.layout
      );
    }
  };

  useAnimationFrame(
    () => {
      if (isUpdate) {
        updateHeatMap();
      }
    },
    isUpdate,
    25
  );

  return {
    plotRef,
    resetHeatMap,
    startUpdate,
    stopUpdate,
    layoutConfig,
    defaultConfig,
    data,
  };
};
