import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: PostView
    },
    { path: '/:pathMatch(.*)*', component: import('@/views/NotFoundView.vue') }
  ]
})

export default router
