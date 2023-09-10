//分页获取角色列表  get
import { testAlova } from '..'
import {
  AccessibleWebsite,
  AlovaResponse,
  RoleInfo,
  RoleList,
  WebsiteOption,
  getRolePermission
} from '../../types/response-data-model'
import { permissions } from '../../types/request-model'
//分页获取角色列表
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
//角色信息
export const getRole = (roleId: string) => {
  return testAlova.Get<RoleInfo>(`/auth/role/detail`, {
    params: { roleId },
    transformData(data, _headers) {
      return (data as AlovaResponse<RoleInfo>).data
    }
  })
}
//全站点列表
export const getAllWebsite = () => {
  return testAlova.Get<WebsiteOption[]>(`/auth/role/website/list`, {
    transformData(data, _headers) {
      return (data as AlovaResponse<WebsiteOption[]>).data
    }
  })
}
//获取角色的可访问站点信息
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
//分配角色权限
export const AddrolePermission = (id: string, permission: permissions[]) => {
  return testAlova.Post<AlovaResponse<null>>('/auth/role/permission', {
    roleId: id,
    permissions: permission
  })
}
//删除角色权限
export const DelrolePermission = (id: string, route: string[] | null, api: string[] | null) => {
  return testAlova.Put<AlovaResponse<null>>('/auth/role/permission', {
    roldId: id,
    route: route,
    api: api
  })
}
//获取对应角色权限信息
export const GetRolePermission = (roleId: string) => {
  return testAlova.Get<AlovaResponse<getRolePermission>>('/auth/role/permission', {
    params: {
      roleId
    }
  })
}
//添加角色可访问吧站点
export const AddroleWebsite = (list: string[], roleId: string) => {
  return testAlova.Post<AlovaResponse<null>>('/auth/role/website', { list: list, roleId: roleId })
}
//删除角色可访问站点
export const DelroleWebsite = (list: string[], roleId: string) => {
  return testAlova.Delete<AlovaResponse<null>>(`/auth/role/website?list=${list}&roleId=${roleId}`)
}
