import React, { useCallback, useMemo, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import Rawdata from '@/data/patient_P3434223_maps.json';
import { or } from 'mathjs';
import { useInterval } from '@/util/useInterval';

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

const metaInfoColor: { [key: string]: string } = {
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
      text: [`info: ${key}\n index: ${x}`, `info: ${key}\n index: ${x}`],
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
  const plotRef = useRef<any>(null);
  const pqrstData = useMemo(() => createPQRSTData(Rawdata), []);
  const [isUpdate, setIsUpdate] = useState(false);
  const index = useRef<number>(0);
  const frameCount = pqrstData[0].x.length;

  const ResetIndex = useCallback(() => {
    setIsUpdate(false);
    index.current = 0;
    // 바로 위치 리셋
    window.Plotly.restyle(
      plotRef.current.el,
      {
        x: [[index.current, index.current]],
      },
      [pqrstData.length]
    ); // 마지막 trace의 index
  }, [pqrstData.length]);

  const updateKeyPoint = () => {
    index.current += 1;
    if (index.current >= frameCount) {
      setIsUpdate(false);
    }

    // playKeyPoint의 trace(index = pqrstData.length)의 x만 업데이트
    window.Plotly.restyle(
      plotRef.current.el,
      {
        x: [[index.current, index.current]],
        text: [`index: ${index.current}`, `index: ${index.current}`],
      },
      [pqrstData.length]
    );
  };

  useInterval(() => {
    if (isUpdate) {
      updateKeyPoint();
    }
  }, 100);

  // 마지막 trace가 움직이는 red line
  const playKeyPoint = useMemo(
    () => ({
      x: [index.current, index.current],
      y: [-1, 1],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 'red',
        width: 5,
        dash: 'dot',
      },

      hoverinfo: 'text',
      text: [`index: ${index.current}`, `index: ${index.current}`],
    }),
    []
  );

  return (
    <div className='w-full h-[500px] flex-col gap-5'>
      <Plot
        ref={plotRef}
        data={[...pqrstData, playKeyPoint]}
        layout={{
          showlegend: false,
          xaxis: { showgrid: false },
        }}
        style={{ width: '100%', height: '100%' }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
      />
      <div className='flex flex-row gap-3 mt-2'>
        <button className='p-2 border' onClick={() => setIsUpdate(true)}>
          시작
        </button>
        <button className='p-2 border' onClick={() => setIsUpdate(false)}>
          중지
        </button>
        <button className='p-2 border' onClick={ResetIndex}>
          리셋
        </button>
      </div>
    </div>
  );
};
