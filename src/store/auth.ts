import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const token = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("user");

    return {
      user: user ? JSON.parse(user) : null,
      token: token ?? "",
    };
  },
  actions: {
    setUser(user: any) {
      window.localStorage.setItem("user", JSON.stringify(user ?? ""));
      this.user = user;
    },
    setToken(token: string) {
      window.localStorage.setItem("token", JSON.stringify(token ?? ""));
      this.token = token;
    },
  },
});
