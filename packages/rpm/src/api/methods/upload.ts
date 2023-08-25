import {testAlova} from '..'

export const deleteUploadedImage = (url:string) => {
  return testAlova.Delete(`/auth/photo?key=${url}`)
}