import React, { useEffect, useRef } from 'react';
import h337, { HeatmapData } from '@mars3d/heatmap.js';

const Heatmap: React.FC = () => {
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<h337.Heatmap<'value', 'x', 'y'> | null>(
    null
  );

  useEffect(() => {
    if (!heatmapContainerRef.current) return;

    // Heatmap.js 인스턴스 생성
    heatmapInstanceRef.current = h337.create<'value', 'x', 'y'>({
      container: heatmapContainerRef.current,
      radius: 40,
      maxOpacity: 0.7,
      minOpacity: 0.1,
      blur: 0.75,
      gradient: {
        0.1: 'blue',
        0.3: 'green',
        0.5: 'yellow',
        0.7: 'orange',
        1.0: 'red',
      },
    });

    // 히트맵 데이터 생성
    const points = [];
    let max = 0;
    const width = 840;
    const height = 400;
    const len = 100;

    for (let i = 0; i < len; i++) {
      const val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      points.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val,
      });
    }

    const data: HeatmapData<{ x: number; y: number; value: number }> = {
      max,
      min: 0, // 최소값 추가
      data: points,
    };

    // Heatmap 데이터 설정
    heatmapInstanceRef.current.setData(data);
  }, []);

  return (
    <div
      ref={heatmapContainerRef}
      style={{
        position: 'relative',
        width: '840px',
        height: '400px',
        border: '1px solid #ddd',
      }}
    />
  );
};

export default Heatmap;
