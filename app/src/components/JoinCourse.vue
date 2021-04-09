<template>
  <div class="join-course-container">
    <div class="row tittle-row">
      <h2 class="title">Join Course</h2>
      <div class="searchbar-container">
        <input type="text" class="searchbar shadow" placeholder="Search..." />
      </div>
    </div>

    <div class="row join-course-data">
      <div class="available-courses-container search-result-inner">
        <ul class="list-unstyled">
          <li>1</li>
        </ul>
      </div>
      <div class="join-course-form">
        <form action="">
          <div class="form-group">
            <input type="text" disabled />
            <small id="emailHelp" class="form-text text-muted"
              >Course Name</small
            >
          </div>
          <div class="form-group">
            <input type="text" class="" />
            <small class="form-text text-muted">Enter Course Password</small>
          </div>
        </form>
        <div class="search-result-actions">
          <div class="search-result-action-btn shadow" @click="Join()">
            <span>Join</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { getAllCourses } from "@/services/api/course.service";

export default defineComponent({
  name: "JoinCourse",
  setup() {
    const Join = () => {
      console.log("Join");
    };

    onBeforeMount(() => {
      const courses = getAllCourses();
      console.log(courses);
    });

    return {
      Join
    };
  }
});
</script>

<style scoped>
.join-course-container {
  display: flex;
  flex-direction: column;
  width: 93%;
  height: 100%;
  padding: 1%;
  padding-top: 0;
  color: #969696;
}

.join-course-container > .tittle-row {
  justify-content: space-between;
  align-items: flex-end;
}

.join-course-container .row .title {
  padding: 0;
  border-bottom: 1px solid #777777;
  padding-bottom: 1%;
  width: 50%;
}

.join-course-container .row {
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

.join-course-data {
  align-items: flex-start;
  margin-top: 1%;
}

.join-course-form {
  width: 50%;
  padding: 0 4%;
  padding-right: 0;
}

.join-course-form input {
  border: none;
  border-bottom: 1px solid;
  width: 100%;
  height: 3rem;
}

.join-course-form input:disabled {
  background: none;
}

.join-course-form .form-group {
  margin-bottom: 3rem;
}

.join-course-form input:focus {
  outline: none;
}

.search-result-actions {
  width: 26%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  float: right;
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
</style>
