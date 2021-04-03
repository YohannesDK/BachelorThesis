<template>
  <div
    class="course-banner jumbotron text-white jumbotron-cover shadow bg_cover"
    :style="{
      backgroundImage:
        'url(\'' + require('@/assets/course_background.jpg') + '\')'
    }"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-9 col-sm-11">
          <div class="details_banner_content">
            <h4 class="title mb-4">{{ course.courseName }}</h4>
            <div class="details_media_wrapper d-flex flex-wrap">
              <div class="details_media d-flex align-items-center mt-30 media-teacher">
                <div class="media_image">
                  <img
                    class="author"
                    :src="require(`@/assets/teacher.jpg`)"
                    alt="author"
                  />
                </div>

                <div class="media_content media-body">
                  <p>Teacher</p>
                  <h6 class="title">Kiara alva ruba</h6>
                </div>
                <div
                  @click="showDoc()"
                  class="contact-teacher"
                >
                  <a href="mailto:kassaye85@gmail.com">
                    <fa icon="paper-plane" />
                  </a>
                </div>
              </div>
              
              <div class="details_media d-flex align-items-center mt-30">
                <div class="media_image">
                  <img
                    class="bookmark"
                    :src="require(`../assets/bookmark.png`)"
                    alt="bookmark"
                  />
                </div>
                <div class="media_content media-body">
                  <p>Tags</p>
                  <h6 class="title"><a href="#">Andorid / Development</a></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-9 col-sm-11">
          <div class="details_banner_content">
            <h4 class="title comming-events-title mb-4">Comming Events</h4>
            <div
              class="events_media_wrapper d-flex flex-wrap justify-content-end"
            >
              <div
                class="event-card-container details_media d-flex align-items-center mt-30"
              >
                <div
                  class="event-cards card"
                  v-for="(event, index) in events"
                  :key="index"
                >
                  <div class="card shadow my-card-icon">
                    <fa icon="calendar-alt" class="icon" />
                  </div>
                  <div class="text-center">
                    {{ event.event }}
                  </div>
                  <div class="text-center">
                    {{ event.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="course-page-container">
    <div class="sidebar rounded">
      <ul class="list-unstyled">
        <li v-for="(menu, index) in menuChoices"
        :key="index"
        :class="{'active': menuIndex === index}"
        @click="MenuUpdate(index)"
        >{{menu}}</li>
      </ul>
    </div>

    <div class="container">
      <div class="course-page-view-container">

        <div class="course-page-view-inner-container"
        v-if="menuIndex === 0"
        >
          <h1>Home</h1>
          <course-module />
        </div>

        <div class="course-page-view-inner-container"
        v-if="menuIndex === 1"
        >
          <h1>Documents</h1>
        </div>

        <div class="course-page-view-inner-container"
          v-if="menuIndex === 2"
        >
          <h1>Assignments</h1>
        </div>

        <div class="course-page-view-inner-container"
          v-if="menuIndex === 3"
        >
          <h1>Tests</h1>
        </div>

        <div class="course-page-view-inner-container"
          v-if="menuIndex === 4"
        >
          <h1>Grades</h1>
        </div>

        <div class="course-page-view-inner-container"
          v-if="menuIndex === 5"
        >
          <h1>Events</h1>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { courseType } from "@/store/interfaces/course";
import DocumentCard from "@/components/documentCard.vue";
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  computed,
  reactive
} from "vue";
import axios from "@/services/api";
import store from "@/store";
import courseModule from "@/components/courseModule.vue";

export default defineComponent({
  components: { courseModule },
  name: "Course",
  setup() {
    const CourseId = Number(router.currentRoute.value.query.cid);
    const course: courseType = store.getters.getCoursebyId(CourseId);

    const menuIndex = ref<number>(0);

    const menuChoices = ["Home", "Documents", "Assignments", "Tests", "Grades", "Events"]

    const events = [
      {
        event: "Test",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      }
    ];


    const MenuUpdate = (UpdatedMenuIndex: number) => {
      menuIndex.value = UpdatedMenuIndex;
    }

    return {
      course,
      events,
      menuChoices,
      menuIndex,
      MenuUpdate
    };
  }
});
</script>

<style scoped>
.course-banner {
  position: relative;
  padding-top: 10vh;
  padding-bottom: 115px;
  z-index: 5;
  background-position: top center;
  height: 35vh;
}
.course-banner::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 41, 69, 0.95);
  z-index: -1;
}
.details_banner_content .title {
  font-size: 36px;
  color: #fff;
  font-weight: 600;
}
.details_media {
  width: 50%;
}
.details_media_wrapper p {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #484848;
  margin: 0px;
}

.details_media .media_image .author {
  width: 50px;
  border-radius: 50%;
}
.details_media .media_content {
  padding-left: 15px;
}

.details_media .media_content p {
  font-size: 14px;
  color: #fff;
}

.details_media .media_content .title a,
.details_media .media_content .title {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
}

.details_media .media_image .bookmark {
  width: 20px;
}

.comming-events-title {
  text-align: end;
  font-size: 20px !important;
  padding-top: 16px;
}

.event-cards {
  min-width: 6rem;
  min-height: 3.4rem;
  color: black;
  /* margin-bottom: 5%; */
}
.event-cards:not(:last-child) {
  margin-right: 4%;
}

.ql-editor {
  overflow-x: hidden;
}

.event-card-container {
  position: absolute;
  right: 0;
  padding: 1%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 47%;
  padding-top: 2%;
}

.event-card-container::-webkit-scrollbar {
  display: none;
}

.events_media_wrapper {
  position: relative;
}

.my-card-icon {
  position: absolute;
  left: 40%;
  top: -14px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.my-card-icon > .icon {
  padding: 12%;
  margin: auto;
}

.media-teacher {
  position: relative;
}

.contact-teacher {
  position: absolute;
  padding: 2%;
  top: -20%;
  border: none;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  left: 35%;
}
.contact-teacher:hover {
  cursor: pointer;
}

.contact-teacher a {
  color: #cfea4e;
}

.course-page-container {
  position: relative;
}

.course-page-container .sidebar {
  width: 10%;
  height: fit-content;
  min-height: 65vh;
  position: absolute;
  left: 0;
}

.sidebar ul {
  padding-left: 5%;
  padding-top: 5%;
}

.sidebar ul li {
  height: 2.5em;
  /* background-color: rgb(248, 248, 248); */
  margin-bottom: 1%;
  border-left: 5px solid transparent;
  padding-left: 1%;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.411);
  opacity: 0.7;
  padding-left: 5%;
  transition: all 0.3s;
}

.sidebar ul li:hover {
  border-left: 5px solid rgba(179, 179, 179, 0.308);
  cursor: pointer;
}

.sidebar ul li.active {
  border-left: 5px solid rgb(179, 179, 179);
  background-color: white;
  opacity: 1;
  font-weight: 600;
}

.course-page-view-container {
  min-height: 85vh;
}

.course-page-view-inner-container{
  transition: all 0.3s;
}
</style>
