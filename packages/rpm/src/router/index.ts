import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/webste',
    component: () => import('../views/Home.vue')
  },{
    path: '/organization',
    component: () => import('../views/Home.vue')
  },{
    path: '/role',
    component: () => import('../views/Home.vue')
  },{
    path: '/members',
    component: () => import('../views/Home.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router