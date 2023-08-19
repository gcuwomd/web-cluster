import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNDU3NzU1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1MDA5NTUsImlhdCI6MTY5MjQ1Nzc1NX0.mCbIWU1-UcmoLYtTJN1jmRVDo7BPlIbTJe0pXNE0UYUsGjvSjONy63Uo6hJ9Hd52pRn7V-c_bWULzq-TcggVDEeQ2eJCDkmKkYBQDYGfRc0t9PchGdZWaea1fUjLbScNkiDjQiGTzvnpYuhKXT2Or6HThp-dz3BMAmJ0dmBARfMRXmTGF-S6vvAnwzc3kWfBYzmE5WEITAoLdDP1s-gMDgBaY2Wz4_XPRIgB63p9ngggAXudkNmLxd9F-4ovfqpTirARQqXgTX7l8Bf4HY_YVVGlKRpJ9_m3tcmE8-3YvdzB3NLZbUNNlfbQS4FPxlS4KBSaKe1ScTT_eB5vJ5AE0A");
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