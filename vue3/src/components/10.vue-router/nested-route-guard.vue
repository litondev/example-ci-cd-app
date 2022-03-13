<template>
  <div>
    Nested Route
  </div>
</template>
<script>
import { bustCache } from "./routes-guard-cache.js"
export default {
  name: "NestedRoute",

  beforeRouteLeave(to, from, next) {
    bustCache()
    next()
  }
}
</script>
