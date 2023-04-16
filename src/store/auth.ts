import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      username: "",
      token: "",
    };
  },
  actions: {
    setUsername(name: string) {
      this.username = name;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});
