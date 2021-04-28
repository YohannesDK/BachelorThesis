<template>
  <h1>add doc to course</h1>
</template>
<script lang="ts">
import store from '@/store'
import { documentType } from '@/store/interfaces/document'
import { defineComponent, ref, Ref } from 'vue'
export default defineComponent({
  name: "AddDocumentToCourse",
  props: {
    courseID: {
      type: Number,
      default: -1
    }
  },
  setup(){
    const myDocuments: Ref<documentType[]> = ref(store.getters.getDocuments);

    return {
      myDocuments
    }
  }
})
</script>