import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/website',
    component: () => import('../views/website/Index.vue'),
    children: [
      {
        path: 'list',
        component: () => import('../views/website/WebsiteList.vue')
      },
      {
        path: ':id',
        component: () => import('../views/website/WebsiteDetial.vue')
      }
    ]
  },
  {
    path: '/organization',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/role',

    component: () => import('../views/role/Index.vue'),
    children: [
      { path: 'list', component: () => import('../views/role/Role.vue') },
      { path: ':id', name: 'roleDetail', component: () => import('../views/role/RoleDetail.vue') }
    ]
  },
  {
    path: '/members',
    component: () => import('../views/Home.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
