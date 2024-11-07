import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/:notFound',
      name: 'error',
      component: ErrorView
    }
  ],
})

export default router
