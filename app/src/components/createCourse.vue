<template>
  <div class="create-course-container">
    <div class="row tittle-row">
      <h2 class="title">Create Course</h2>
    </div>

    <div class="row create-course-data">
      <div class="create-course-form">
        <form action="">
          <div class="form-group">
            <input type="text" v-model="course.courseName" />
            <small id="emailHelp" class="form-text text-muted"
              >1. Enter Course Name</small
            >
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="course.courseShorthand"
              :disabled="course.courseName === ''"
            />
            <small class="form-text text-muted"
              >2. Enter Course Shorthand</small
            >
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="coursePassword"
              :disabled="course.courseShorthand === ''"
            />
            <small class="form-text text-muted">3. Enter Course Password</small>
          </div>
        </form>
        <div class="search-result-actions">
          <div class="search-result-action-btn shadow" @click="create()">
            <span>Create</span>
          </div>
        </div>
      </div>
      <div class="create-course-form course-card-container">
        <course-card :course="course" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from "vue";
import { CreateCourse } from "@/services/api/course.service";
import courseCard from "./courseCard.vue";
import { courseType } from "@/store/interfaces/course";
import store from "@/store";
import { RoleType, UserType } from "@/store/interfaces/user.types";

export default defineComponent({
  components: { courseCard },
  name: "CreateCourse",
  setup() {
    const course: Ref<courseType> = ref({
      courseId: -1,
      courseName: "",
      courseShorthand: "",
      Teacher: -1,
      documents: [],
      courseModules: [],
      AssignmentModules: [],
      QuestionSets: []
    });
    const coursePassword = ref("");

    const user: Ref<UserType> = ref(store.getters.getActiveUser);

    const create = () => {
      if (!Object.entries(user.value).length) {
        return;
      }
      if (user.value.Role.toLowerCase() !== RoleType.Teacher.toLowerCase()) {
        return;
      }
      course.value.Teacher = user.value.UserID;
      CreateCourse(course.value, coursePassword.value);
    };

    return {
      create,
      course,
      coursePassword
    };
  }
});
</script>

<style scoped>
.create-course-container {
  display: flex;
  flex-direction: column;
  width: 93%;
  height: 100%;
  padding: 1%;
  padding-top: 0;
  color: #969696;
}

.create-course-container > .tittle-row {
  justify-content: space-between;
  align-items: flex-end;
}

.create-course-container .row .title {
  padding: 0;
  border-bottom: 1px solid #777777;
  padding-bottom: 1%;
  width: 50%;
}

.create-course-container .row {
  flex-direction: row;
  width: 100%;
  padding: inherit;
}

.searchbar-container {
  display: flex;
  justify-content: space-between;
  width: 40%;
  padding: inherit;
}

.searchbar {
  width: 100%;
  border-radius: 15px;
  border-color: transparent;
  padding: 5px 5px 5px 15px;
  outline: none;
  height: fit-content;
}

.searchbar:focus {
  border-color: transparent;
  outline: none;
}

.available-courses-container {
  width: 50%;
  padding: 0;
}

.search-result-inner ul {
  height: fit-content;
  /* padding: 1% 1%; */
  flex-wrap: wrap;
  max-height: 19rem;
  overflow-y: scroll;
}

.search-result-inner ul::-webkit-scrollbar {
  width: 2px;
  height: 0.3rem;
  margin-top: 1%;
}

.search-result-inner ul::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.search-result-inner ul li {
  height: 2.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1%;
  padding: 0 2%;
  transition: all 0.3s;
}

.search-result-inner ul li.active {
  background: rgba(173, 216, 230, 0.219);
}

.search-result-inner ul li:hover {
  background: rgba(173, 216, 230, 0.219);
  cursor: pointer;
}

.create-course-data {
  align-items: flex-start;
  margin-top: 1%;
}

.create-course-form {
  width: 48%;
  padding: 0;
}

.create-course-form input {
  border: none;
  border-bottom: 1px solid;
  width: 100%;
  /* height: 3rem; */
}

.create-course-form input:disabled {
  background: none;
}

.create-course-form form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.create-course-form .form-group {
  margin-bottom: 3rem;
  margin-right: 1%;
  max-width: 50%;
}

.create-course-form input:focus {
  outline: none;
}

.search-result-actions {
  width: 26%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  /* float: right; */
}

.search-result-action-btn {
  width: 100%;
  height: 2.5rem;
  border-radius: 15px;
  padding: 1% 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  transition: all 0.3s;
}

.search-result-action-btn:hover {
  cursor: pointer;
  background: whitesmoke;
}

.course-card-container {
  display: flex;
  justify-content: center;
  padding-top: 2%;
}
</style>
