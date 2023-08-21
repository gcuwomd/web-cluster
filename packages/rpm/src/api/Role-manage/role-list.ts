//分页获取角色列表  get
import { testAlova } from '..'
import { AlovaResponse, GetRoleList } from '../../types/response-data-model'
export const rolelist = (departmentId: string, pageSize: number, page: number) => {
  return testAlova.Get<AlovaResponse<GetRoleList>>('/auth/role/list', {
    params: {
      departmentId: departmentId,
      pageSize: pageSize,
      page: page
    },
    shareRequest: false
  })
}
