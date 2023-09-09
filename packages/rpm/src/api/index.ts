import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
<<<<<<< HEAD
  "eyJraWQiOiIyNTQzMzVhZC1hM2Q5LTQ2ZGQtYTBkOC1mODY1OGQyNmQyNjQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkzNTcwNDA1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTM2MTM2MDUsImlhdCI6MTY5MzU3MDQwNX0.YkCUXk4BEeeScS72H3XWl7MD2HVE2lLw4E3u6o-mgPnW9M9MbQ8x_vJ7EhhLUcViDVeniVIYc2b9KvLVt9CNcIVQSJyzq9M3r-km1igU345ZozyUT-HzPTIMQEEaRHARjCOH32e4YhFJTUG7amBPxSVEax-FyG2W3SNYKUurUlx1Hy_4IoGgOGpwY6-tK1_k9iM4MYs-j60M5tvsvewwgxbiX_nQLFpwdNcMbodchTdMQnG4WcBx32ZLa3BWNbBe2KCuslzZ7u7HqA39jskcBMMQXwbkFX9H5D_5vt-m8mheGI_nqY-0w6OYFfhiuy5RiWZfnFfpoyu80Dyzs07Paw"
export const testURL = 'https://pass.bamdev.space'
=======
  'eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTg2OTc2LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI2MzAxNzYsImlhdCI6MTY5MjU4Njk3Nn0.a7ucEo6yrQrQWkKgchOqkqSTBliRQ-MKY2F4xklDP2xjKWFSLSK9Vg5sduTSi_vAYafMZOEu9ORW6oBWQKwMfNtud6e3U-QOl6nsDbrvUcdBk0HYK5KgzWXgSflXH5OjrPpXJFWYoV0VM-qLH3VNNSl6DuGGsYBg3Nzrxb2AInY9C3TCSJKRvO3wrJllu3-yqWj0lG8f8CgVpWMHz7DEqcrg0Nc6HN5saMDLsahLh91EIUrM7PYVtDhMC-a4PjSD4PHNrwR-8w_ElYD8zuSA8xQjjWJ_KnFl-KqjWXL7QlS9t0n60EXmD4Gwzou68eg6eZlk2AdCRXJ3CDMvBk9yKQ'
export const testURL = ' http://n5ujj8.natappfree.cc'
>>>>>>> origin/feat-rpm
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
