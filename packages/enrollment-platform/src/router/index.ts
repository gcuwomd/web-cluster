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
    path:'/pass',
    component:()=>import('../views/websites/Pass.vue')
  }
  ,
  {
    path:'/nopass',
    component:()=>import('../views/websites/Nopass.vue')
  }
  ,
  {
    path:'/willpass',
    component:()=>import('../views/websites/Willpass.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
