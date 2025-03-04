import { useReducer, useRef, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Layout } from 'plotly.js';

const initialState = {
  xRange: [0, 10],
  yRange: [-40, 40],
  speed: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'MOVE':
      return {
        ...state,
        xRange: state.xRange.map((val: number) => val + 10 * state.speed),
      };
    case 'RESET':
      return initialState;
    case 'CHANGE_SPEED':
      return {
        ...state,
        speed: action.payload,
      };
    default:
      return state;
  }
}

const EcgChart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef<number | null>(null);

  const startAutoMove = () => {
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => {
      dispatch({ type: 'MOVE' });
    }, 25);
  };

  const stopAutoMove = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetChart = () => {
    dispatch({ type: 'RESET' });
  };

  const [layout, setLayout] = useState<Partial<Layout>>({
    autosize: true,

    dragmode: 'pan' as const,
  });

  useEffect(() => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      xaxis: { ...prevLayout.xaxis, range: state.xRange },
    }));
  }, [state.xRange]);

  useEffect(() => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      yaxis: { range: state.yRange },
    }));
  }, []);

  const handleRelayout = (newLayout: any) => {
    let newXRange = layout.xaxis?.range || [0, 10];
    const newYRange = layout.yaxis?.range || [0, 10];

    if (
      newLayout['xaxis.range[0]'] !== undefined &&
      newLayout['xaxis.range[1]'] !== undefined
    ) {
      newXRange = [
        Math.max(0, newLayout['xaxis.range[0]']),
        newLayout['xaxis.range[1]'],
      ];
    }

    setLayout({
      ...layout,
      xaxis: { ...layout.xaxis, range: newXRange },
      yaxis: { ...layout.yaxis, range: newYRange },
    });
  };

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
            y: [10, 20, 15, 25, 18, 30],
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={layout}
        onRelayout={handleRelayout}
        config={{ displayModeBar: false, scrollZoom: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EcgChart;
