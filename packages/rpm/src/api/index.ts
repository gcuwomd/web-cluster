import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  "eyJraWQiOiIyNTQzMzVhZC1hM2Q5LTQ2ZGQtYTBkOC1mODY1OGQyNmQyNjQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkzNTcwNDA1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTM2MTM2MDUsImlhdCI6MTY5MzU3MDQwNX0.YkCUXk4BEeeScS72H3XWl7MD2HVE2lLw4E3u6o-mgPnW9M9MbQ8x_vJ7EhhLUcViDVeniVIYc2b9KvLVt9CNcIVQSJyzq9M3r-km1igU345ZozyUT-HzPTIMQEEaRHARjCOH32e4YhFJTUG7amBPxSVEax-FyG2W3SNYKUurUlx1Hy_4IoGgOGpwY6-tK1_k9iM4MYs-j60M5tvsvewwgxbiX_nQLFpwdNcMbodchTdMQnG4WcBx32ZLa3BWNbBe2KCuslzZ7u7HqA39jskcBMMQXwbkFX9H5D_5vt-m8mheGI_nqY-0w6OYFfhiuy5RiWZfnFfpoyu80Dyzs07Paw"
export const testURL = 'https://pass.bamdev.space'
export const testAlova = createAlova({
  baseURL: testURL,
  statesHook: vueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) {
    method.config.headers = {
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN
    }
  },
  responded: (response) => response.json()
})
