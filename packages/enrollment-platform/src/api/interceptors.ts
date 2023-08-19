import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNDI5MTE2LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI0NzIzMTYsImlhdCI6MTY5MjQyOTExNn0.gTMeVINlzsEl0wIiTxjtCKnr5HQTKXTHTnjUX7YE6s47BcenGhQtlKLtcRdeAF-tHEAPU5waLgzyfnILN534-DODKft-EHHD6rbrWj3RF47LI_7SYh3jgPgfpOFl-KCbRbzPltUpyJ0HhNL_NCfSw5PiQ-C5COYolfdDhVRl5N7pO3EGMzL77qXf5yj4qwWyBSq20UPvUQhf9HVUK5N5ggsLtc9T5Gyvst0BX3DKWhIvBC9mjsuICgpgNIOaHJsd1LV6xh7Dxlykna3ww310vYFpePoGSawOmmtXM0RIHOwNMErqcb8FarzMYNPJSUgIkMp-GQgT-hh-asmJF4e7OA");
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