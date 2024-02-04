import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LinesChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  DatasetComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import { provide } from "vue";

export const useCharts = function () {
  use([
    CanvasRenderer,
    DatasetComponent,
    PieChart,
    LinesChart,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
  ]);

  //   provide(THEME_KEY, "");
};
