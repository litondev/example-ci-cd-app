<template>
  <ComponentWithAsyncCall />
</template>

<script>
import ComponentWithAsyncCall from "./8.child-component.vue"

export default {
  name: "ParentWithAPICallChild",

  components: {
    ComponentWithAsyncCall : ComponentWithAsyncCall
  }
}
</script>
