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
    const min = 75;
    const max = 83;
    let value = 0;

    for (let i = 0; i < totalDataPoints; i++) {
      value = Math.floor(rng() * (max - min + 1)) + min;
      data.push({ x: i, y: value });
    }

    return data;
  };

  const moveXAxis = (chart: ChartJS<'line'>) => {
    if (!chart.options.scales || !chart.options.scales.x) return;

    const { min, max } = xAxisRange;

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
        borderColor: '#3B82F6',
        borderWidth: 6,
        tension: 0,
        fill: false,
        pointRadius: 0,
        stepped: 'before',
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
        title: {
          display: true,
          text: 'Time(seconds)',
        },
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
            return Number(value) / 100;
          },
          autoSkip: true,
          maxTicksLimit: 50,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amplitude',
        },
        min: 60,
        max: 100,
        grid: {
          drawBorder: false, // 축 선 숨기기
          color: (context) => {
            // Y축 눈금이 80일 때만 선을 그리도록 설정
            return context.tick.value === 80 ? '#64748B' : 'transparent';
          },
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
  const removeVerticalLinesPlugin = {
    id: 'removeVerticalLines',
    beforeDatasetDraw(chart) {
      const { ctx, data, scales } = chart;
      const dataset = data.datasets[0];
      const meta = chart.getDatasetMeta(0);
      const points = meta.data;

      // 클리핑 설정
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        scales.x.left, // X축 왼쪽 경계
        scales.y.top, // Y축 상단 경계
        scales.x.right - scales.x.left, // X축 너비
        scales.y.bottom - scales.y.top // Y축 높이
      );
      ctx.clip();

      // 수평선만 수동으로 그리기
      for (let i = 0; i < points.length - 1; i++) {
        const currentPoint = points[i];
        const nextPoint = points[i + 1];

        // 수평선만 그리기
        ctx.beginPath();
        ctx.moveTo(currentPoint.x, currentPoint.y);
        ctx.lineTo(nextPoint.x, currentPoint.y);
        ctx.strokeStyle = dataset.borderColor || 'rgba(54, 162, 235, 1)';
        ctx.lineWidth = dataset.borderWidth || 2;
        ctx.stroke();
      }

      // 캔버스 상태 복원
      ctx.restore();

      // 기본 드로잉 방지
      return false;
    },
  };

  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions}
        plugins={[removeVerticalLinesPlugin]}
      />
    </div>
  );
});

export default EcgChart;
