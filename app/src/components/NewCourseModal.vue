<template>
  <h1>halla</h1>
</template>
<script lang="ts">
import {defineComponent, onMounted} from 'vue'

export default defineComponent({
  name: "NewCourseModal",
  setup() {
    onMounted(() => {
      console.log("Hello world");
    })
  }
})

</script>