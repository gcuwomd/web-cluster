import { authAlova } from '..'
import { AUTH_URL, REDIRECT_URL } from '../../const'
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
  const formData = new FormData()
  formData.append('grant_type', 'authorization_code')
  formData.append('redirect_uri', REDIRECT_URL)
  formData.append('code', code)
  return fetch(`${AUTH_URL}/oauth2/token`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ='
    },
    redirect: 'follow'
  }).then((response) => response.json())
}

export const refreshAccessToken = async (refreshToken: string) => {
  const formData = new FormData()
  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', refreshToken)
  const response = await fetch(`${AUTH_URL}/oauth2/token`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ='
    }
  })
  if (!response.ok) {
    throw new Error()
  }
  return await response.json()
    
  
}
