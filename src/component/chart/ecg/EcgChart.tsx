import { useReducer } from 'react';
import Plot from 'react-plotly.js';
import { EcgChartAction, EcgChartType } from './EcgType';

const defaultChartState = {};

const reducer: React.Reducer<EcgChartType, EcgChartAction> = (
  state,
  action
) => {};
const EcgChart = () => {
  //   const [chartState, dispatch] = useReducer<EcgChartType>('');
  return <div>EcgChart</div>;
};

export default EcgChart;
