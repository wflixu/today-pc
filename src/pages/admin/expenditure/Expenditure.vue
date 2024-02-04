<template>
    <div>
        <h1>expenditure</h1>
        <ExpenditureGasChart/>
        <ExpenditureWaterChart/>
        <ExpenditureAdd/>
    </div>
</template>

<script setup lang="ts">
import ExpenditureGasChart from './ExpenditureGasChart.vue'
import ExpenditureWaterChart from './ExpenditureWaterChart.vue';
import ExpenditureAdd from './ExpenditureAdd.vue'
</script>

<style scoped></style>