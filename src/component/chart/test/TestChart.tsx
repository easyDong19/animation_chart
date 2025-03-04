import useChart from '../../../hooks/useChart';
import Plot from 'react-plotly.js';

export const TestChart = () => {
  const initialState = {
    xRange: [0, 10],
    yRange: [-40, 40],
    speed: 1,
  };

  const { layout, startAutoMove, stopAutoMove, resetChart, changeSpeed } =
    useChart(initialState);

  return (
    <div>
      <div>버튼</div>
      <div className='flex'>
        <button onClick={startAutoMove}>시작</button>
        <button onClick={stopAutoMove}>중지</button>
        <button onClick={resetChart}>리셋</button>
      </div>
      <Plot
        data={[
          {
            x: [0, 2, 4, 6, 8, 10],
            y: [50, 30, 25, 15, 38, 20],
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={layout}
        config={{ displayModeBar: false, scrollZoom: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
