<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { mapGetters, mapState } from 'vuex';

export default defineComponent({
  setup() {
    return {};
  },
  computed: {
    ...mapState(['title']),
  },
  mounted() {
    console.log(this.title);
    document.title = this.title;
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
}

.ant-layout {
  height: 100%;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}


</style>