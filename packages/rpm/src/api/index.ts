// 配置Axios
import { setInterceptors } from './interceptors'
import axios from 'axios'
const config = {
  baseURL: ' http://33n5i2.natappfree.cc',
  timeout: 1000 * 60 * 60,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'token'
  }
}
const BaseAxios = axios.create(config)
setInterceptors(BaseAxios)
export default BaseAxios
