import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJlMTFhNGUyMy05YzlkLTQzMzQtOWRiMS0yNDQ2NDFiNjI0N2QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIxMTAwOTgxNzIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjkyNTg2OTc2LCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cDovLzQzLjEzOS4xMTcuMjE2Ojk4MjEiLCJleHAiOjE2OTI2MzAxNzYsImlhdCI6MTY5MjU4Njk3Nn0.a7ucEo6yrQrQWkKgchOqkqSTBliRQ-MKY2F4xklDP2xjKWFSLSK9Vg5sduTSi_vAYafMZOEu9ORW6oBWQKwMfNtud6e3U-QOl6nsDbrvUcdBk0HYK5KgzWXgSflXH5OjrPpXJFWYoV0VM-qLH3VNNSl6DuGGsYBg3Nzrxb2AInY9C3TCSJKRvO3wrJllu3-yqWj0lG8f8CgVpWMHz7DEqcrg0Nc6HN5saMDLsahLh91EIUrM7PYVtDhMC-a4PjSD4PHNrwR-8w_ElYD8zuSA8xQjjWJ_KnFl-KqjWXL7QlS9t0n60EXmD4Gwzou68eg6eZlk2AdCRXJ3CDMvBk9yKQ'
export const testURL = ' http://n5ujj8.natappfree.cc'
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
