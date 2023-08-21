import { testAlova } from '..'
import { NewWebsiteForm } from '../../types/request-model'
import {
  AlovaResponse,
  PermissionList,
  WebsiteBaseInfo,
  WebsiteDetailInfo
} from '../../types/response-data-model'

export const addWebsite = (newWebsiteForm: NewWebsiteForm) => {
  const { belongs, ...rest } = newWebsiteForm
  return testAlova.Post<AlovaResponse<null>>('/auth/website', {
    departmentId: belongs.pop(),
    ...rest
  })
}

export const getWebsiteList = (id: string) => {
  return testAlova.Get<AlovaResponse<WebsiteBaseInfo[]>>(`/auth/website/list?id=${id}`, {
    shareRequest: false
  })
}

export const getWebsiteDetailInfo = (id: string) => {
  return testAlova.Get<AlovaResponse<WebsiteDetailInfo>>(`/auth/website/detail?websiteId=${id}`, {
    shareRequest: false
  })
}

export const getPermissionsList = (type: string, page: number, pageSize: number) => {
  return testAlova.Get<AlovaResponse<PermissionList>>(
    `/auth/website/permission?type=${type}&page=${page}&pageSize=${pageSize}`,
    {
      shareRequest: false
    }
  )
}
