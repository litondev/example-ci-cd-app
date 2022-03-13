import { mount } from "@vue/test-utils"
import NestedRoute from "@/components/10.vue-router/nested-route.vue"

describe("NestedRoute", () => {
  it("renders a username from query string", () => {
    const username = "alice"
    const wrapper = mount(NestedRoute,{
        global: {
            mocks: {
              $route: {
                params: { username }
              }
            }
          }
    })

    expect(wrapper.find(".username").text()).toBe(username)
  })
})
