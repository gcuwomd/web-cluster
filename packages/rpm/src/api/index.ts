import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJlMGQxYWVmYy1jMDdiLTQ2Y2QtYWVhMi1lYTgwYzgzMmVlNTMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIyMTAwODkwMzYiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjk0MzQzOTg0LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTQzODcxODQsImlhdCI6MTY5NDM0Mzk4NH0.mLPz3H6hmwtjQCQO2MBNkFhv3ZoyKI8bXKTADbeuZqktgMxcpyrzNeaLavrMxeINxq3T9ZjQkV3JOqfyQNb7CS1PKksBnjxnJC2hUSrGMcsRzKrI18533lwiEUKW2RVUQhcFULw4rNJftD8fhqImcoFNHn1ZUymDhxzThCOJDWVc4mh0fMm380afD3F384ucTO7-TSakPAC95JmnRd0Vzc-cfgqv4prHEhs6tX47xaoCme3Nmsp69tDLHBL6dVC15izVA3YB_0fb-aL-h_FUeWPuFF1VoARGtN9hXmNXNx6pb7EMTCCP74b3f1eCF9odkW67qfgLRSNvj2M-tZ8_5Q'
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
