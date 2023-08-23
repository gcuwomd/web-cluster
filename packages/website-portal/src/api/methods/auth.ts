import { authAlova } from '..'
import type { RegistrationModel, ResponseModel } from '../../types/RequestDataModel'
/**
 * @description 注册请求 API
 * @param registant 注册表单数据
 * @returns Alova Post Method Instance
 */
export const registraion = (registant: RegistrationModel) => {
  const { code, ...rest } = registant
  return authAlova.Post<ResponseModel<string>>('/oauth/user/register', rest, {
    params: { email: registant.email, code: code }
  })
}
export const getCaptcha = (email: string) => {
  return authAlova.Get<ResponseModel<null>>('/oauth/user/register/code', {
    params: { email: email },
    shareRequest: false
  })
}
