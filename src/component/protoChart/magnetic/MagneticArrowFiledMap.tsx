import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

export const MagneticArrowFieldMap = () => {
  // State for dynamic vector components
  const [time, setTime] = useState(0);

  // Increment time every 100ms

  // Generate grid
  const x = Array.from({ length: 20 }, (_, i) => -1 + (2 / 19) * i);
  const y = Array.from({ length: 20 }, (_, i) => -1 + (2 / 19) * i);
  const X = [];
  const Y = [];
  x.forEach((xi) =>
    y.forEach((yi) => {
      X.push(xi);
      Y.push(yi);
    })
  );

  // Define vector field components with time dependency
  const Vx = (x, y, t) => Math.sin(Math.PI * x + t);
  const Vy = (x, y, t) => Math.cos(Math.PI * y + t);
  const U = X.map((xi, i) => Vx(xi, Y[i], time));
  const V = X.map((xi, i) => Vy(xi, Y[i], time));

  // Calculate vector magnitudes for coloring
  const magnitudes = U.map((u, i) => Math.sqrt(u ** 2 + V[i] ** 2));

  // Generate traces for vector field
  const arrowLines = [];
  const arrowHeads = [];
  X.forEach((xi, i) => {
    const yi = Y[i];
    const xEnd = xi + U[i] * 0.1; // Scale vectors
    const yEnd = yi + V[i] * 0.1;

    // Main arrow line
    arrowLines.push({
      type: 'scatter',
      mode: 'lines',
      x: [xi, xEnd],
      y: [yi, yEnd],
      line: {
        color: `rgba(0, ${Math.min(255, magnitudes[i] * 255)}, 255, 1)`,
        width: 2,
      },
      hoverinfo: 'skip',
    });

    // Arrowhead: Small triangle at the end of the arrow
    const arrowSize = 0.02;
    const angle = Math.atan2(V[i], U[i]); // Angle of the vector
    const arrowX1 = xEnd - arrowSize * Math.cos(angle - Math.PI / 6);
    const arrowY1 = yEnd - arrowSize * Math.sin(angle - Math.PI / 6);
    const arrowX2 = xEnd - arrowSize * Math.cos(angle + Math.PI / 6);
    const arrowY2 = yEnd - arrowSize * Math.sin(angle + Math.PI / 6);

    arrowHeads.push({
      type: 'scatter',
      mode: 'lines',
      x: [arrowX1, xEnd, arrowX2],
      y: [arrowY1, yEnd, arrowY2],
      fill: 'toself',
      fillcolor: `rgba(0, ${Math.min(255, magnitudes[i] * 255)}, 255, 1)`,
      line: { width: 0 },
      hoverinfo: 'skip',
    });
  });

  // Combine traces
  const traces = [...arrowLines, ...arrowHeads];

  // Layout for the plot
  const layout = {
    xaxis: { range: [-1.2, 1.2] },
    yaxis: { range: [-1.2, 1.2] },
    showlegend: false,
    margin: { t: 50, l: 50, r: 50, b: 50 },
    width: 1000,
    height: 600,
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
        doubleClick: false,
        staticPlot: true,
      }}
    />
  );
};
