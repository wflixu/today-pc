<template>
  <div>
    <h2>tsx in vue3</h2>
    <Foo name="bar" />
    <h3>{{ title }}</h3>
    <h2>counter</h2>
    <div>
      {{ count }} <button @click="increment">increment</button> double:{{
        double
      }}
    </div>
  </div>
</template>

<script lang="ts">
import Foo from "../../components/foo";
import { computed, defineComponent, ref } from "vue";
import { useMainStore } from "../../stores";

export default defineComponent({
  name: "page-play",
  components: {
    Foo,
  },
  computed: {},
  setup() {
    let store = useMainStore();
    console.log(store.title);
    let title = ref(store.title);
    let count = ref(0);

    let double = computed(() => {
      return count.value * 2;
    });
    function increment() {
      count.value++;
    }
    return {
      title,
      count,
      double,
      increment,
    };
  },
});
</script>

<style scoped></style>
