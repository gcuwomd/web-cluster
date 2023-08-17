//获取站点的所有权限列表 get
import BaseAxios from '../index'
export const website = () => {
  return BaseAxios.get('/auth/role/website/permissions', {
    headers: {
      Authorization: ''
    },
    params: {
      websiteId: ''
    }
  })
}
