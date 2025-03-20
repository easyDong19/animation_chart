import { useRef, useState } from 'react';
import raw_data from '@/data/feature_data_Rounding.json';
import { useAnimationFrame } from '@/util/useAnimationFrame';

const makeDegreeToRad = (degree: number) => {
  return (Math.PI / 180) * degree;
};

const generateCamData = (rawData, size: number, series_length) => {
  const xStart = [];
  const yStart = [];
  const annotationsArray = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      xStart.push(i);
      yStart.push(j);
    }
  }

  for (let s = 0; s < series_length; s++) {
    const magData = [];
    let degreeData = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        magData.push(rawData[i]['current_xy_mag'][j][s]);
        degreeData.push(rawData[i]['current_xy_degree'][j][s]);
      }
    }

    degreeData = degreeData.map((degree) => makeDegreeToRad(degree));

    const annotations = xStart.map((_, i) => {
      let magnitude = magData[i] * 100;
      magnitude = Math.min(Math.max(magnitude, 0.6), 1);

      return {
        x: xStart[i] + magnitude * Math.cos(degreeData[i]),
        y: yStart[i] + magnitude * Math.sin(degreeData[i]),
        ax: xStart[i],
        ay: yStart[i],
        xref: 'x',
        yref: 'y',
        axref: 'x',
        ayref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: Math.min(Math.max(magData[i] * 100, 0.8), 1.5),
        arrowwidth: Math.min(Math.max(magData[i] * 100, 1), 1.5),
        arrowcolor: 'black',
      };
    });

    annotationsArray.push(annotations);
  }

  return { xStart, yStart, annotationsArray };
};

export const useCamChart = (rawData, size: number, series_length: number) => {
  const plotRef = useRef<any>(null);
  const index = useRef<number>(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const { xStart, yStart, annotationsArray } = generateCamData(
    raw_data,
    size,
    series_length
  );

  const data = {
    x: xStart,
    y: yStart,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 1, color: 'transparent' },
    name: 'Points',
  };

  const layoutConfig = {
    title: '2D Scatter Plot with Arrows',
    xaxis: { visible: false, showgrid: false },
    yaxis: { visible: false, showgrid: false },
    annotations: annotationsArray[0],
    shapes: [],
  };

  const defaultConfig = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
    staticPlot: true,
  };

  const updateCamChart = () => {
    if (plotRef.current && index.current < annotationsArray.length - 1) {
      index.current += 1;
      console.log(index.current);

      // 기존 layoutConfig 복사 후 annotations만 업데이트
      const newLayout = {
        ...layoutConfig,
        annotations: annotationsArray[index.current],
      };

      // react()를 사용하여 차트 업데이트
      window.Plotly.react(plotRef.current.el, [data], newLayout);
    }
  };

  const startUpdate = () => {
    setIsUpdate(true);
  };

  useAnimationFrame(
    () => {
      if (isUpdate) {
        updateCamChart();
      }
    },
    isUpdate,
    25
  );

  return { plotRef, data, layoutConfig, defaultConfig, startUpdate };
};
