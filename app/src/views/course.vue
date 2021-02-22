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
              <div class="details_media d-flex align-items-center mt-30">
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
  <div class="container"></div>
</template>

<script lang="ts">
import router from "@/router";
import { courseType } from "@/store/interfaces/course";
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Course",
  setup() {
    const store = useStore();
    const CourseId = Number(router.currentRoute.value.query.cid);
    const course: courseType = store.getters.getCoursebyId(CourseId);
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
    console.log(course);

    return {
      course,
      events
    };
  }
});
</script>

<style scoped>
.course-banner {
  position: relative;
  padding-top: 194px;
  padding-bottom: 95px;
  z-index: 5;
  background-position: top center;
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
</style>
