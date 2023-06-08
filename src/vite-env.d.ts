/// <reference types="vite/client" />

declare module 'ossl:collection' {
  import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
  type Theme = {
    colors: import('tailwindcss/colors')
  }

  type VisualizeResult<Type extends ChartType = ChartType> = {
    type: Type
    config: ChartConfiguration<Type>
    data: ChartData<Type>
  }

  type Collection = {
    data: any[]
    visualization: (data: any[], theme: Theme) => VisualizeResult
  }

  const collection: Collection;

  export const config: any;
  export const data: any[];
  const visualization: (data: any[], theme: Theme) => VisualizeResult;
  export default visualization;
}
