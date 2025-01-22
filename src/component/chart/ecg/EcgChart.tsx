import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  ChartOptions,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useInterval } from '../../../util/useInterval';
import seedrandom from 'seedrandom';
import SignalData from './SignalData';

ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  zoomPlugin
);

const EcgChart = forwardRef((_, ref) => {
  const rng = seedrandom('my-fixed-seed');
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [xAxisRange, setXAxisRange] = useState({ min: 0, max: 100 });
  const [speedRange, setSpeedRange] = useState(40);
  const totalDataPoints = 10000;

  const generateTmpData = () => {
    const data = [];
    const min = -4;
    const max = 2;
    let value = 0;

    for (let i = 0; i < totalDataPoints; i++) {
      if (i % 20 === 0) {
        value = Math.floor(rng() * (max - min + 1)) + min;
      } else {
        value = Math.abs(Math.sin(i * 0.2)) * 5 + rng() * 2;
      }
      data.push({ x: i, y: value });
    }

    return data;
  };

  // const generateTmpData = () => {
  //   const data = [];

  //   SignalData.forEach((item, idx) => {
  //     data.push({ x: idx, y: item });
  //   });
  //   return data;
  // };

  const moveXAxis = (chart: ChartJS<'line'>) => {
    if (!chart.options.scales || !chart.options.scales.x) return;

    const { min, max } = xAxisRange;
    // 찍는 프레임을 고치지말고 여기 한번에 가는 걸 고쳐보자

    const newMin = Math.max(0, min + 1);
    const newMax = max + 1;

    setXAxisRange({ min: newMin, max: newMax });
    chart.options.scales.x.min = newMin;
    chart.options.scales.x.max = newMax;

    chart.update('none');
  };

  useInterval(
    () => {
      if (chartRef.current) {
        moveXAxis(chartRef.current);
      }
    },
    isAnimating ? speedRange : null
  );

  useImperativeHandle(ref, () => ({
    startGraph: () => setIsAnimating(true),
    stopGraph: () => setIsAnimating(false),
    resetGraph: () => {
      setXAxisRange({ min: 0, max: 100 });
    },
    changeSpeed: (newSpeed: number) => setSpeedRange(newSpeed),
  }));

  const chartData = {
    datasets: [
      {
        label: 'ECG Signal',
        borderColor: '#2563EB',
        borderWidth: 5,
        tension: 0,
        fill: false,
        pointRadius: 0,
        data: generateTmpData(),
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        type: 'linear',
        min: xAxisRange.min,
        max: xAxisRange.max,
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          callback: function (value, index, ticks) {
            if (index === 0 || index === ticks.length - 1) {
              return '';
            } else if (Number(value) < 0) {
              return '';
            }
            return value;
          },
          autoSkip: true,
          maxTicksLimit: 50,
        },
      },
      y: {
        min: -5,
        max: 10,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          onPanComplete: (ctx) => {
            const { min, max } = ctx.chart.scales.x;

            setXAxisRange({ min, max });
            if (max < 0) {
              setXAxisRange({ min: 0, max: 100 });
            }
          },
        },
        // zoom: {
        //   wheel: {
        //     enabled: true,
        //   },
        //   pinch: {
        //     enabled: true,
        //   },
        //   mode: 'x',
        //   onZoomComplete: (ctx) => {
        //     const { min, max } = ctx.chart.scales.x;
        //     setXAxisRange({ min, max });
        //   },
        // },
      },
    },
  };

  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
});

export default EcgChart;
