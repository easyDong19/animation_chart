import useBPMChart from '../../../hooks/useBPMChart';
import Plot from 'react-plotly.js';
const generateChartData = () => {
  const numPoints = 1000;
  const x = Array.from({ length: numPoints }, (_, i) => i * 2);
  const y = Array.from(
    { length: numPoints },
    () => Math.floor(Math.random() * 40) + 10
  );
  return { x, y };
};

const chartData = generateChartData();

export const TestBPMChart = () => {
  const initialState = {
    xRange: [0, 500],
    yRange: [0, 50],
    speed: 1,
  };
  const {
    layout,
    startAutoMove,
    stopAutoMove,
    resetChart,
    changeSpeed,
    handleRelayOut,
    BPMData,
  } = useBPMChart(initialState, chartData);

  return (
    <div className='flex flex-col'>
      <div>버튼 리스트</div>
      <div className='flex flex-row gap-4 my-4'>
        <button
          onClick={startAutoMove}
          className='px-4 py-2 font-semibold text-white transition duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600'
        >
          시작
        </button>
        <button
          onClick={stopAutoMove}
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
            x: BPMData.x_horizontal,
            y: BPMData.y_horizontal,
            mode: 'lines',
            line: { shape: 'linear', width: 5, color: 'blue' },
            type: 'scatter',
            hoverinfo: 'none',
          },
        ]}
        onRelayout={handleRelayOut}
        layout={layout}
        config={{ displayModeBar: false, scrollZoom: true, responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
