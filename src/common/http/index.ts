import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { runInterceptors } from "./interceptors/index";

export const requestConfig: AxiosRequestConfig = {
  // baseURL: 'http://172.16.0.51',// 临时服务
  validateStatus: (status) => {
    console.log('validateStatus', status);
    return true;
  },
  // baseURL: "http://172.16.1.195:9000/",
  baseURL: "",
  timeout: 100000,
};
export const apiBase = 'http://127.0.0.1:7001/api';

let http = axios.create(requestConfig);

http = runInterceptors(http) ?? http;

export default http;

export interface IRes  {
  code:number,
  msg:string
  data:any,
}

/*
  封装axios，参考 https://mp.weixin.qq.com/s/QBno6MG1_w9aAAXljQVMyw，根据当前系统需求和接口修改
  代码：https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Summary/useful-request
*/
