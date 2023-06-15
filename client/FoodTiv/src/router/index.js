import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import FoodReview from '@/views/FoodReview.vue'
import AddMenuForm from '@/views/AddMenuForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/foodReviews/:id',
      name: 'foodReviews',
      component: FoodReview
    },
    {
      path: '/foodReviews/:foodReviewId/addMenu',
      name: 'addMenu',
      component: AddMenuForm
    }
  ]
})

export default router
