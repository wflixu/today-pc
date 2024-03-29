import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from "vue-router";

import Home from "../pages/Home.vue";

import Test from "../pages/Test.vue";

import Exception from "@/pages/error/Exception.vue";
import LayoutAdmin from "@/layout/admin/LayoutAdmin.vue";
import { useRouteGuardHook } from "./guard";

// 自动导入modules文件夹下所有ts文件
// @ts-ignore
const modules = import.meta.glob("./../pages/**/route.ts", { eager: true });

// 路由暂存
const routeModuleList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key: string) => {
  // @ts-ignore
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList];

// 存放固定的路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/exception",
    component: LayoutAdmin,
    children: [
      {
        path: ":pathMatch(.*)*",
        name: "Exception",
        component: Exception,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/exception/404",
  },
];

export const allRoutes = [...asyncRouterList, ...defaultRouterList];

// keep it simple for now.
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: allRoutes, // short for `routes: routes`
  strict: true,
  sensitive: true,
});

useRouteGuardHook(router);
