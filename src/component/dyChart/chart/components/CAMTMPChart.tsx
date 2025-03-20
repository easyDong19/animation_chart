import Plot from 'react-plotly.js';
import raw_data from '@/data/feature_data_Rounding.json';

const makeDegreeToRad = (degree: number) => {
  return (Math.PI / 180) * degree;
};

const generateCamChartData = (size: number) => {
  const mag_data = [];
  let degree_data = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      mag_data.push(raw_data[i]['current_xy_mag'][j][0]);
      degree_data.push(raw_data[i]['current_xy_degree'][j][0]);
    }
  }
  degree_data = degree_data.map((degree) => makeDegreeToRad(degree));

  return { mag_data, degree_data };
};
const VectorFieldArrows = () => {
  const { mag_data, degree_data } = generateCamChartData(21);
  const gridSize = 10;
  const spacing = 2;
  const arrowScale = 1.5;
  const arrowHeadSize = 0.5;

  const arrowLines = {
    type: 'scatter3d',
    mode: 'lines',
    x: [],
    y: [],
    z: [],
    line: { color: 'black', width: 3 },
  };

  const arrowHeads = {
    type: 'mesh3d',
    x: [],
    y: [],
    z: [],
    i: [],
    j: [],
    k: [],
    color: 'black',
    opacity: 1,
  };

  let index = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x0 = i * spacing;
      const y0 = j * spacing;
      const z0 = 1;

      const angle = Math.sin(i * 0.5) * Math.cos(j * 0.5) * Math.PI;
      const ux = Math.cos(angle) * arrowScale;
      const vy = Math.sin(angle) * arrowScale;
      const wz = 0;

      const x1 = x0 + ux;
      const y1 = y0 + vy;
      const z1 = z0 + wz;

      arrowLines.x.push(x0, x1, null);
      arrowLines.y.push(y0, y1, null);
      arrowLines.z.push(z0, z1, null);

      const anglePerp = angle + Math.PI / 2;
      const ax = x1 - Math.cos(anglePerp) * arrowHeadSize;
      const ay = y1 - Math.sin(anglePerp) * arrowHeadSize;
      const bx = x1 + Math.cos(anglePerp) * arrowHeadSize;
      const by = y1 + Math.sin(anglePerp) * arrowHeadSize;
      const cx = x1 + ux * 0.2;
      const cy = y1 + vy * 0.2;

      // 삼각형 정점 추가
      arrowHeads.x.push(ax, bx, cx);
      arrowHeads.y.push(ay, by, cy);
      arrowHeads.z.push(z1, z1, z1);

      // 삼각형 면 연결
      arrowHeads.i.push(index, index + 1, index + 2);
      arrowHeads.j.push(index + 1, index + 2, index);
      arrowHeads.k.push(index + 2, index, index + 1);

      index += 3; // 정점 인덱스 증가
    }
  }

  return (
    <Plot
      data={[arrowLines, arrowHeads]}
      layout={{
        title: '3D Vector Field with Arrows',
        width: 1000,
        height: 1000,
        scene: {
          xaxis: {
            visible: false,
            showgrid: false,
            showline: true,
            zeroline: true,
            title: 'X Axis',
          },
          yaxis: {
            visible: false,
            showgrid: false,
            showline: true,
            zeroline: true,
            title: 'Y Axis',
          },
          zaxis: {
            visible: false,
            showgrid: false,
          },
          camera: {
            eye: { x: 0, y: 0, z: -1.5 },
          },
        },
        showlegend: false,
        paper_bgcolor: 'white',
      }}
      config={{ displayModeBar: false }}
    />
  );
};

export default VectorFieldArrows;
