import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import Rawdata from '@/data/patient_P3434223_maps.json';
import { or } from 'mathjs';

interface TraceDataFormat {
  x: number[];
  y: number[];
  type: 'scatter';
  mode: 'lines+markers';
  marker: {
    color: string;
    size: number;
  };
}

type MetaInfoType = {
  [key: string]: number;
};

const metaInfoColor = {
  QRS_start: 'blue',
  QRS_end: 'blue',
  R_peak: 'green',
  T_end: 'red',
  T_peak: 'red',
  T_start: 'red',
  P_start: 'orange',
  P_end: 'orange',
  P_peak: 'orange',
};

const generateColorPalette = (count: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

const createMetaInfo = (metaData: MetaInfoType) => {
  console.log(metaData);
  let metaDataList = [];
  metaDataList = Object.entries(metaData).map(([key, x]) => {
    return {
      x: [x, x],
      y: [-1, 1],
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: metaInfoColor[key],
        width: 1,
      },
      marker: {
        size: 1,
        opacity: 0,
      },
      hoverinfo: 'text',
      text: [key, key],
    };
  });

  return metaDataList;
};

const createPQRSTData = (
  originData: any,
  key: string = 'extracted_dev_avg_data',
  metaInfoKey: string = 'metainfo'
): TraceDataFormat[] => {
  const series = originData[key];
  const timeSeriesLength = series[0]?.length ?? 0;

  // PQRST 포인트 기록
  const metaInfo = originData[metaInfoKey];
  const metaInfoList = createMetaInfo(metaInfo);

  const x = Array.from({ length: timeSeriesLength }, (_, i) => i);
  const colors = generateColorPalette(series.length);

  const data = series.map((row: number[], idx: number) => ({
    x,
    y: row,
    type: 'scatter',
    mode: 'lines',
    line: {
      color: colors[idx],
      size: 0.5,
    },
  }));

  return data.concat(metaInfoList);
};

export const PQRSTChart = () => {
  const pqrstData = useMemo(() => createPQRSTData(Rawdata), []);

  return (
    <div className='w-full h-[400px]'>
      <Plot
        data={pqrstData}
        layout={{
          showlegend: false,
          xaxis: { showgrid: false },
        }}
        style={{ width: '100%', height: '100%' }}
        config={{
          displayModeBar: false,
        }}
      />
    </div>
  );
};
