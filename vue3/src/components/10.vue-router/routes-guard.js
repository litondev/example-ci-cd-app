import Vue from "vue"
import { createRouter, createMemoryHistory } from "vue-router"

import NestedRoute from "./nested-route.vue"
import {bustCache} from "./routes-guard-cache.js";

const routes = [
  { path: "/nested-route", component: NestedRoute , meta: {
    shouldBustCache: true
  }},
]


const router = createRouter({ 
  history: createMemoryHistory(),
  routes 
})

export function beforeEach(to, from, next) {
  if (to.matched.some(record => record.meta.shouldBustCache)) {
    bustCache();
  }
  next()
}

router.beforeEach((to, from, next) => beforeEach(to, from, next))

export default router

