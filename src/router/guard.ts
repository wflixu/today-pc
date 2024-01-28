import { useAuthStore } from "@/stores/auth";
import type { Router } from "vue-router";
export const UnAuthRouteNames = ["Login", "Sign"];
export function useRouteGuardHook(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    console.log("333", from.name, to.name);
    if (
      // 检查用户是否已登录
      !authStore.token &&
      !UnAuthRouteNames.includes(to.name as unknown as string)
    ) {
      next({ name: "Login" });
    } else {
      next();
    }
  });
}
