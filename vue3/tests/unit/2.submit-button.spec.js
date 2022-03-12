import { mount } from '@vue/test-utils'
import SubmitButton from '@/components/2.submit-button.vue'
import { assert, describe, it,expect } from 'vitest'

// USING FACTORY
const msg = "submit"
const factory = (props) => {
  return mount(SubmitButton, {
    props: {
      msg,
      ...props
    }
  })
}

describe('SubmitButton.vue', () => {
  it("displays a non authorized message", () => {
    // ONE WAY =>
    // const msg = "submit"
    // const wrapper = mount(SubmitButton,{
    //   props: {
    //     msg: msg
    //   }
    // })

    // MORE SIMPLE =>
    const wrapper = factory()

    console.log(wrapper.html())

    expect(wrapper.find("span").text()).toBe("Not Authorized")
    expect(wrapper.find("button").text()).toBe("submit")
  })

  it('displays a admin privileges message', () => {
    // ONE WAY =>
    // const msg = "submit"
    // const isAdmin = true
    // const wrapper = mount(SubmitButton,{
    //   props: {
    //     msg,
    //     isAdmin
    //   }
    // })

    // MORE SIMPLE =>
    const wrapper = factory({ isAdmin: true })

    console.log(wrapper.html())
    
    expect(wrapper.find("span").text()).toBe("Admin Privileges")
    expect(wrapper.find("button").text()).toBe("submit")
  })
})
