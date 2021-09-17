<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  methods: {},
});
</script>

<style scoped lang="less">
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