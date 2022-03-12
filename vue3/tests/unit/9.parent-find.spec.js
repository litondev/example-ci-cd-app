import { mount } from "@vue/test-utils"
import Parent from "@/components/9.find-parent.vue"
// import '@testing-library/jest-dom'
import { assert, describe, it,expect } from 'vitest'

describe("Parent", () => {
    it("does not render a span", () => {
        const wrapper = mount(Parent,{
            data() {
                return { showSpan: false }
              }
        })
    
        expect(wrapper.find("span").isVisible()).toBe(false)
      })

  it("does not render a span", () => {
    const wrapper = mount(Parent,{
        data() {
            return { showSpan: true }
          }
    })

    expect(wrapper.find("span").isVisible()).toBe(true)
  })
})
