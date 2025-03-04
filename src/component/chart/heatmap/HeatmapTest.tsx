import Plot from 'react-plotly.js';

export const HeatmapTest = () => {
  const size = 30;

  const x = Array.from({ length: size }, (_, i) => i);
  const y = Array.from({ length: size }, (_, i) => i);

  const z = Array.from({ length: size }, () =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.floor(Math.random() * 100))
    )
  );

  return (
    <div className='flex w-full h-full'>
      <Plot
        data={[
          {
            x: x,
            y: y,
            z: z[0],
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
          width: 500,
          height: 500,
          margin: { l: 50, r: 50, t: 50, b: 50 },
          xaxis: { visible: false },
          yaxis: { visible: false },
        }}
      />
    </div>
  );
};
