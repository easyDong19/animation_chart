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

  const x = Array.from({ length: timeSeriesLength }, (_, i) => i);
  const colors = generateColorPalette(series.length);

  return series.map((row: number[], idx: number) => ({
    x,
    y: row,
    type: 'scatter',
    mode: 'lines',
    line: {
      color: colors[idx],
      size: 1,
    },
  }));
};

export const PQRSTChart = () => {
  const pqrstData = useMemo(() => createPQRSTData(Rawdata), []);

  const verticalLineTrace: TraceDataFormat = {
    x: [50, 50],
    y: [-1, 1],
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: 'red',
      width: 2,
    },
    marker: {
      size: 5,
      color: 'red',
      symbol: 'circle',
      opacity: 0,
    },
    hoverinfo: 'text',
    text: ['PQRST Key Point'],
    showlegend: false,
  };

  return (
    <div className='w-full h-[400px]'>
      <Plot
        data={pqrstData.concat(verticalLineTrace)}
        layout={{
          showlegend: false,
        }}
        style={{ width: '100%', height: '100%' }}
        config={{
          displayModeBar: false,
        }}
      />
    </div>
  );
};
