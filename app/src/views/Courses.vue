<template>
  <div class="courses-container container d-flex ">
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>
        My Courses
      </h1>
    </div>

    <div class="card-container d-flex">
      <div
        class="card shadow-sm rounded"
        v-for="(course, index) in courses"
        :key="index"
        @click="OpenCourse(course.courseId)"
      >
        <img src="" alt="" class="card-img-top course-image" />
        <div class="card-body">
          <h6>{{ course.courseName }}</h6>
          <p>{{ course.courseShorthand }}</p>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// https://codepen.io/umeshagouda/pen/QggMve
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import router from "@/router";
export default defineComponent({
  name: "Courses",
  setup() {
    const store = useStore();
    const courses = store.getters.getCourses;
    const showModal = ref<boolean>(false);
    const ToogleModal = () => {
      showModal.value = !showModal.value;
    };

    // Opens Single Course
    const OpenCourse = (courseId: number) => {
      router.push({ name: "Course", query: { cid: courseId } });
    };

    return {
      courses,
      OpenCourse,
      showModal,
      ToogleModal
    };
  }
});
</script>

<style scoped>
.courses-container {
  flex-direction: column;
}
.card-container {
  flex-wrap: wrap;
}
.card-container .card {
  /* z-index: 1; */
  transition: box-shadow 0.3s;
  min-height: 25vh;
  max-height: 25vh;
  min-width: 15rem;
  max-width: 15rem;
  margin: 1% 3rem 0 0;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
}

.course-image {
  background: goldenrod;
  min-height: 10rem;
  width: 100%;
}
</style>
