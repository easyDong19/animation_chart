import Plot from 'react-plotly.js';

export const HeatMapChart = ({ field }: { field: any }) => {
  return (
    <div className='w-full h-full aspect-[1/1]'>
      <Plot
        ref={field.plotRef}
        data={field.data}
        layout={field.layoutConfig}
        config={field.defaultConfig}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
