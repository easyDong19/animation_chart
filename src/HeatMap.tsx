import React, { useEffect, useRef } from 'react';
import h337, { HeatmapData } from '@mars3d/heatmap.js';
import heartFile from './assets/heart.png';

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
      radius: 100,
      maxOpacity: 1,

      minOpacity: 0.8,
      blur: 0.85,
      gradient: {
        0.05: '#0E2378',
        0.1: '#1236C8',
        0.2: '#2Ef8FF',
        0.3: '#65FFB7',
        0.4: '#94FF23',
        0.6: '#F4FF25',
        0.8: '#FD8E0F',
        1.0: '#FF1818',
      },
    });

    // 히트맵 데이터 생성
    const points = [];
    let max = 100;
    const width = 500;
    const height = 400;
    const len = 2;

    for (let i = 0; i < len; i++) {
      const val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      points.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: 100,
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
    <div>
      <div
        ref={heatmapContainerRef}
        style={{
          position: 'relative',
          width: '500px',
          height: '400px',
          border: '1px solid #ddd',
        }}
      >
        <img
          src={heartFile}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default Heatmap;
