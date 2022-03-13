import { createRouter, createMemoryHistory } from "vue-router"
import { createApp } from "vue"
import routes from "./routes.js"
import App from './App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes
})
app.use(router)
app.mount("#app")
