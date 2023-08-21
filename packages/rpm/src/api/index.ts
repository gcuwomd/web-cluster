import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTE5MzIxLCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI1NjI1MjEsImlhdCI6MTY5MjUxOTMyMX0.c4B1cVk9wdMSy64jYf_fYrt2mhg1sc8Ch3A9l0IoNLew9TgvXSmB8UNq-Ii2UwEfiDPA5rLNct6llgllABMGKAvoho3NbAQwOnviXIpfbqXuYWYYw2qeDrAmyxfSQ1HBVUau_wuelsShyIK04aFK7vsck1vCjNbZvuxae4h_HX32No4j2xM3qWZoPE2vpl8xJuyaf51caBGLWlfCsjZJfUO8VrdyxkIDX3Mt0kfBclbGyC54knAOQaj0eOTVrCo0FOZc2w2M3iyWL84P08e3L71F1wiM_pKDg-8wz7792WIKNbMd-rmOhNKjBzsnnnLi4wEi4b6R0Q-nlP4CgRI28g'
export const testURL = 'http://9rh5x7.natappfree.cc'
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
