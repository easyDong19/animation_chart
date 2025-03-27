import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import Plot from 'react-plotly.js';
import Rawdata from '@/data/patient_P3434223_maps.json';
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
  return Object.entries(metaData).map(([key, x]) => ({
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
  }));
};

const createPQRSTData = (
  originData: any,
  key: string = 'extracted_dev_avg_data',
  metaInfoKey: string = 'metainfo'
): TraceDataFormat[] => {
  const series = originData[key];
  const timeSeriesLength = series[0]?.length ?? 0;
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
      width: 0.5,
    },
  }));

  return data.concat(metaInfoList);
};

export const PQRSTChart = () => {
  const plotRef = useRef<any>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const pqrstData = useMemo(() => createPQRSTData(Rawdata), []);
  const [isUpdate, setIsUpdate] = useState(false);
  const index = useRef<number>(0);
  const frameCount = pqrstData[0].x.length;

  const updateKeyPoint = () => {
    index.current += 1;
    if (index.current >= frameCount) {
      setIsUpdate(false);
    }

    const newX = [[index.current, index.current]];
    const newText = [`index: ${index.current}`, `index: ${index.current}`];

    window.Plotly.restyle(plotRef.current.el, { x: newX, text: newText }, [
      pqrstData.length,
    ]);

    if (progressRef.current) {
      progressRef.current.value = index.current.toString(); // ✅ 정수 그대로
    }
  };

  const ResetIndex = useCallback(() => {
    setIsUpdate(false);
    index.current = 0;

    window.Plotly.restyle(
      plotRef.current.el,
      {
        x: [[0, 0]],
        text: ['index: 0', 'index: 0'],
      },
      [pqrstData.length]
    );

    if (progressRef.current) {
      progressRef.current.value = '0';
    }
  }, [pqrstData.length]);

  useInterval(() => {
    if (isUpdate) updateKeyPoint();
  }, 100);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(event.target.value);
    index.current = newIndex;

    window.Plotly.restyle(
      plotRef.current.el,
      {
        x: [[newIndex, newIndex]],
        text: [`index: ${newIndex}`, `index: ${newIndex}`],
      },
      [pqrstData.length]
    );
  };

  const playKeyPoint = useMemo(
    () => ({
      x: [0, 0],
      y: [-1, 1],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 'red',
        width: 1,
        dash: 'dot',
      },
      hoverinfo: 'text',
      text: ['index: 0', 'index: 0'],
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
      <div className='flex'>
        <input
          type='range'
          ref={progressRef}
          min='0'
          max={frameCount - 1}
          defaultValue='0'
          step='1'
          onChange={handleProgressChange}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};
