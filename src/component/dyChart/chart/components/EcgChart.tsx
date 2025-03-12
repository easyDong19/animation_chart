import Plot from 'react-plotly.js';

export const EcgChart = ({ field }: { field: any }) => {
  return (
    <div className='w-full h-full'>
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
