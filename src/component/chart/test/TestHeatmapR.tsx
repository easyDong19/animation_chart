import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

const generateHeatmapData = (size: number, frames: number) => {
  return Array.from({ length: frames }, () =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.random() * 100)
    )
  );
};

const HeatmapRChart = () => {
  const plotRef = useRef<any>(null); // Plotly 인스턴스 저장
  const index = useRef(0);

  const size = 30;

  const zData = generateHeatmapData(30, 500); // 500개의 프레임을 생성
  const x = Array.from({ length: size }, (_, i) => i);
  const y = Array.from({ length: size }, (_, i) => i);

  const config = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
    staticPlot: true,
  };

  const layoutConfig = {
    title: '30x30 Heatmap (Blur Effect)',
    autosize: false,
    width: 800,
    height: 800,
    xaxis: { visible: false },
    yaxis: { visible: false },
  };

  // ✅ 버튼 클릭 시 index만 변경하여 z 데이터 업데이트
  const updateHeatmap = () => {
    console.log(plotRef.current);
    if (plotRef.current) {
      // ✅ 기존 Plot의 data 업데이트 (새로운 리렌더링 방지)
      index.current = index.current + 1;
      window.Plotly.react(
        plotRef.current.el,
        [
          {
            x: x,
            y: y,
            z: zData[index.current], // ✅ index 값에 따라 z 값만 변경
            type: 'heatmap',
            colorscale: 'Jet',
            zsmooth: 'best',
          },
        ],
        plotRef.current.props.layout
      );
    }
  };

  return (
    <div>
      <button
        onClick={updateHeatmap}
        className='px-4 py-2 text-white bg-blue-500'
      >
        히트맵 업데이트
      </button>

      <Plot
        ref={plotRef} // ✅ useRef를 사용하여 Plot 인스턴스 저장
        data={[
          {
            x: x,
            y: y,
            z: zData[index.current], // ✅ 초기 z 값
            type: 'heatmap',
            colorscale: 'Jet',
            zsmooth: 'best',
          },
        ]}
        layout={layoutConfig}
        config={config}
      />
    </div>
  );
};

export default HeatmapRChart;
