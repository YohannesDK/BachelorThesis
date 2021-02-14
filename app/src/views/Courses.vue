<template>
  <h1>This is the courses page</h1>
  <button class="btn btn-primary" @click="ToogleModal()">Toogle Model</button>
  <button class="btn btn-secondary" @click="showModal=true">Show</button>
 
  <new-course-modal v-if="showModal" @close="showModal = false" name="Umesh">
    <p>dsfkdskf</p>
  </new-course-modal>
</template>


<script lang="ts">
// https://codepen.io/umeshagouda/pen/QggMve
import { defineComponent, ref } from "vue";
import NewCourseModal from "@/components/NewCourseModal.vue";

export default defineComponent({
  name: "Courses",
  components: {
    NewCourseModal
  },
  setup() {
    const showModal = ref<boolean>(true);
    const ToogleModal = () => {
      showModal.value = !showModal.value;
      console.log(showModal.value);
    };

    return {
      showModal,
      ToogleModal
    };
  }
});
</script>
