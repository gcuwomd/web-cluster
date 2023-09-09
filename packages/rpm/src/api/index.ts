import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJhMWFkYmZiZC1hZDU0LTRmYTAtYTFhMS01ZjNlMGY1ZDNjZGUiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjk0MjI4MDkyLCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTQyNzEyOTIsImlhdCI6MTY5NDIyODA5Mn0.GwH5SBwH5g7_kAmx9GoDylO0eh5kLpM7qKvJhNNI8jLVPa_g-wfQMAtXI-6dd_RGwzHg4V_lpDfrXEuzQAjkLSjAvhyei6RVS4eX0JLDuHDLT9GMwirM0lWPLl0GpZDR0Fa23iNEoy9IZeoYgqoBmLXByGrh4u9NnhkJVwsZ_bZSHNsGJojXd17NqVlhUlHf1d81vmDnouQigJjFWiIBlisSXwXhaJPDBJQgWVZQT4Zof_zPe6FjK3ZoXRMrEsVMI4DKE-9q6eB-klUquq0vj-znNJqXtx60dltA0-tyn1nIK34eXcR007tD9SikLchrljL3-t_Tbrai5ySymMfM3g'
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