import { authAlova } from '..'
import type { RegistrationModel, ResponseModel } from '../../types/RequestDataModel'
/**
 * @description 注册请求 API
 * @param registant 注册表单数据
 * @returns Alova Post Method Instance
 */
export const registraion = (registant: RegistrationModel) => {
  const { code, ...rest } = registant
  return authAlova.Post<ResponseModel<string>>('/user/register', rest, {
    params: { email: registant.email, code: code }
  })
}
export const getCaptcha = (email: string) => {
  return authAlova.Get<ResponseModel<null>>('/user/register/code', {
    params: { email: email },
    shareRequest: false
  })
}

export const getToken = (code: string) => {
  const formData = new FormData();
      formData.append("grant_type", "authorization_code")
      formData.append("redirect_uri", "http://127.0.0.1:5173")
      formData.append("code", code)
  return authAlova.Post<ResponseModel<any>>('/oauth2/token',formData,{
    headers: {
      "content-type": "multipart/form-data",
      "Authorization": "Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ="
    }
  })
}