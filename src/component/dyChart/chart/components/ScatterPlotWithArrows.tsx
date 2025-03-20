import Plot from 'react-plotly.js';
import raw_data from '@/data/feature_data_Rounding.json';

const makeDegreeToRad = (degree: number) => {
  return (Math.PI / 180) * degree;
};

const generateCamData = (size: number, series_length: number) => {
  // 초기 좌표 만들기
  const xStart = [];
  const yStart = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      xStart.push(i);
      yStart.push(j);
    }
  }

  //JSON 데이터 가져오기
  // todo : 자기장 세기 정규화
  const totalMagData = [];
  const totalDegreeData = [];
  for (let s = 0; s < series_length; s++) {
    const magData = [];
    let degreeData = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        magData.push(raw_data[i]['current_xy_mag'][j][s]);
        degreeData.push(raw_data[i]['current_xy_degree'][j][s]);
      }
    }
    //degree => Rad로 변환
    degreeData = degreeData.map((degree) => makeDegreeToRad(degree));
    totalMagData.push(magData);
    totalDegreeData.push(degreeData);
  }

  // 화살표 크기 정규화
  const xEnd = xStart.map((x, i) => {
    let magnitude = totalMagData[0][i] * 100;
    magnitude = Math.min(Math.max(magnitude, 0.4), 1);
    return x + magnitude * Math.cos(totalDegreeData[0][i]);
  });

  const yEnd = yStart.map((y, i) => {
    let magnitude = totalMagData[0][i] * 100;
    magnitude = Math.min(Math.max(magnitude, 0.4), 1);
    return y + magnitude * Math.sin(totalDegreeData[0][i]);
  });

  return { xStart, yStart, xEnd, yEnd, totalMagData };
};

const ScatterPlotWithArrows = () => {
  const { xStart, yStart, xEnd, yEnd, totalMagData } = generateCamData(21, 461);

  const scatterData = {
    x: xStart,
    y: yStart,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 1, color: 'transparent' },
    name: 'Points',
  };

  const annotations = xStart.map((_, i) => ({
    x: xEnd[i],
    y: yEnd[i],
    ax: xStart[i],
    ay: yStart[i],
    xref: 'x',
    yref: 'y',
    axref: 'x',
    ayref: 'y',
    showarrow: true,
    arrowhead: 2, // arrowHead 모양
    arrowsize: Math.min(Math.max(totalMagData[0][i] * 100, 0.8), 1.5),
    arrowwidth: Math.min(Math.max(totalMagData[0][i] * 100, 1), 1.5),
    arrowcolor: 'black',
  }));

  const layout = {
    title: '2D Scatter Plot with Arrows',
    xaxis: { visible: false, showgrid: false },
    yaxis: { visible: false, showgrid: false },
    annotations: annotations,
    shapes: [],
  };

  const defaultConfig = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
    staticPlot: true,
  };

  return (
    <div className='border w-2/4 h-full aspect-[1/1]'>
      <Plot
        data={[scatterData]}
        layout={layout}
        config={defaultConfig}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ScatterPlotWithArrows;
