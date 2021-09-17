<template>
  <div>
    <h1>运动类型：</h1>
    <div class="exercise">
      <div class="card" v-for="item in exercises" :key="item.id">
        <div>运动类型：{{ item.name }}</div>
      </div>
    </div>
    <h1>运动记录：</h1>
    <div class="list">
      <ul class="cells">
        <li class="cell" v-for="item in records" :key="item._id" @click="onClick">
          <div>运动：{{ item.name }}</div>
          <div>时间：{{ countTime(item) }}</div>
          <template v-if="item.countType == 'count'">
            <div>次数：{{ item.count }}</div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import http, { IRes } from '../../common/http/index';

export default defineComponent({
  setup() {
    let records = ref<Array<any>>([]);

    let exercises = ref([
      {
        name: '平板支撑',
        id: 1,
      },
      {
        name: '俯卧撑',
        id: 1,
      },
    ]);

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
        let { code, msg, data } = res as unknown as IRes;
        if (code) {
          console.log(msg);
        } else {
          console.log(data.list);
          records.value = data.list;
        }
      });
    };

    const getExerciseList = () => {
      http.get('/api/train').then((res) => {
        let { code, msg, data } = res as unknown as IRes;
      });
    };

    onMounted(() => {
      onList();
      getExerciseList();
    });

    const Router = useRouter();

    const onClick = () => {
      Router.push('/robust/train');
    };

    let countTime = (item: { start: string; end: string }) => {
      let { start, end } = item;
      let num = moment(end).diff(start, 'minutes');
      return num;
    };

    return {
      exercises,

      train,
      time,
      onList,
      records,

      onStart,

      onEnd,
      onSave,

      countTime,
      onClick,
    };
  },
  methods: {},
});
</script>

<style scoped lang="less">
.exercise {
  display: flex;
  .card {
    border: 1px solid grey;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
  }
}
.cells {
  display: flex;

  .cell {
    border: 1px solid grey;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
  }
}
</style>