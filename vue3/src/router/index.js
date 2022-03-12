import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/product",
      name : "product",
      component : () => import("../views/Product.vue")
    }
  ]
})

export default router
