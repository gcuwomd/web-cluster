import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTA4ODk1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1NTIwOTUsImlhdCI6MTY5MjUwODg5NX0.RV_21t1z8F9H4Ab1jkSVfx35Jl1R34IygsaS7xjT6EoJEmnqYgdhjQt5ynk3eLwWm14DJZSg0RtltfxRfEGAxZQO33mA7WJ814CExz2RSRTZUL5qd7HuFcZGb4d9kUvzOyxvF3vfb-VBh1gf8RU4gFi0cAFeo8tznwTvcvzJ3QDPDdxVFSKOtYldOm_efT22EQOtUmafBVnyrJ-9WIoIbEckGptrEFvetV2m4fOslcibGpaKX0iPk5lruC9SEpeuVYWR-9eVS8tU8ZM-wnRaSuzX5JiOLgV0l-h0dhyHf8nk20mtdK9xjdQl0-DFFUTtGW2xkAeGTaFG5IQ4uOfWZQ");
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