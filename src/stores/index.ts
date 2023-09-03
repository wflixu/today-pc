import { createPinia, defineStore } from "pinia";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);

const useMainStore = defineStore("main", {
  state: () => {
    return {
      title: "Today is the day!",
    };
  },
});

export { pinia, useMainStore };
