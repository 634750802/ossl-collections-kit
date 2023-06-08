import 'chartjs-plugin-roughness';
import "chartjs-adapter-luxon";

import * as colors from 'tailwindcss/colors.js';

import { Chart, defaults } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import visualize, { data } from 'ossl:collection';

defaults.font.family = 'CabinSketch'

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
