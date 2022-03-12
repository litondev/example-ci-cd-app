import { shallowMount, mount } from '@vue/test-utils'
import ParentWithAPICallChild from '@/components/8.parent-component.vue'
import ComponentWithAsyncCall from '@/components/8.child-component.vue'
import { assert, describe, it,expect } from 'vitest'

// stubs is useful for stubbing out the behavior of children that is unrelated to the current unit test
// shallowMount stubs out child components by default

describe('ParentWithAPICallChild.vue', () => {
  it('renders with mount and does initialize API call', () => {
    const wrapper = mount(ParentWithAPICallChild)

    
    expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)
  })

// DOES NOT WORKING
//   it('renders with mount and does initialize API call', () => {
//     const wrapper = mount(ParentWithAPICallChild, {
//       global: {
//         stubs: {
//             ComponentWithAsyncCall: "<div class='stub'></div>"        
//         },
//       },
//     })
  
//     expect(wrapper.find(ComponentWithAsyncCall).exists()).toBe(true)
//   })
  
// DOES NOT WORKING
//   it('renders with shallowMount and does not initialize API call', () => {
//     const wrapper = shallowMount(ParentWithAPICallChild)
  
//     expect(wrapper.find(ComponentWithAsyncCall).exists()).toBe(true)
//   })  
})
