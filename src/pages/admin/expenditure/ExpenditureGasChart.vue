<template>
    <div>
        <v-chart class="chart" :option="chartOptions" :init-options="chartOptions" />
    </div>
</template>

<script setup lang="ts">

import http from "./../../../common/http"
import { useCharts } from './../../../common/charts'
import VChart from "vue-echarts";
import { ref, provide, computed, onMounted, reactive } from "vue";

const aDay = 1000 * 60 * 60 * 24;


useCharts();

const chartOptions = reactive({
    tooltip: {
        trigger: 'axis',
        valueFormatter: function (value) {
            return typeof value == 'number' ? value.toFixed(2) : value;
        }
    },
    dataset: {
        dimensions: ['created', 'count', 'kind', 'trend'],
        source: []
    },
    title: {
        left: 'center',
        text: '天然气用量'
    },

    xAxis: {
        type: 'time',
        axisLabel: {
            formatter: "{yy}-{MM}-{dd} {HH}:{mm}",
        },

        // boundaryGap: false
    },
    yAxis: [
        {
            type: 'value',
            axisLine: {
                show:true,
            },
            name: "数量",
            splitLine: {
                show: true,
            },
            boundaryGap: [0, '100%']
        },
        {
            type: 'value',
            name: '趋势',
            axisLine: {
                show:true,
            },
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false,
                lineStyle: {
                    color: ["#4E88E6"]
                }
            },

        }
    ],
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            start: 0,
            end: 100
        }
    ],
    series: [
        {
            name: '天然气用量',
            type: 'line',
            symbol: 'pin',
            symbolSize: 20,
            yAxisIndex: 0,
            label: {
                show: true,
            },
            encode: {
                x: 'created',
                y: 'count'
            }
        },
        {
            name: '用气趋势',
            type: 'line',
            symbol: 'pin',
            symbolSize: 20,
            yAxisIndex: 1,
            label: {
                show: true,
                formatter: function ({ value }) {
                    return value.trend.toFixed(2)
                }
            },
            encode: {
                x: 'created',
                y: 'trend'
            }
        }
    ]

});

onMounted(() => {
    http.get('/expend/gas').then((res: any) => {
        if (res.code == 200) {

            chartOptions.dataset.source = res.data.map((item, index, arr) => {
                let trend = 0;
                if (index !== 0) {
                    let diff = item.count - arr[index - 1].count;
                    let span = (new Date(item.created).getTime() - new Date(arr[index - 1].created).getTime()) / aDay
                    trend = diff / span;
                }

                return {
                    ...item,
                    trend
                }
            }) as any[]
        }
    })
})

</script>

<style scoped>
.chart {
    height: 400px;
}
</style>