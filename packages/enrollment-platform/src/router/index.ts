import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/websites/Index.vue'),
    children: [
      {
        path: 'fan',
        component: () => import('../views/websites/Fan-chart.vue')
      },
      {
        path: 'histogram',
        component: () => import('../views/websites/Histogram.vue')
      }
    ]
  },
  {
    path:'/sign',
    component: ()=>import('../views/Sign.vue')
  },
  {
    path:'/check',
    component:()=>import('../views/Check.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
