import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import heartFile from '../../../assets/heart.png';

const MagneticFieldMap = ({ isBlur }: { isBlur: boolean }) => {
  const [z, setZ] = useState(
    Array.from(
      { length: 10 },
      () => Array.from({ length: 3 }, () => Math.random() * 2 - 1) // 초기 Z값 (-1 ~ 1)
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setZ((prevZ) =>
        prevZ.map(
          (row) => row.map((cell) => cell + (Math.random() * 0.2 - 0.1)) // 작은 변화 추가
        )
      );
    }, 100); // 100ms마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const x = Array.from({ length: 3 }, (_, i) => i); // X 좌표
  const y = Array.from({ length: 10 }, (_, i) => i); // Y 좌표

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px' }}>
      <Plot
        data={[
          {
            z: z,
            x: x,
            y: y,
            type: 'contour',
            colorscale: [
              [0.0, 'rgba(14, 35, 120, 1)'],
              [0.1, 'rgba(18, 54, 200, 1)'],
              [0.2, 'rgba(46, 248, 255, 1)'],
              [0.3, 'rgba(101, 255, 183, 1)'],
              [0.4, 'rgba(148, 255, 35, 1)'],
              [0.6, 'rgba(244, 255, 37, 1)'],
              [0.8, 'rgba(253, 142, 15, 1)'],
              [1.0, 'rgba(255, 24, 24, 1 )'],
            ],
            //블러 있는 버전
            contours: {
              coloring: isBlur ? 'heatmap' : 'fill',
              showlines: false,
            },

            line: {
              width: 0, // 경계선 두께를 0으로 설정
            },
            showscale: false,
          },
        ]}
        layout={{
          autosize: true,
          margin: { l: 0, r: 0, t: 0, b: 0 },
          xaxis: {
            visible: false,
          },
          yaxis: {
            visible: false,
          },
          images: [
            {
              source: heartFile, // 배경 이미지 URL
              x: 0.35,
              y: 8.5, // Y 범위 끝값
              sizex: 2, // 데이터 크기에 맞게 설정
              sizey: 8, // 데이터 크기에 맞게 설정
              xref: 'x',
              yref: 'y',
              layer: 'above',
              opacity: 0.3,
            },
          ],
        }}
        config={{
          responsive: true,
          displayModeBar: false,
          scrollZoom: false,
          doubleClick: false,
          staticPlot: true,
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default MagneticFieldMap;
