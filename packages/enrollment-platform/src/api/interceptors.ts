import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiI4MmFmNGU0NS01YjJmLTQ1ODktOGZjYy1jMGZjODIzNTRmZDUiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNzUyMTc1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI3OTUzNzUsImlhdCI6MTY5Mjc1MjE3NX0.wODoSxunjQYaC1ue7nEyQ5XbXBWniUViVGPCJ8Z2Ne2UBwQ4ua4XaxD_lZamYEImVZeZnPOZ3u1VkBCrhrupxLGA2e2gBzl2CgADV0k4NQFBg1e4Tfo9ywT5n0TQTu1uEgjqa4iq2pxsKAYkq2b8F2RfqrS3PTrWt7WDHUGMx1VGy8FbW9uWb2XXD6coZbz_ssoNnFUTX_jI9io4YsJpVig_0MK3Pr2uvKK7PPzLqblWfIfqXMRwj30ri7LTIekGgfnE0tzz0e4UgCnPqHth5Vk_VqAU8U7pyWeA4dJV-6SHX4RZ6ZLn2JS9omtAyNNU614kRaFQgljEwV5O2bi2zw");
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