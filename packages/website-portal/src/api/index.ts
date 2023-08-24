import { createAlova } from 'alova'
import ReactHook from 'alova/react'
import GlobalFetch from 'alova/GlobalFetch'
/**
 * @description 创建一个 alova 实例
 */
export const authAlova = createAlova({
  // 响应式状态钩子，本项目用 React，因此选择 ReactHook
  statesHook: ReactHook,
  // 请求适配器，使用 Fetch API 作为请求适配器
  requestAdapter: GlobalFetch(),
  // 请求拦截器
  beforeRequest: (method) => {
    method.config.headers['Content-Type'] = 'application/json'
  },
  // 响应拦截器
  responded: (response) => response.json()
})
export const rbacAlova = createAlova({
  baseURL: 'http://43.139.117.216:8080',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) {
      method.config.headers = {
        "Authorization": sessionStorage.getItem('access_token'),
      }
  },
  responded: (response) => response.json()
})
