import { BASEgjy, IDgjy, KEYgjy } from "@/config";
import axios from "axios";
import store2 from "store2";

const instanceGJY=axios.create({
    baseURL:`${BASEgjy}/1.1/`,
    headers:{
        "X-LC-Id": IDgjy,
        "X-LC-Key": KEYgjy,
        "Content-Type": "application/json "
    }
})
// 添加请求拦截器
instanceGJY.interceptors.request.use(function (config) {
    console.log("config",config);
    
    // 在发送请求之前做些什么
    if(config.url?.indexOf("users")!=-1 && config.method=="put"){
        let info=store2.get("gjy-userinfo-store2");
        config.headers["X-LC-Session"]=info.sessionToken
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instanceGJY.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default instanceGJY;