<template>
  <div>
    <div>运动: {{ train.name }}</div>
    <div>时间：{{ time }}</div>
    <div>
      <a-button @click="onStart">开始</a-button>
      <a-button @click="onEnd">结束</a-button>
      <a-button @click="onSave">保存</a-button>
      <a-button @click="onList">列表</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

import http from './../../common/http/index';

export default defineComponent({
  setup() {
    const train = reactive({
      name: '平板支撑',
      countType: 'time',
      start: Date.now(),
      end: Date.now(),
    });

    let time = computed(() => {
      return (train.end - train.start) / 1000;
    });
    let timer = 0;
    const onStart = () => {
      console.log('onstart');
      train.start = Date.now();
      timer = setInterval(() => {
        train.end = Date.now();
      });
    };

    const onEnd = () => {
      clearInterval(timer);
    };

    const onSave = () => {
      let data = {
        name: train.name,
        start: new Date(train.start),
        end: new Date(train.end),
        countType: 'count',
      };
      http.post('/api/train', data).then((res) => {
        console.log(res);
      });
    };

    const onList = () => {
      http.get('/api/train').then((res) => {
        console.log(res);
      });
    };

    return {
      train,
      time,
      onList,
      onStart,

      onEnd,
      onSave,
    };
  },
});
</script>

<style scoped>
</style>