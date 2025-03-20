import { useRef, useState } from 'react';
import raw_data from '@/data/feature_data_Rounding.json';

const makeDegreeToRad = (degree: number) => {
  return (Math.PI / 180) * degree;
};
// 화살표 끝점 로직 분리

const generateCamData = (rawData, size: number, series_length) => {
  // 초기 좌표 만들기
  const xStart = [];
  const yStart = [];

  // 끝점 배열
  const xEndArray = [];
  const yEndArray = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      xStart.push(i);
      yStart.push(j);
    }
  }
  //JSON 데이터 가져오기
  const totalMagData = [];
  const totalDegreeData = [];
  for (let s = 0; s < series_length; s++) {
    const magData = [];
    let degreeData = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        magData.push(rawData[i]['current_xy_mag'][j][s]);
        degreeData.push(rawData[i]['current_xy_degree'][j][s]);
      }
    }
    //degree => Rad로 변환
    degreeData = degreeData.map((degree) => makeDegreeToRad(degree));
    totalMagData.push(magData);
    totalDegreeData.push(degreeData);
  }

  console.log(totalMagData);

  for (let s = 0; s < series_length; s++) {
    const xEnd = xStart.map((x, i) => {
      let magnitude = totalMagData[s][i] * 100;
      magnitude = Math.min(Math.max(magnitude, 0.6), 1);
      return x + magnitude * Math.cos(totalDegreeData[s][i]);
    });

    const yEnd = yStart.map((y, i) => {
      let magnitude = totalMagData[s][i] * 100;
      magnitude = Math.min(Math.max(magnitude, 0.6), 1);
      return y + magnitude * Math.sin(totalDegreeData[s][i]);
    });

    xEndArray.push(xEnd);
    yEndArray.push(yEnd);
  }

  return { xStart, yStart, xEndArray, yEndArray, totalMagData };
};

export const useCamChart = (rawData, size: number, series_length: number) => {
  const plotRef = useRef<any>(null);
  const index = useRef<number>(0);
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * todo: series_length 하드코딩한 이유는 아직 데이터 형식이나 정해진 길이가 없기에
   * todo: 나중에 기획이 픽스되면 수정할 예정
   */
  const { xStart, yStart, xEndArray, yEndArray, totalMagData } =
    generateCamData(raw_data, size, series_length);

  const data = {
    x: xStart,
    y: yStart,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 1, color: 'transparent' },
    name: 'Points',
  };

  const annotations = xStart.map((_, i) => ({
    x: xEndArray[index.current][i],
    y: yEndArray[index.current][i],
    ax: xStart[i],
    ay: yStart[i],
    xref: 'x',
    yref: 'y',
    axref: 'x',
    ayref: 'y',
    showarrow: true,
    arrowhead: 2, // arrowHead 모양
    arrowsize: Math.min(
      Math.max(totalMagData[index.current][i] * 100, 0.8),
      1.5
    ),
    arrowwidth: Math.min(
      Math.max(totalMagData[index.current][i] * 100, 1),
      1.5
    ),
    arrowcolor: 'black',
  }));

  const layoutConfig = {
    title: '2D Scatter Plot with Arrows',
    xaxis: { visible: false, showgrid: false },
    yaxis: { visible: false, showgrid: false },
    annotations: annotations,
    shapes: [],
  };

  const defaultConfig = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
    staticPlot: true,
  };

  return { plotRef, data, layoutConfig, defaultConfig };
};
