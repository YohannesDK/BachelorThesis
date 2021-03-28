<template>
  <div class="courses-container container d-flex ">
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>
        <h1>Hello {{ name }}</h1>
      </h1>
    </div>

    <form @submit.prevent="joinCourse">
      <input
        id="coursePass"
        type="text"
        v-model="coursePass"
        placeholder="Course Password"
      />
      <button>Join Course</button> <br />
    </form>

    <div class="card-container d-flex">
      <div
        class="card shadow-sm rounded"
        v-for="(course, index) in courseBody"
        :key="index"
        @click="OpenCourse(course.id)"
      >
        <img src="" alt="" class="card-img-top course-image" />
        <div class="card-body">
          <h6>{{ course.body }}</h6>
          <p>{{ course.shorthand }}</p>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// https://codepen.io/umeshagouda/pen/QggMve
import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";
import axios from "axios";
import AppVue from "../App.vue";
import courseVue from "./course.vue";
export default defineComponent({
  name: "Courses",
  data() {
    return {
      name: "",
      role: "",
      fullname: "",
      id: "",
      coursePass: "",
      courseBody: [] as any
    };
  },

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },

  created() {
    axios
      .get("/api/studentCourse", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        this.name = response.data.username;
        this.role = response.data.role;
        this.fullname = response.data.fullname;
        this.id = response.data.id;
        console.log(response.data.username);
        for (let i = 0; i < response.data.courseList.length; i++) {
          console.log(response.data.courseList[i].body);
          this.courseBody.push(response.data.courseList[i]);
        }
      });
  },

  methods: {
    joinCourse() {
      axios
        .get("/api/courseInfo", {
          params: { coursePass: this.coursePass, userId: this.id }
        })
        .then(response => {
          this.courseBody.push(response.data.course);
          console.log(this.courseBody);
        });
    }
  },

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
