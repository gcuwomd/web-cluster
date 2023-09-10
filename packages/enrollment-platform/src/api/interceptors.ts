import { AxiosInstance } from "axios";
import { useStore } from "../store";
import { getAccessToken } from "./token";

export function setInterceptors(axios: AxiosInstance) {
    const store=useStore()
    // 添加请求拦截器
    axios.interceptors.request.use(
        function (config) {
            if(store.access_token)
            {
                // 在发送请求之前做些什么
                config.headers.Authorization= `Bearer ${store.access_token}`
                
                return config;
            }
            else{
                return Promise.reject("没有token");
            }
        },

        function (error) {
            // 对请求错误做些什么
    
            
            return Promise.reject(error);
        }
    );

    // 添加响应拦截器
    axios.interceptors.response.use(
        function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            // Token 过期
            return response;
        },
        function () {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            // const status = error.response.status;
            
            getAccessToken()
            
            // if (status == 500) {
                return Promise.reject(new Error("响应错误"));
            // }
        }
    );
}