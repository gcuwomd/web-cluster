import axios from "axios"; 
import { inputValue } from "../components/layout/Header.vue";

const axiosInstance = axios.create({
  baseURL: "http://43.139.117.216:8100",
    timeout:1000*60*60, // 超时
    headers: {
        "Content-Type": "application/json",
        "X-Auth-Token":""
    }
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      "Bearer " +
      "eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzEiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkxNjQzMzU2LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTE2ODY1NTYsImlhdCI6MTY5MTY0MzM1Nn0.eLNqltAAHD1n_2ue9yHUWAm-FnnYhxDvzoKPWMamulzU7NjgAkwRAgwiYMjI2n-4FQKkECvIJMSgqPPRcVktypZiq31wMcoTfb9wgB56JCIlEkT9Srkf5CbNoWqsn16jmPNx7NOJQjdonno8-m6DVowwDS480hTmag37k6E_HPgzBCMKYtji9sXzak1yI_VUSD5zUa2R2rChEA38hricghJwKLK_ccjD0ztGOzBQNLohN4xQsf5HjCpn0uYvDB2BklpKJbUJyxrYHLkYd9g4IFl9uVELQ6QapYxhw7lIM1qVI0_y-8d9RLfAkUP3LC8qXkS1G9yCLWHcjgakWIp4dQ"; // 设置您的授权令牌
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = async () => {
  try {
    interface UserInfo {
      college: string;
      volunteer: {};
      image: {};
      gender: string;
      major: string;
      id: string;
      introduction: string;
      username: string;
    }
    const res = await axiosInstance.get("/user/info/department", {
      params:{
        departmentId:inputValue.value,
      },
    });
    const list: UserInfo[] = res.data.data;
    console.log(list);
  } catch (error) {
    console.error("Error:", error);
  }
};

export function search() {
  return get();
}
