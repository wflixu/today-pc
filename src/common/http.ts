import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/auth";

export const apiHost = import.meta.env.VITE_API_HOST;

export const requestConfig: AxiosRequestConfig = {
  validateStatus: (status) => {
    return true;
  },
  baseURL: apiHost,
  timeout: 100000,
};

export interface IRes<T> {
  code: number;
  msg: string;
  data: T;
}

/*
  拦截器名称：全局设置请求的 token 内容
*/
const setToken = (options) => {
  const authStore = useAuthStore();

  if (!options.headers) {
    options.headers = {};
  }
  // 考虑部分接口不需要使用 token，如用户登录接口（因为还没登录，没有 token）
  if (!options.noSignature) {
    options.headers["Authorization"] = authStore.token ?? "";
  }

  return options;
};

const setResult = (result: AxiosResponse) => {
  console.log("[interceptor.response]setResult:", result);

  // example: 根据实际业务处理
  if (result && result.data) {
    result = result.data;
  }
  return result;
};
const fullFail = (error) => {
  // Do something with request error
  return Promise.reject(error);
};
const http = axios.create(requestConfig);
http.interceptors.request.use(setToken, fullFail);
http.interceptors.response.use(setResult, fullFail);

export default http;
