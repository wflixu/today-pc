import axios, { type AxiosRequestConfig } from "axios";
import { runInterceptors } from "./interceptors/index";

const apiHost = import.meta.env.VITE_API_HOST;

export const requestConfig: AxiosRequestConfig = {
  validateStatus: (status) => {
    console.log("validateStatus", status);
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


let http = axios.create(requestConfig);

http = runInterceptors(http) ?? http;

export default http;


/*
  封装axios，参考 https://mp.weixin.qq.com/s/QBno6MG1_w9aAAXljQVMyw，根据当前系统需求和接口修改
  代码：https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Summary/useful-request
*/
