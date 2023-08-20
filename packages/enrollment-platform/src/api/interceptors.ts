import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTA2MTI1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1NDkzMjUsImlhdCI6MTY5MjUwNjEyNX0.O_-P-OpcVxqgg4sL2Z3pcOWKg9zyHymXKdP-hoIgKBX9Q0tfePRc7-z2DVU_vDzXuiyYTgO-V0j7YQ4sxhjczpfps07BFogOXJm2Ak6PF3z5MfXbFvXNLwNXcjj3CDF2-L1eh2Z6lvvW_1EOckMiCb_3KhoSq37BmGxB5Zd85tJsrVNnahCmXkNNVdoSmGlkFKdFUiLyJYTS3GKzWU4DyL-DplgedfxvceUxerZl-evl0FbwwcnVN_IBn0nxtlx84N0XlV5jAgLyahYF2_KLxw_3ozVCng90ETvjSOQhFD3D6PGdwSZI3-zvzPTJelCAk-yQtVxt88V04hK_qezd0w");
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