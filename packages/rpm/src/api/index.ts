import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
<<<<<<< HEAD
  'eyJraWQiOiI4MmFmNGU0NS01YjJmLTQ1ODktOGZjYy1jMGZjODIzNTRmZDUiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNzUyMTc1LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI3OTUzNzUsImlhdCI6MTY5Mjc1MjE3NX0.wODoSxunjQYaC1ue7nEyQ5XbXBWniUViVGPCJ8Z2Ne2UBwQ4ua4XaxD_lZamYEImVZeZnPOZ3u1VkBCrhrupxLGA2e2gBzl2CgADV0k4NQFBg1e4Tfo9ywT5n0TQTu1uEgjqa4iq2pxsKAYkq2b8F2RfqrS3PTrWt7WDHUGMx1VGy8FbW9uWb2XXD6coZbz_ssoNnFUTX_jI9io4YsJpVig_0MK3Pr2uvKK7PPzLqblWfIfqXMRwj30ri7LTIekGgfnE0tzz0e4UgCnPqHth5Vk_VqAU8U7pyWeA4dJV-6SHX4RZ6ZLn2JS9omtAyNNU614kRaFQgljEwV5O2bi2zw'
export const testURL = 'http://43.139.117.216:8080'
=======
  'eyJraWQiOiJhMWFkYmZiZC1hZDU0LTRmYTAtYTFhMS01ZjNlMGY1ZDNjZGUiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIwMTAwODkyNDAiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkzNzQ5NDU3LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTM3OTI2NTcsImlhdCI6MTY5Mzc0OTQ1N30.dFnD7uIO_tD9yE-Gme2XH5CGBK9E4VnkB02gIp_OhMJAqhvlhsXXVeIpYghvRYTVGoq6torH_ThRyA65Fup9MKOLB63i9o-YILBWyBpPvundMmHdfhucKandVuIOwdDT-RgkbExdacekX5RnQVao245AoRjwnEQh-yvzPMZgnoDDmNQyIM9v7HFkK-YS9B8s8vy24wXFusyOT7MVt3Zm0Gr3joQBqugIAj66SfiDdsDqrEvfUc2C276cISOTOzzBBCBQ53l3-0EiA-BvF3oB48aKCvO6LyS0U_2-NwIM8KM_a3WkQCkqXYMs9SBNBTA5INBvqEjIAJvBCZjsY8Ea3w'

export const testURL = 'https://pass.bamdev.space'
>>>>>>> 9d6f19e87c892524a239f0a96ff66d4f7f7cb94a
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