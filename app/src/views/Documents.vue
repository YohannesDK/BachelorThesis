<template>
  <div>
    <question-modal note-text="Heya"></question-modal>
  </div>
</template>

<script>
import questionModal from "../components/questionModal.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Documents",
  components: {
    questionModal
  }
});
</script>

<style></style>
