import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJhMWFkYmZiZC1hZDU0LTRmYTAtYTFhMS01ZjNlMGY1ZDNjZGUiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIwMTAwODkyNDAiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkzNzQ5NDU3LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTM3OTI2NTcsImlhdCI6MTY5Mzc0OTQ1N30.dFnD7uIO_tD9yE-Gme2XH5CGBK9E4VnkB02gIp_OhMJAqhvlhsXXVeIpYghvRYTVGoq6torH_ThRyA65Fup9MKOLB63i9o-YILBWyBpPvundMmHdfhucKandVuIOwdDT-RgkbExdacekX5RnQVao245AoRjwnEQh-yvzPMZgnoDDmNQyIM9v7HFkK-YS9B8s8vy24wXFusyOT7MVt3Zm0Gr3joQBqugIAj66SfiDdsDqrEvfUc2C276cISOTOzzBBCBQ53l3-0EiA-BvF3oB48aKCvO6LyS0U_2-NwIM8KM_a3WkQCkqXYMs9SBNBTA5INBvqEjIAJvBCZjsY8Ea3w'

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

// export const authURL = 