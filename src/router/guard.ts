import { useAuthStore } from "@/store/auth";
import type { Router } from "vue-router";

export function useRouteGuardHook(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    console.log("333", from.name, to.name);
    if (
      // 检查用户是否已登录
      !authStore.token &&
      // ❗️ 避免无限重定向
      to.name !== "Login"
    ) {
      next({ name: 'Login' })
    } else {
      next();
    }
  });
}
