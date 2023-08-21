//获取站点的所有权限列表 get
import { testAlova } from '..'
import { AlovaResponse, RoleGetPermissionList } from '../../types/response-data-model'
export const getWebsiteList = (websiteId: string, pageSize: number, page: number) => {
  return testAlova.Get<AlovaResponse<RoleGetPermissionList>>(
    `/auth/website/permission?websiteId=${websiteId}&pageSize=${pageSize}&page=${page}`,
    {
      shareRequest: false
    }
  )
}
