import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'

export const ACCESS_TOKEN =
  'Bearer ' +
  'eyJraWQiOiJhZDc2Y2RkMS0yZTdiLTRlNGUtYWQyZS1jZWVkM2Y2OTc2NzQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDIyMTAwODkwMzYiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNjk1MDkwMDIzLCJzY29wZSI6WyJtZXNzYWdlLnJlYWQiXSwiaXNzIjoiaHR0cHM6Ly93d3cuYmFtZGV2LnNwYWNlOjk4MjEiLCJleHAiOjE2OTUxMzMyMjMsImlhdCI6MTY5NTA5MDAyM30.MzG5yWcZxKi0Mm4BaR4S4Gar0IuXyUfoRuscnRlYbvAcgqk1Sra69Fw4bWy54e2fBuIGwX9FGlyTVY6Mk3-DruktYiRrpL8FHL3QdnQC15mD-iOD8L0P2N0gQqslo6elUtrh1PR7Ko6_jonmqlsXppDBwgOaLq5RjeUEb1Zeds_gpA7dEFTNBcKpdGI5wqA6JWnsePdpdowpys3n8D1WCWhkKr1I_tcrYuSUwFZ6jbFARz85Tw1WFEisiDiK7A_doGepuZ8PqDuRLC2Jl-WpStrN0MDJxTDuoULxcCuYPVIeSGHOheUzNqHux7P5GDjUSqBw8xX1sZ4a1W3PPkb_NA'
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
