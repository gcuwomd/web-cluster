import { testAlova } from '..'
import { AlovaResponse } from '../../types/response-data-model'
//添加角色 post
export const AddRole = (roleName: string, departmentId: string) => {
  return testAlova.Post<AlovaResponse<null>>(`/auth/role`, {
    roleName: roleName,
    departmentId: departmentId,
    shareRequest: false
  })
}
//删除角色 del
export const DelRole = (roleId: string) => {
  return testAlova.Delete(`/auth/role?roleId=${roleId}`, {
    shareRequest: false
  })
}
