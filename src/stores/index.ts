import { createPinia, defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();


pinia.use(piniaPluginPersistedstate);

const useMainStore = defineStore("main", {
  state: () => {
    return {
      title: "Today is the day!",
    };
  },
});

export { pinia, useMainStore };
