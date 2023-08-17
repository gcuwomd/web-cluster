import BaseAxios from '../index'
//分配角色权限 post
export const AssignRole = (roleId: string, permissions: string[]) => {
  return BaseAxios.post(
    '/auth/role/permission',
    {
      roleId: roleId,
      permissions: permissions
    },
    {
      headers: {
        Authorization: ''
      }
    }
  )
}
//删除角色权限 put
export const ModifyRole = (roleId: string, route: string[] | null, api: string[] | null) => {
  return BaseAxios.put(
    '/auth/role/permission',
    {
      roleId: roleId,
      route: route,
      api: api
    },
    {
      headers: {
        Authorization: ''
      }
    }
  )
}
