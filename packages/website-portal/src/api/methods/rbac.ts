import { rbacAlova } from '..'
import { ResponseModel } from '../../types/RequestDataModel'
import { UserBasicInfo, WebsiteListItem } from '../../types/ResponseDataModel'

export const getAddressableWebsites = () => {
  return rbacAlova.Get('/auth/accessable/websitezhege')
}

export const getUserBasicInfo = () => {
  return rbacAlova.Get<ResponseModel<UserBasicInfo & { websiteList: WebsiteListItem[] }>>(
    '/auth/user/website'
  )
}
