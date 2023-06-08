import { Chart } from 'chart.js/auto';
import 'chartjs-plugin-roughness';
import visualize, { data } from 'ossl:collection';
import { useEffect, useRef } from 'react';
import * as colors from 'tailwindcss/colors.js';

const res = visualize(data, { colors });

function App () {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const chart = new Chart(canvas, {
        ...res,
      });

      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <div className="app">
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
