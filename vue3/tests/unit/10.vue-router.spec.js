import { mount } from "@vue/test-utils"
import App from "@/components/10.vue-router/app.vue"
import { createRouter, createMemoryHistory } from "vue-router"
import NestedRoute from "@/components/10.vue-router/nested-route.vue"
import routes from "@/components/10.vue-router/routes.js"

describe("App", () => {
  it("renders a child component via routing", async () => {
    const router = createRouter({ 
      history: createMemoryHistory(),
      routes 
    })
    router.push("/nested-route")
    await router.isReady()
    const wrapper = mount(App, { 
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.findComponent(NestedRoute).exists()).toBe(true)
  })
})
