import Plot from 'react-plotly.js';
import raw_data from '@/data/feature_data_Rounding.json';

const makeDegreeToRad = (degree: number) => {
  return (Math.PI / 180) * degree;
};

const generateCamData = (size: number) => {
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
  const magData = [];
  let degreeData = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      magData.push(raw_data[i]['current_xy_mag'][j][4]);
      degreeData.push(raw_data[i]['current_xy_degree'][j][4]);
    }
  }
  //degree => Rad로 변환
  degreeData = degreeData.map((degree) => makeDegreeToRad(degree));

  console.log(magData);
  console.log(degreeData);

  const xEnd = xStart.map(
    (x, i) => x + magData[i] * 100 * Math.cos(degreeData[i])
  );
  const yEnd = yStart.map(
    (y, i) => y + magData[i] * 100 * Math.sin(degreeData[i])
  );

  return { xStart, yStart, xEnd, yEnd, magData };
};

const ScatterPlotWithArrows = () => {
  const { xStart, yStart, xEnd, yEnd, magData } = generateCamData(21);

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
    arrowhead: magData[i],
    arrowsize: magData[i],
    arrowwidth: magData[i],
    arrowcolor: 'black',
  }));

  const layout = {
    title: '2D Scatter Plot with Arrows',
    xaxis: { title: 'X Axis', showgrid: true },
    yaxis: { title: 'Y Axis', showgrid: true },
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
