import { AxiosInstance } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const token=ref("eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzEiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkxODIxMjY5LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTE4NjQ0NjksImlhdCI6MTY5MTgyMTI2OX0.ST8cpjZNqWSq-VDAEPtktqRNZFqUs3bsSVQkVxMwU4yorasqd_LkXgX-fkJfuuIu1cEON-jLfBO0Cg270-805bcyLNsih8V2bHseRNTjCVCDIamQ1j8qgfKtJpGtg1cCwfrKMzN3veoHHohuMtqrs3aXFLIMFL0EOr3CLjr4ahZxx6xeyDCeUZLCxXEOTK5a6dLBOLgRn7NfMe-uf2kT3gwb6Pk-8R1ffEs64tRBdHI3NBsH6C6zT7G0ySJwrW3QNpkWb9yZtD4jxkdnZXPL3zSehrDPJ2AXeGyf51uDpzgh7h_uiCyHBJlZeZsOm5zd7HwqRF4_y_yk4E9xKgKY9g");
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