import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTE5MDAwLCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1NjIyMDAsImlhdCI6MTY5MjUxOTAwMH0.HpZ82vLXfwI9ozvu11mjtXouAWGR_KPeVSylDqoWEO2hnqp2n7UqrTdpn843Zh5cUTggv3v9y9kPxqoF2rBYlk8GtSA-R7VAhJ477y1o0amT0a9XLYYTQZjxip4azjLf-Ips5vIafbUyZPyh1qHTx3gdqk1xnuPUl1Jg01-_XaXE-DnxiHHFB1DfBX_ZyML6W3C2mKP-aU4Q-qO1PWuNNoqdXMuVK_IXbNI7IzQzT17k2HEjtX1QKKbAp2Gv9szNf_nNLNMbJH-r0-nZC33Ckf_tFn4QQ3YKzbEt75Q9QV0IjsbOo4GOdW1igN7Wuk5udVnu4yzLR5XjugMtnUjNjg");
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