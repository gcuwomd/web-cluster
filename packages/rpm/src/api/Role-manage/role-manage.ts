import BaseAxios from '../index'
//添加角色 post
export const AddRole = (roleName: string, departmentId: string) => {
  return BaseAxios.post(
    '/auth/role',
    {
      roleName: roleName,
      departmentId: departmentId
    },
    {
      headers: {
        Authorization: ''
      }
    }
  )
}
//删除角色 del
export const DelRole = () => {
  return BaseAxios.delete('/auth/role', {
    headers: {
      Authorization: ''
    },
    params: {
      roleId: ''
    }
  })
}
