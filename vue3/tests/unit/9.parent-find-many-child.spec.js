import Child from "@/components/9.find-child.vue"
import { mount } from "@vue/test-utils"
import ParentWithManyChildren from "@/components/9.find-parent-many-child.vue"
// import '@testing-library/jest-dom'
import { assert, describe, it,expect } from 'vitest'

it("renders many children", () => {
    const wrapper = mount(ParentWithManyChildren)
  
    expect(wrapper.findAllComponents(Child).length).toBe(3)
  })
  