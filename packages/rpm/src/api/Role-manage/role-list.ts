//分页获取角色列表  get
import BaseAxios from '../index'
/* const token = '2f68dbbf-519d-4f01-9636-e2421b68f379' */ // 示例token
export const rolelist = () => {
  return BaseAxios.get('/auth/role/list', {
    headers: {
      /*   Authorization: `Bearer ${token}` */
      //示例 在 Bearer 之后拼接 Token
    },
    params: {
      departmentId: '572ef5fe3b31426e', //string类型
      pageSize: 10,
      page: 1
    }
  })
}
