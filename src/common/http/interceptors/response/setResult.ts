import type { AxiosResponse } from "axios";



/*
  拦截器名称：处理全局请求的返回结果
  拦截器说明：将原本返回的结果格式（如 data.data.data） 转换为返回 data 对象
*/
const setResult = (result: AxiosResponse) => {
  console.log("[interceptor.response]setResult:", result);
  
  // example: 根据实际业务处理
  if (result && result.data) {
    result = result.data ;
  }
  return result;
};

export default setResult;
