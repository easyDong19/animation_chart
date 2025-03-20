import { useEffect, useRef, useState } from 'react';
import raw_data from '@/data/feature_data_Rounding.json';
import { useAnimationFrame } from '@/util/useAnimationFrame';
import { useInterval } from '@/util/useInterval';
import { time } from 'three/tsl';

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
  // todo : ref로 직접 dom 건드려서 frame/남은 frame text 넣어줘야함
  const [timeFactor, setTimeFactor] = useState<number>(1);

  const progressRef = useRef<HTMLProgressElement>(null);

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
    annotations: annotationsArray[index.current],
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

      const newLayout = {
        ...layoutConfig,
        annotations: annotationsArray[index.current],
      };

      // react()를 사용하여 차트 업데이트
      window.Plotly.react(plotRef.current.el, [data], newLayout);

      // 재생 바 업데이트 (DOM 직접 조작)
      if (progressRef.current) {
        progressRef.current.value =
          (index.current / (annotationsArray.length - 1)) * 100;
      }
    } else {
      stopUpdate();
    }
  };

  const startUpdate = () => {
    setIsUpdate(true);
  };

  const stopUpdate = () => {
    setIsUpdate(false);
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Math.round(
      (parseFloat(event.target.value) / 100) * (annotationsArray.length - 1)
    );
    index.current = newIndex;

    const newLayout = {
      annotations: annotationsArray[newIndex],
    };

    window.Plotly.relayout(plotRef.current.el, newLayout);
  };

  const changeSpeed = (speedFactor: number) => {
    setTimeFactor(speedFactor);
    console.log('클릭됨?');
    console.log(timeFactor);
  };

  const resetCamChart = () => {
    index.current = 0;

    const initLayout = {
      ...layoutConfig,
      annotations: annotationsArray[index.current],
    };

    console.log(initLayout);
    console.log(index.current);
    window.Plotly.react(plotRef.current.el, [data], initLayout);
    progressRef.current.value = 0;
  };

  // useAnimationFrame(
  //   () => {
  //     if (isUpdate) {
  //       updateCamChart();
  //     }
  //   },
  //   isUpdate,
  //   4
  // );

  useInterval(() => {
    if (isUpdate) {
      updateCamChart();
    }
  }, 1000 / timeFactor);

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
