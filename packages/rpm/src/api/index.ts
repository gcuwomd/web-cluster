import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiI4MzU0MGI1Zi1hMjMzLTRiOTYtOTJlMy05OGM4MzFlYzE4ZDAiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjk0NTkwMzAxLCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTQ2MzM1MDEsImlhdCI6MTY5NDU5MDMwMX0.RjpiSNbY-cixAy5GJpuZMatbgExvalh28TmVZTeLm12QwozSx0m87t-Zx7vVYTbebHDYwNLis_FUP3qqm3DsON9s814eUwO9B1QnLPXjL_8KNbUBH9JGdqgLcM-SmK7bstuBDke-k33cAykz6Jp9mN-YV1GTu8L50iqksbhSgW9I5J92Ts8tIkRoam5YtlHHKliYhEZAqtN-xzAhd6JwCvsKCN0tdsI-YifvlKrkoFSUVFWSdNLQKNBsdtYmOQ_mo6B-uT7BC9-NKWcCthMHQoatgIqSDvmQ2X-dsF6ebQeADilwwEPIGm72jFIhYw03vT_B-ZxJlrl2QAPISoI7XQ'
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
