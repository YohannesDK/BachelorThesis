<template>
  <div class="courses-container d-flex justify-content-end p-1 align-items-center container"
    style="margin-top:3%;"
  >
    <course-editing-modal ref="Modal">
      <template v-slot:content>
        <join-course v-if="coursesAction === 0" />
        <create-course v-if="coursesAction === 1"/>
      </template>
    </course-editing-modal>

    <div class="courses-navbar p-1">
      <h1>My Courses</h1>

      <div class="icon-container">
        <div class="join-course"
        @click="JoinCourse"
        >
          <fa icon="user-plus" />
        </div>
        <div class="join-course"
        @click="CreateCourse"
        >
          <fa icon="plus" />
        </div>

      </div>
    </div>

    <div class="course-container-inner p-1">
      <course-card v-for="(course, index) in courses"
        :key="index"
        :course="course"
      />
    </div>
  </div>
</template>

<script lang="ts">
// https://codepen.io/umeshagouda/pen/QggMve
import { defineComponent, Ref, ref } from "vue";
import router from "@/router";
import axios from "../services/api";
import store from "@/store";
import { courseType } from "@/store/interfaces/course";
import courseCard from "@/components/courseCard.vue";
import CourseEditingModal from "@/components/CourseEditingModal.vue";
import JoinCourse from "@/components/JoinCourse.vue";
import CreateCourse from "@/components/createCourse.vue";

export default defineComponent({
  components: { courseCard, CourseEditingModal, JoinCourse, CreateCourse },
  name: "Courses",
  setup() {
    const courses: Ref<courseType> = ref(store.getters.getCourses);
    const Modal = ref<any>();
    const coursesAction = ref(0);


    const JoinCourse = () => {
      coursesAction.value = 0;
      if (Modal.value) {
        try {
          Modal.value.showModal.call(); 
        } catch (error) {
          console.error(error);
        }
        
      }
    };

    const CreateCourse = () => {
      coursesAction.value = 1;
      if (Modal.value) {
        try {
          Modal.value.showModal.call(); 
        } catch (error) {
          console.error(error);
        }
        
      }
    }

    return {
      courses,
      Modal,
      JoinCourse,
      CreateCourse,
      coursesAction
    };
  }
});
</script>

<style scoped>
.courses-container {
  flex-direction: column;
}

.course-container-inner {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.join-course {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3a7892;
  color: white;
  transition: all 0.3s;
  margin-top: 1rem;
}

.join-course:hover {
  cursor: pointer;
}

.courses-navbar {
  display: flex;
  margin: auto auto auto 0px;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 1rem;
}

.courses-navbar > h1 {
  color: grey;
  padding-top: 4%;
  margin: 0;
  font-size: 1.8rem;
  white-space: nowrap;
}

.icon-container {
  display: flex;
}
</style>
