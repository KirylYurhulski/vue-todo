import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/CreateView')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreateView')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/ListView')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/EditView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
