import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const AnimatedChart = () => {
  const [xRange, setXRange] = useState<[number, number]>([0, 10]);
  const [isMoving, setIsMoving] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setXRange(([start, end]) => [start + speed, end + speed]); // X축 이동
    }, 50); // 50ms마다 업데이트

    return () => clearInterval(interval);
  }, [isMoving, speed]);

  return (
    <div>
      <button onClick={() => setIsMoving(true)}>Start</button>
      <button onClick={() => setIsMoving(false)}>Stop</button>
      <button onClick={() => setSpeed((prev) => Math.max(1, prev + 1))}>
        Speed Up
      </button>
      <button onClick={() => setSpeed((prev) => Math.max(1, prev - 1))}>
        Slow Down
      </button>

      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5],
            y: [1, 4, 9, 16, 25],
            mode: 'lines',
            type: 'scatter',
          },
        ]}
        layout={{
          title: 'React-based Animated X-axis',
          xaxis: { range: xRange },
          yaxis: { range: [0, 30] },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default AnimatedChart;
