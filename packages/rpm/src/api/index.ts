import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzEiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyMDM0ODU3LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTIwNzgwNTcsImlhdCI6MTY5MjAzNDg1N30.rMoABj5pzGf37qfPh_kbbNeN0NEVOy-oB05J8A4clMMva2Xq3RcvJ2aQqc9WGgLh3CnRyZy3UBEyzqAory1Ev8p13YWfO5swidJFpTtLkWKNfC0VJU1nBRPj3aTvd5yTtaZsd7mOEV7lauUlinoa0pBH1kR_79qjl1jjIBkzi1GfpIXGMh0UQU9QdemlAdZ0Q1XMcUngnrbPOUIL5hLDspzNum44C3TBccEEGLMmmkPGai2stdB7J8N2K_Dea9-HG3SiYMYdGgRz4271jZQP16UzrbGDpY6x6aPjhZKFnyhXErBa1oApBmeY-L2iJrsFg8rFZJNtcmM-a-ix5RGnCA'
export const testURL = 'http://vrzs9y.natappfree.cc'
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
