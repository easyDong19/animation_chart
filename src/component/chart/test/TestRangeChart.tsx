import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const RangeSliderChart = () => {
  const [range, setRange] = useState([-20, 56]); // 초기 범위 설정

  return (
    <div>
      <Plot
        data={[
          {
            type: 'scatter',
            mode: 'lines',
            x: [-180, -20, 56, 180], // x축 데이터
            y: [0, 1, 1, 0], // y축 데이터 (더미 값)
            fill: 'tozeroy',
            line: { color: 'lightblue' },
          },
        ]}
        layout={{
          title: 'Range Slider Example',
          xaxis: {
            range: [-180, 180], // 전체 범위
            rangeslider: { range: range }, // 선택된 범위 반영
          },
          yaxis: { visible: false },
          shapes: [
            {
              type: 'rect',
              xref: 'x',
              yref: 'paper',
              x0: range[0], // 왼쪽 범위
              x1: range[1], // 오른쪽 범위
              y0: 0,
              y1: 1,
              fillcolor: 'blue',
              opacity: 0.3,
              line: { width: 0 },
            },
          ],
        }}
        config={{ responsive: true }}
      />

      {/* HTML Range Input을 통한 슬라이더 조정 */}
      <input
        type='range'
        min='-180'
        max='180'
        value={range[0]}
        onChange={(e) => setRange([Number(e.target.value), range[1]])}
      />
      <input
        type='range'
        min='-180'
        max='180'
        value={range[1]}
        onChange={(e) => setRange([range[0], Number(e.target.value)])}
      />

      <div>
        선택된 범위: {range[0]} ~ {range[1]}
      </div>
    </div>
  );
};

export default RangeSliderChart;
