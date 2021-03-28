<template>
  <div class="courses-container container d-flex ">
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1 style="display: inline-block;">
        Question Sets
      </h1>
      <button
        @click="addQS()"
        style="display: inline-block; margin-left: 5em; border-radius: 50%; font-size: 20px;"
      >
        +
      </button>
    </div>
    <table>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Created At</th>
      </tr>
      <tr
        @click="openQuestionSet(questionset)"
        v-for="questionset in questionSetList"
        :key="questionset"
      >
        <td>{{ questionset.questionset_id }}</td>
        <td>{{ questionset.title }}</td>
        <td>{{ questionset.description }}</td>
        <td>{{ questionset.createdAt }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
// https://codepen.io/umeshagouda/pen/QggMve
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import axios from "axios";
import AppVue from "../App.vue";
import courseVue from "./course.vue";
export default defineComponent({
  name: "QuestionSets",
  data() {
    return {
      courseBody: [] as any,
      course: "",
      shorthand: "",
      coursePassword: "",
      questionSetList: [] as any
    };
  },

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },

  created() {
    axios
      .get("/api/getQuestionSets", {
        params: { did: router.currentRoute.value.query.did }
      })
      .then(response => {
        console.log(response.data.questionSetList);
        for (let i = 0; i < response.data.questionSetList.length; i++) {
          this.questionSetList.push(response.data.questionSetList[i]);
        }
      });
  },

  methods: {
    //Getting error because questionset has implicitly type any
    //let it be any, why do you care, the code runs fine
    // @ts-ignore
    openQuestionSet(questionset) {
      router.push({
        path: "AddQuestionSet",
        query: { QSID: questionset.questionset_id }
      });
    },
    addQS() {
      console.log(router.currentRoute.value.query.did);
      axios
        .post("api/createQS", {
          documentId: router.currentRoute.value.query.did
        })
        .then(response => {
          console.log("cute");
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
      router.push({ name: "Course", params: { CourseId: courseId } });
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

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
