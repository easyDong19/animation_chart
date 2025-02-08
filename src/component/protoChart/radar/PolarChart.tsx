import Plot from 'react-plotly.js';

const PolarScatterPlot = () => {
  // 데이터 생성
  const data = [
    {
      type: 'scatterpolar', // Polar Scatter Plot 타입
      mode: 'markers', // 점만 표시
      r: Array.from({ length: 20 }, () => Math.random() * 10), // 반지름 값 (랜덤 생성)
      theta: Array.from({ length: 20 }, () => Math.random() * 360), // 각도 값 (랜덤 생성)
      marker: {
        size: 8, // 점 크기
        color: 'rgba(54, 162, 235, 0.8)', // 점 색상
      },
    },
    {
      type: 'scatterpolar',
      mode: 'lines',
      r: [0, ...Array.from({ length: 50 }, () => 8), 0], // 중심(0)에서 시작하고, 일정한 반지름(10)으로 호를 그린 후 다시 중심(0)으로 닫음
      theta: [0, ...Array.from({ length: 50 }, (_, i) => (i / 49) * 120), 0], // 0도에서 120도까지 호를 그리고 다시 0도로 닫음
      fill: 'toself', // 영역 채우기
      fillcolor: 'rgba(255, 99, 132, 0.3)', // 영역 색상
      line: {
        color: 'rgba(255, 99, 132, 0.8)', // 선 색상
      },
    },
    {
      type: 'scatterpolar',
      mode: 'lines',
      r: [0, ...Array.from({ length: 50 }, () => 10), 0], // 중심(0)에서 시작하고, 일정한 반지름(10)으로 호를 그린 후 다시 중심(0)으로 닫음
      theta: [
        270,
        ...Array.from({ length: 50 }, (_, i) => 270 + (i / 49) * 60),
        270,
      ], // 0도에서 120도까지 호를 그리고 다시 0도로 닫음
      fill: 'toself', // 영역 채우기
      fillcolor: 'rgba(75, 192, 192, 0.3)', // 영역 색상
      line: {
        color: 'rgba(75, 192, 192, 0.8)', // 선 색상
      },
    },
    {
      type: 'scatterpolar',
      mode: 'lines',
      r: [0, ...Array.from({ length: 50 }, () => 10), 0], // 중심(0)에서 시작하고, 일정한 반지름(10)으로 호를 그린 후 다시 중심(0)으로 닫음
      theta: [
        150,
        ...Array.from({ length: 50 }, (_, i) => 150 + (i / 49) * 60),
        150,
      ], // 0도에서 120도까지 호를 그리고 다시 0도로 닫음
      fill: 'toself', // 영역 채우기
      fillcolor: '#F8F9C2', // 영역 색상
      opacity: 0.3,
      line: {
        color: '#cdcf83', // 선 색상
      },
    },
  ];

  // 레이아웃 설정
  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 10],
      },
      angularaxis: {
        visible: true, // 각도 축 표시
        tickmode: 'array', // 사용자 정의 틱 표시
        tickvals: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330], // 틱 값(각도)
        ticktext: [
          '-90°',
          '-60°',
          '-30°',
          '0°',
          '30°',
          '60°',
          '90°',
          '120°',
          '150°',
          '±180°',
          '-150°',
          '-120°',
        ], // 틱에 표시될 텍스트
        direction: 'clockwise', // 각도 방향 (시계 방향)
        rotation: 90, // 기준 각도를 90도로 설정
      },
    },
    showlegend: false, // 범례 숨기기
    margin: { t: 20, r: 20, b: 20, l: 20 }, // 여백 조정
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={data}
        layout={layout}
        config={{
          responsive: true,
          displayModeBar: false,
          scrollZoom: false,
          doubleClick: false,
          staticPlot: true,
        }}
        style={{ width: 500, height: '100%' }}
      />
    </div>
  );
};

export default PolarScatterPlot;
