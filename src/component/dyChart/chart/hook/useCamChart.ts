import { useRef, useState } from 'react';
import raw_data from '@/data/feature_data_Rounding.json';
import { useInterval } from '@/util/useInterval';
import { Layout } from 'plotly.js';

const makeDegreeToRad = (degree: number) => (Math.PI / 180) * degree;

const generateQuiverData = (rawData, size: number, series_length: number) => {
  const xStart = [];
  const yStart = [];
  const shapesArray = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      xStart.push(i * 20 - 200);
      yStart.push(j * 20 - 200);
    }
  }

  for (let s = 0; s < series_length; s++) {
    const magData = [];
    const degreeData = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        magData.push(rawData[i]['current_xy_mag'][j][s]);
        degreeData.push(makeDegreeToRad(rawData[i]['current_xy_degree'][j][s]));
      }
    }

    const shapes = xStart.flatMap((_, i) => {
      const magnitude = Math.min(Math.max(magData[i], 0.1), 1);
      const dx = magnitude * Math.cos(degreeData[i]) * 50;
      const dy = magnitude * Math.sin(degreeData[i]) * 50;

      const x0 = xStart[i];
      const y0 = yStart[i];
      const x1 = x0 + dx;
      const y1 = y0 + dy;

      // 개선된 화살표 머리 계산
      const headLength = 5;
      const angle = Math.atan2(dy, dx);

      // 꼭짓점은 선보다 더 앞으로
      const tipX = x1 + headLength * Math.cos(angle);
      const tipY = y1 + headLength * Math.sin(angle);

      // 밑변은 뒤쪽 좌우로 퍼짐
      const baseAngle1 = angle + Math.PI / 3;
      const baseAngle2 = angle - Math.PI / 3;

      const baseX1 = x1 - headLength * 0.7 * Math.cos(baseAngle1);
      const baseY1 = y1 - headLength * 0.7 * Math.sin(baseAngle1);

      const baseX2 = x1 - headLength * 0.7 * Math.cos(baseAngle2);
      const baseY2 = y1 - headLength * 0.7 * Math.sin(baseAngle2);

      return [
        {
          type: 'line',
          x0,
          y0,
          x1,
          y1,
          line: {
            color: 'black',
            width: 1.5,
          },
        },
        {
          type: 'path',
          path: `M ${baseX1},${baseY1} L ${tipX},${tipY} L ${baseX2},${baseY2} Z`,
          fillcolor: 'black',
          line: { width: 0 },
        },
      ];
    });

    shapesArray.push(shapes);
  }

  return { xStart, yStart, shapesArray };
};

export const useCamChart = (rawData, size: number, series_length: number) => {
  const plotRef = useRef<any>(null);
  const index = useRef<number>(0);
  const [timeFactor, setTimeFactor] = useState<number>(1);
  const progressRef = useRef<HTMLProgressElement>(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const { xStart, yStart, shapesArray } = generateQuiverData(
    raw_data,
    size,
    series_length
  );

  const data = {
    x: xStart,
    y: yStart,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 1, color: 'black' },
    name: 'Points',
  };

  const layoutConfig: Partial<Layout> = {
    title: '2D Scatter Plot with Quiver Vectors',
    xaxis: { visible: true, showgrid: true, zeroline: false },
    yaxis: { visible: true, showgrid: true, zeroline: false },
    shapes: shapesArray[index.current],
  };

  const defaultConfig = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
    staticPlot: true,
  };

  const updateCamChart = () => {
    if (plotRef.current && index.current < shapesArray.length - 1) {
      index.current += 1;
      const newLayout = {
        ...layoutConfig,
        shapes: shapesArray[index.current],
      };

      window.Plotly.react(plotRef.current.el, [data], newLayout);

      if (progressRef.current) {
        progressRef.current.value =
          (index.current / (shapesArray.length - 1)) * 100;
      }
    } else {
      stopUpdate();
    }
  };

  const startUpdate = () => setIsUpdate(true);
  const stopUpdate = () => setIsUpdate(false);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Math.round(
      (parseFloat(event.target.value) / 100) * (shapesArray.length - 1)
    );
    index.current = newIndex;
    window.Plotly.relayout(plotRef.current.el, {
      shapes: shapesArray[newIndex],
    });
  };

  const changeSpeed = (speedFactor: number) => setTimeFactor(speedFactor);

  const resetCamChart = () => {
    index.current = 0;
    const initLayout = {
      ...layoutConfig,
      shapes: shapesArray[index.current],
    };
    window.Plotly.relayout(plotRef.current.el, initLayout);
    progressRef.current.value = 0;
    setTimeFactor(1);
  };

  useInterval(() => {
    if (isUpdate) updateCamChart();
  }, 200 / timeFactor);

  return {
    plotRef,
    data,
    layoutConfig,
    defaultConfig,
    startUpdate,
    stopUpdate,
    resetCamChart,
    progressRef,
    changeSpeed,
    timeFactor,
    handleProgressChange,
  };
};
