import LayoutAdmin from "@/layout/admin/LayoutAdmin.vue";
import type { RouteRecordRaw } from "vue-router";
import ImageManVue from "./ImageMan.vue";
import Dashboard from "./Dashboard.vue";
import FileUpload from "./FileUpload.vue";
import Play from "./Play.vue";
import About from './About.vue'
import Chart from "../chart/Chart.vue";
import User from './User.vue'

export const adminRoute: RouteRecordRaw = {
  path: "/admin",
  component: LayoutAdmin,
  redirect: "/admin/dashboard",
  children: [
    {
      path: "dashboard",
      component: Dashboard,
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
      path: "play",
      component: Play,
      meta: {
        title: "play",
      },
    },
    {
      path: "about",
      component: About,
      meta:{
          title: "About",
      }
    },
    {
      path: "chart",
      component: Chart,
      meta:{
          title: "Chart",
      }
    },
    {
      path: "users",
      component: User,
      meta:{
          title: "Users",
      }
    },
  ],
};

export default adminRoute;
