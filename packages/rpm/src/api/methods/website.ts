import { testAlova } from '..'
import { ChangeWebsiteInfForm, NewWebsiteForm, RouteForm } from '../../types/request-model'
import {
  AlovaResponse,
  WebsiteBaseInfo,
  WebsiteDetailInfo,
  WebsitePermissions
} from '../../types/response-data-model'

export const addWebsite = (newWebsiteForm: NewWebsiteForm) => {
  const { belongs, ...rest } = newWebsiteForm
  return testAlova.Post<AlovaResponse<null>>('/auth/website', {
    departmentId: belongs.pop(),
    ...rest
  })
}

export const changeWebsiteInfo = (form: ChangeWebsiteInfForm) => {
  const { belongs, ...rest } = form
  return testAlova.Put<AlovaResponse<null>>('/auth/website', {
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

export const getPermissions = (type: string, page: number, pageSize: number, websiteId: string) => {
  return testAlova.Get<AlovaResponse<WebsitePermissions>>(
    `/auth/website/permission?type=${type}&page=${page}&pageSize=${pageSize}&websiteId=${websiteId}`,
    {
      shareRequest: false
    }
  )
}

export const addRoute = (form: RouteForm) => {
  const { routeId: _routeId, ...rest } = form
  return testAlova.Post<AlovaResponse<null>>('/auth/website/permission/route', [{ ...rest }])
}
