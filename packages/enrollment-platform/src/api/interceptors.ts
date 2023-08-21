import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTM5MTc0LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1ODIzNzQsImlhdCI6MTY5MjUzOTE3NH0.Kh9X_TDx6MlbEFOMiP2XK8SmFd_AzI4xhnKlx9KfJAiJuUoeNsXJ5dIYAl4kld10ORGLkBkaVMWaiSoRZJFtVMD0hz8pD8ERxLKc2rGI5bNZJWc6eZnXqEiV-sfDNoivni0Z28R2Rt19c2UPwvsBepiZIUyi6H6CSXffu9A_NR-K80Y0xRSPMb5vnar-R1dX8NAJi-pJ1fR8kENKMp4xmHNsxyaSn4_skbrmLsY7pmAX0WOKjcat2WLlUY9gUjPAK0Oec9s25L1Dsj3mno1Tz5pNQ9E62k947jlz8nzU251NNPUJzaqCAUYq3PSDTybV_chYc-YyUHhfKSDCWnOfPg");
export function setInterceptors(axios: AxiosInstance) {
    // 添加请求拦截器
    axios.interceptors.request.use(
        function (config) {
            // 在发送请求之前做些什么
            config.headers.Authorization= `Bearer ${token.value}`
            
            return config;
        },

        function (error) {
            // 对请求错误做些什么
            console.log(error);
            
            return Promise.reject(error);
        }
    );

    // 添加响应拦截器
    axios.interceptors.response.use(
        function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            // Token 过期
            if (response.data.code === 401) {
                router.push({ name: "Login" });
            }
            
            return response;
        },
        function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            // const status = error.response.status;
            console.log(error);
            
            // if (status == 500) {
                return Promise.reject(new Error("响应错误"));
            // }
        }
    );
}