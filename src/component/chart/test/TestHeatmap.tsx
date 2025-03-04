import Plot from 'react-plotly.js';
import { useHeatmapChart } from '../../../hooks/useHeatmapChart';

const generateChartData = (size: number, dataLength: number = 30) => {
  return Array.from({ length: dataLength }, () =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.floor(Math.random() * 100))
    )
  );
};
const z = generateChartData(30, 500);

export const TestHeatmap = () => {
  const { x, y, index, startAutoPlay, stopAutoPlay, resetChart, changeSpeed } =
    useHeatmapChart(30, z.length);

  return (
    <div className='flex flex-col'>
      <div>버튼 리스트</div>
      <div className='flex flex-row gap-4 my-4'>
        <button
          onClick={startAutoPlay}
          className='px-4 py-2 font-semibold text-white transition duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600'
        >
          시작
        </button>
        <button
          onClick={stopAutoPlay}
          className='px-4 py-2 font-semibold text-white transition duration-300 bg-red-500 rounded-lg shadow-md hover:bg-red-600'
        >
          중지
        </button>
        <button
          onClick={resetChart}
          className='px-4 py-2 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600'
        >
          리셋
        </button>
      </div>

      <div className='flex flex-row gap-4'>
        <button
          onClick={() => changeSpeed(2)}
          className='px-4 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600'
        >
          2배 씩 속도 늘리기
        </button>

        <button
          onClick={() => changeSpeed(-2)}
          className='px-4 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600'
        >
          2배 씩 속도 낮추기
        </button>
      </div>

      <Plot
        data={[
          {
            x: x,
            y: y,
            z: z[index],
            type: 'heatmap',
            colorscale: 'Jet',
            zsmooth: 'best',
          },
        ]}
        config={{
          displayModeBar: false,
          scrollZoom: false,
          responsive: true,
          staticPlot: true,
        }}
        layout={{
          title: '30x30 Heatmap (Blur Effect)',
          autosize: false,
          width: 800,
          height: 800,
          xaxis: { visible: false },
          yaxis: { visible: false },
        }}
      />
    </div>
  );
};
