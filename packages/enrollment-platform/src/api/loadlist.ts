import BaseAxios from './index'
export const Loadlist = () => {
  return BaseAxios.get('/download/excel', {
    responseType: 'blob'
  })
}
//下载表格
