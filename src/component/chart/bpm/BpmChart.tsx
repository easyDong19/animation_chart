import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from 'chart.js';
import { useRef, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import seedrandom from 'seedrandom';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, Legend, zoomPlugin);

const DiscreteScatterChart = () => {
  const rng = seedrandom('my-fixed-seed');
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [xAxisRange, setXAxisRange] = useState({ min: 0, max: 100 });
  const [speedRange, setSpeedRange] = useState(20);
  const totalDataPoints = 10000;

  const generateTmpData = () => {
    const data = [];
    const min = 70;
    const max = 90;
    let value = 0;

    for (let i = 0; i < totalDataPoints; i++) {
      value = Math.floor(rng() * (max - min + 1)) + min;
      data.push({ x: i, y: value });
    }

    return data;
  };
  const data = {
    datasets: [
      {
        data: generateTmpData(),
        backgroundColor: '#3B82F6',
        pointRadius: 5,
        pointStyle: 'rect',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        },
        ticks: {
          stepSize: 1, // X축 간격
          maxTicksLimit: 50,
          callback: function (value) {
            return value.toFixed(1); // 고정된 소수점 형식으로 표시
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amplitude',
        },
        grid: {
          drawBorder: false, // 축 선 숨기기
          color: (context) => {
            // Y축 눈금이 80일 때만 선을 그리도록 설정
            return context.tick.value === 80 ? '#64748B' : 'transparent';
          },
        },
        ticks: {
          stepSize: 10, // Y축 눈금 간격
        },
        min: 60, // Y축 최소값 고정
        max: 100, // Y축 최대값 고정
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨김
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
      },
    },
  };

  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <Scatter ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default DiscreteScatterChart;
