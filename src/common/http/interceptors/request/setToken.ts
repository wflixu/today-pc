// @ts-nocheck

import { useAuthStore } from '@/stores/auth';
import { AxiosRequestConfig } from "axios";

// import store from "@/store/store";

/*
  拦截器名称：全局设置请求的 token 内容
*/
const setToken = (options: AxiosRequestConfig) => {
  console.log("[interceptor.request]setToken:", options);
   const authStore =  useAuthStore();

  if (!options.headers) {
    options.headers = {};
  }
  // // 考虑部分接口不需要使用 token，如用户登录接口（因为还没登录，没有 token）
  if (!options.noSignature) {    
    options.headers["Authorization"] =   authStore.token ?? "";
  }

  return options;
};

export default setToken;
