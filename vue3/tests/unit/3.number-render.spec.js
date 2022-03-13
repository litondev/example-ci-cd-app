import { mount } from "@vue/test-utils"
import NumberRenderer from "@/components/3.number-render.vue"
import { assert, describe, it,expect } from 'vitest'

describe("NumberRenderer", () => {
  it("renders even numbers", () => {
    const wrapper = mount(NumberRenderer, {
      props: {
        even: true
      }
    })

    expect(wrapper.text()).toBe("2, 4, 6, 8")
  })

  it("renders odd numbers", () => {
    const localThis = { even: false }
  
    expect(NumberRenderer.computed.numbers.call(localThis)).toBe("1, 3, 5, 7, 9")
  })  

  it("renders odd numbers", () => {
    const localThis = { even: false }
  
    expect(NumberRenderer.computed.numbers()).toBe("1, 3, 5, 7, 9")
  })
  
})