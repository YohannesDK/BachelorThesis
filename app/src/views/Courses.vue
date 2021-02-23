<template>
  <div class="courses-container container d-flex ">
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>
        My Courses
      </h1>
    </div>

    <form @submit="createCourse">
      <label>Create a class </label>
      <input
        id="course"
        v-model="course"
        type="text"
        placeholder="Class Name"
      />
      <input
        id="shorthand"
        v-model="shorthand"
        type="text"
        placeholder="Class Shorthand"
      />
      <input
        id="coursePassword"
        v-model="coursePassword"
        type="text"
        placeholder="Course Password"
      />

      <button>Create Class</button>
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
      courseBody: [] as any,
      course: "",
      shorthand: "",
      coursePassword: ""
    };
  },

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      // this.$router.push("/login")
      console.log("halla");
    }
  },

  created() {
    axios
      .get("/api/userinfo", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        this.name = response.data.user.username;
        this.role = response.data.user.role;
        this.fullname = response.data.user.fullname;
        this.id = response.data.user.id;
        for (let i = 0; i < response.data.courses.length; i++) {
          console.log(response.data.courses[i].body);
          this.courseBody.push(response.data.courses[i]);
        }
        if (this.role == "Teacher") {
          this.$router.push("/teacher");
        }

        if (this.role == "Student") {
          this.$router.push("/student");
        }
      });
  },

  methods: {
    createCourse() {
      axios
        .post("api/createCourse", {
          userId: this.id,
          course: this.course,
          shorthand: this.shorthand,
          coursePassword: this.coursePassword
        })
        .then(response => {
          this.courseBody.push(response.data.courses.body);
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
