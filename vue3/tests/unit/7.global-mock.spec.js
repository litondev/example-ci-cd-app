import { mount } from "@vue/test-utils"
import Bilingual from "@/components/7.global-mock.vue"
import { assert, describe, it,expect } from 'vitest'
import { config } from "@vue/test-utils"

config.global.mocks = {
  mock: "Default Mock Value"
}

describe("Bilingual", () => {
  it("renders successfully", () => {
    const wrapper = mount(Bilingual,{
      global: {
        mocks: {
          $t: (msg) => msg
        }
      }
    })
  })
})
