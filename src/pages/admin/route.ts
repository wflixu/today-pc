import LayoutAdmin from "@/layout/admin/LayoutAdmin.vue";
import type { RouteRecordRaw } from "vue-router";
import ImageManVue from "./ImageMan.vue";
import Dashboard from "./Dashboard.vue";
import FileUpload from "./FileUpload.vue";
import Play from "./Play.vue";
import About from "./About.vue";
import Chart from "./chart/Chart.vue";
import User from "./User.vue";
import AppManager from "./app/AppManager.vue";
import Expenditure from "./expenditure/Expenditure.vue";
export const adminRoute: RouteRecordRaw = {
  path: "/admin",
  component: LayoutAdmin,
  redirect: "/admin/dashboard",
  name: "Admin",
  children: [
    {
      path: "dashboard",
      component: Dashboard,
      name: "Dashboard",
      meta: {
        title: "首页",
      },
    },
    {
      path: "image",
      component: ImageManVue,
      meta: {
        title: "图片管理",
      },
    },
    {
      path: "file",
      component: FileUpload,
      meta: {
        title: "文件上传",
      },
    },
    {
      path: "appmanager",
      component: AppManager,
      meta: {
        title: "App 管理",
      },
    },
    {
      path: "play",
      component: Play,
      meta: {
        title: "play",
      },
    },
    {
      path: "about",
      component: About,
      meta: {
        title: "About",
      },
    },
    {
      path: "chart",
      component: Chart,
      meta: {
        title: "Chart",
      },
    },
    {
      path: "users",
      component: User,
      meta: {
        title: "Users",
      },
    },
    {
      path: "expenditure",
      component: Expenditure,
      meta: {
        title: "支出",
      },
    },
  ],
};

export default adminRoute;
