import Child from "@/components/9.find-child.vue"
import { mount } from "@vue/test-utils"
import Parent from "@/components/9.find-parent.vue"
// import '@testing-library/jest-dom'
import { assert, describe, it,expect } from 'vitest'

it("does not render a Child component", () => {
  const wrapper = mount(Parent)

  expect(wrapper.findComponent(Child).exists()).toBe(false)
})

it("renders a Child component", () => {
    const wrapper = mount(Parent, {
      data() {
        return { showChild: true }
      }
    })
  
    expect(wrapper.findComponent({ name: "Child" }).exists()).toBe(true)
  })
  
