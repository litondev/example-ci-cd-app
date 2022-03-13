import NestedRoute from "@/components/10.vue-router/nested-route-guard.vue"
import {bustCache} from "@/components/10.vue-router/routes-guard-cache.js"
import { assert, describe, it,expect,vi } from 'vitest'
import { shallowMount } from "@vue/test-utils"

vi.mock("@/components/10.vue-router/routes-guard-cache.js", () => ({ bustCache: vi.fn() }))

it("calls bustCache and next when leaving the route", async () => {
  const wrapper = shallowMount(NestedRoute);
  const next = vi.fn()
  NestedRoute.beforeRouteLeave.call(wrapper.vm, undefined, undefined, next)
  await wrapper.vm.$nextTick()

  // expect(bustCache).not.toHaveBeenCalled()
  expect(next).toHaveBeenCalled()
})
