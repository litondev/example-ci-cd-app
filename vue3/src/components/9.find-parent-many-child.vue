<template>
  <div>
    <Child v-for="id in [1, 2 ,3]" :key="id" />
  </div>
</template>

<script>
import Child from "./9.find-child.vue"

export default {
  name: "ParentWithManyChildren",

  components: { Child }
}
</script>
