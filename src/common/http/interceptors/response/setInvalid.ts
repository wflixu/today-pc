/*
  拦截器名称：处理全局请求的登录状态失效场景
*/
const setInvalid = (result) => {
  // log('[interceptor.response]setInvalid:', result);
  debugger;
  if (result.status == 401 || result.status == 404) {
    window.location = "/#/login";
    sessionStorage.removeItem("token");
  }

  if (result.data?.code == "401") {
    window.location = "/#/login";
    sessionStorage.removeItem("token");
  } else {
    return result;
  }
  // return result;
};

export default setInvalid;
