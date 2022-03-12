<template>
    <div>
        Product
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'

export default {
    setup(){
        onBeforeMount(() => {
            console.log("Oke");
        });
    }
}
</script>
