<template>
  <div class="bg-blend-hard-light">
    <h2 class="text-4xl ">bar</h2>
    <div  >
      <v-chart
        
        class="h-96"
        :option="barOption"
        ref="bar"
        autoresize
        @zr:click="handleZrClick"
        @click="handleClick"
      />
    </div>
    <hr>
    <h2 class="text-4xl">pie</h2>
    <div class="min-h-full">
      <v-chart 
      class="h-96"
      :option="pieOption"
      ref="pie"
      autoresize
      />
    </div>
    <hr>
    <h2 class="text-4xl">polar</h2>
    <div class="min-h-full">
      <v-chart 
      class="h-96"
      :option="polarOption"
      ref="polar"
      autoresize
      />
    </div>
    <hr>
    <h2 class="text-4xl">scatter</h2>
    <div class="min-h-full">
      <v-chart :option="scatterOption"  autoresize />
    </div>
  </div>
</template>

<script lang="ts">
import VChart from "vue-echarts";
import { defineComponent, ref } from "vue";

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
} from "echarts/charts";
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
} from "echarts/components";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

import  { use, registerMap, registerTheme } from 'echarts/core';

use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer,
]);

import getBar from "./data/bar";
import pieOption from "./data/pie";
import polarOption from './data/polar';
import scatterOption from './data/scatter';
import theme from "./data/theme.json";
// Map of China
import chinaMap from "./data/china.json";
import worldMap from "./data/world.json";



export default defineComponent({
  components: {
    VChart,
  },
  data() {
    return {
      barOption: getBar(),
      pieOption,
      polarOption,
      scatterOption
    };
  },
  setup() {
    // let barOption = ref(getBar());
    return {
      // barOption,
    };
  },
  methods: {
    handleClick(...args: any[]) {
      console.log("click from echarts", ...args);
    },
    handleZrClick(...args: any[]) {
      console.log("click from zrender", ...args);
    },
  },
});
</script>

<style scoped></style>
