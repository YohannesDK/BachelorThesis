<template>
  <div
    class="course-card-container card shadow-sm rounded"
    @click="OpenCourse()"
    v-test="{ id: 'course-card-container' }"
  >
    <img
      src=""
      alt=""
      class="card-img-top course-image"
      v-test="{ id: 'course-card-thumbnail' }"
    />
    <div class="card-body">
      <h6 v-test="{ id: 'course-card-name' }">{{ course.courseName }}</h6>
      <p v-test="{ id: 'course-card-shorthand' }">
        {{ course.courseShorthand }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { courseType } from "@/store/interfaces/course";
import Test from "@/directives/test.directive";
import router from "@/router";

export default defineComponent({
  name: "CourseCard",
  directives: {
    Test
  },
  props: {
    course: {
      type: Object as () => courseType,
      default: () => ({})
    }
  },
  setup(props) {
    const OpenCourse = () => {
      router.push({ name: "Course", query: { cid: props.course.courseId } });
    };
    return {
      OpenCourse
    };
  }
});
</script>

<style scoped>
.course-card-container {
  transition: box-shadow 0.3s;
  min-height: 25vh;
  max-height: 25vh;
  min-width: 13rem;
  max-width: 13rem;
  margin: 0 3rem 0 0;
}

.course-card-container:hover {
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
}

.course-image {
  background: goldenrod;
  min-height: 10rem;
  width: 100%;
}

.card-body {
  flex: 1 1 auto;
  padding: 0.5rem 1rem;
  height: fit-content;
}
</style>
