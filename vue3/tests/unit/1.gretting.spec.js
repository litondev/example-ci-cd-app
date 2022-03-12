import { mount } from '@vue/test-utils'
import Greeting from '@/components/1.greeting.vue'
import { assert, describe, it,expect } from 'vitest'

describe('greeting.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)

    // console.log(wrapper.html())

    expect(wrapper.text()).toMatch("Vue and TDD")
  })
})
