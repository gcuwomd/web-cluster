//分页获取角色列表  get
import { testAlova } from '..'
import {
  AccessibleWebsite,
  AlovaResponse,
  RoleInfo,
  RoleList,
  WebsiteOption
} from '../../types/response-data-model'
export const getRoleList = (departmentId: string, pageSize: number, page: number) => {
  return testAlova.Get<AlovaResponse<RoleList>>('/auth/role/list', {
    params: {
      departmentId,
      pageSize,
      page
    }
  })
}

//添加角色 post
export const addRole = (roleName: string, departmentId: string) => {
  return testAlova.Post<AlovaResponse<null>>(`/auth/role`, {
    roleName: roleName,
    departmentId: departmentId
  })
}
//删除角色 del
export const deleteRole = (roleId: string) => {
  return testAlova.Delete(`/auth/role?roleId=${roleId}`, {
    shareRequest: false
  })
}

export const getRole = (roleId: string) => {
  return testAlova.Get<RoleInfo>(`/auth/role/detail`, {
    params: { roleId },
    transformData(data, _headers) {
      return (data as AlovaResponse<RoleInfo>).data
    }
  })
}

export const getAllWebsite = () => {
  return testAlova.Get<WebsiteOption[]>(`/auth/role/website/list`, {
    transformData(data, _headers) {
      return (data as AlovaResponse<WebsiteOption[]>).data
    }
  })
}

export const getAccessibleWebsite = (roleId: string) => {
  return testAlova.Get<AccessibleWebsite[]>('/auth/role/websiteInfo', {
    params: {
      roleId
    },
    transformData(data, _headers) {
      return (data as AlovaResponse<AccessibleWebsite[]>).data
    }
  })
}
