import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTE3NzY2LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1NjA5NjYsImlhdCI6MTY5MjUxNzc2Nn0.eByd6B_0cYiGYaZfWUHE9tlAmHTxipNAQTeFEHxCRtvtPrxvtvoXR9kYeoBk1Il9ss-wJ5huZYU2qtw3Bq7E_xnAaztPAbpbIlCWEkHTfC7teOXQ_lE7E0FFzOnnqZ9zrGVnytlsFOOQCGTUbLCxmgC13MDJLQ8UfKEt3jSg8wWLG-C2d8WRdj77_D-qOUZdCFbhF8TosAOssVDoHvSVFuMeG07F4H9iVXNBe8TkCjEyu021SrsyaGY9ot1gULz30ygqab05S6HKL1NAwQufJfGM8c112OOjotTgTtW9aPdxaQRnpNmd4rd0ICyhgnMp3UrejpzL3KT0L8uvAcyobg");
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