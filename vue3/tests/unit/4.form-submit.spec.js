import { mount } from "@vue/test-utils"
import FormSubmitter from "@/components/4.form-submit.vue"
import { assert, describe, it,expect } from 'vitest'

describe("FormSubmitter", () => {
  it("reveals a notification when submitted", async () => {
    const wrapper = mount(FormSubmitter)

    await wrapper.find("[data-username]").setValue("alice")
    // await wrapper.vm.$nextTick() // "Wait for the DOM to update before continuing the test"

    await wrapper.find("form").trigger("submit.prevent")
    
    expect(wrapper.find(".message").text())
      .toBe("Thank you for your submission, alice.")
  })
})
