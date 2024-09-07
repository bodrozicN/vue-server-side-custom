import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue'),
    name: 'home'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue')
  },
  {
    path: '/settings/privacy',
    name: 'privacy',
    component: () => import('../views/settings/privacy/index.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/index.vue')
  },
  {
    path: '/dashboard/info',
    name: 'dashboardInfo',
    component: () => import('../views/dashboard/info/index.vue')
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('../views/user/[userId]/index.vue')
  }
]

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
    routes
  })
