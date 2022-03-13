import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/user",
      name : "user",
      component : () => import("../views/User.vue")
    }
  ]
})

export default router
