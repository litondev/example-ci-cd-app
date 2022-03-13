import {beforeEach} from "@/components/10.vue-router/routes-guard.js"
import { assert, describe, it,expect,vi } from 'vitest'
import {bustCache} from "@/components/10.vue-router/routes-guard-cache.js"
vi.mock("@/components/10.vue-router/routes-guard-cache.js", () => ({ bustCache: vi.fn() }))

describe("beforeEach", () => {
  afterEach(() => {
    // mockModule.bustCache.mockClear()  
  })

  it("busts the cache when going to /user", () => {
    const to = {
      matched: [{ meta: { shouldBustCache: true } }]
    }
    const next = vi.fn()

    beforeEach(to, undefined, next)

    expect(bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("does not bust the cache when going to /user", () => {
    const to = {
      matched: [{ meta: { shouldBustCache: false } }]
    }
    const next = vi.fn()

    beforeEach(to, undefined, next)

    // expect(bustCache).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
