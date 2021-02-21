<template>
  <div v-test="{id: '1'}">h</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Test from "@/directives/test.directive";
export default defineComponent({
  name: "documentCard",
  directives: {Test}
})
</script>

<style scoped>

</style>