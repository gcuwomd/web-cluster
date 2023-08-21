import { testAlova } from '..'
import { AlovaResponse } from '../../types/response-data-model'
import { Permissions } from '../../views/role/Role.vue'
//分配角色权限 post
export const AssignAut = (roleId: string, permissions: Permissions[]) => {
  return testAlova.Post<AlovaResponse<null>>(`/auth/role/permission&permission=${permissions}`, {
    roleId: roleId,
    permission: permissions,
    shareRequest: false
  })
}
//删除角色权限 put
export const DeleteAut = (roleId: string, route: string[] | null, api: string[] | null) => {
  return testAlova.Put<AlovaResponse<null>>(`/auth/role/permission?roleId`, {
    roleId: roleId,
    route: route,
    api: api,
    shareRequest: false
  })
}
;``
