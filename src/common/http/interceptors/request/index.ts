// import setSecurityInformation from './setSecurityInformation';
// import setSignature from './setSignature';
import setToken from "./setToken";
// import setLoading from './setLoading';

/*
    执行顺序：右 -> 左
    开发拦截器的时候，根据业务需要做排序
*/
export default [
  // setSecurityInformation,
  // setSignature,
  setToken,
  // setLoading
];
