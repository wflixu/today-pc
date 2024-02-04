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
    cleanToken() {
      this.token = "";
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    },
    setToken(token: string) {
      let bearToken = "Bearer " + token;
      window.localStorage.setItem("token", bearToken);
      this.token = bearToken;
    },
  },
});
