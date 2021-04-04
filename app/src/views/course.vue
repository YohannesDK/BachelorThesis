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
              <div
                class="details_media d-flex align-items-center mt-30 media-teacher"
              >
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
                <div @click="showDoc()" class="contact-teacher">
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
      </div>
      <div class="row sidebar-container">
        <div class="sidebar rounded">
          <ul class="list-unstyled">
            <li
              v-for="(menu, index) in menuChoices"
              :key="index"
              :class="{ active: menuIndex === index }"
              @click="MenuUpdate(index)"
            >
              {{ menu }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <course-editing-modal ref="courseEditingModal">
    <template v-slot:content>
      <div>hahaha</div>
    </template>
  </course-editing-modal>

  <div class="course-page-container">
    <div class="container">
      <div class="course-page-view-container">
        <div class="course-page-view-inner-container" v-if="menuIndex === 0">
          <div class="course-page-view-inner-header">
            <h1>Home</h1>
            <div class="icon-container">
              <div class="icon">
                <fa icon="plus" />
              </div>
            </div>
          </div>
          <div class="course-page-view-inner-body">
            <course-module
              v-for="(courseModule, index) in CourseModules"
              :key="index"
              :index="index"
              :courseModule="courseModule"
            />
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 1">
          <div class="course-page-view-inner-header p-0">
            <h1 class="p-0">Documents</h1>
          </div>
          <div class="course-page-view-inner-body">
            <div class="documents-container">
              <document-card
                v-for="(doc, index) in documents"
                :key="index"
                :document="doc"
                :minimal="true"
              />
            </div>
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 2">
          <div class="course-page-view-inner-header">
            <h1>Assignments</h1>
          </div>
          <div class="course-page-view-inner-body">
            <assignments
              v-for="(assignment, index) in Assignments"
              :key="index"
              :Assignment="assignment"
            />
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 3">
          <div class="course-page-view-inner-header">
            <h1>Tests</h1>
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 4">
          <div class="course-page-view-inner-header">
            <h1>Grades</h1>
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 5">
          <div class="course-page-view-inner-header">
            <h1>Events</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import DocumentCard from "@/components/documentCard.vue";
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  computed,
  reactive
} from "vue";
import store from "@/store";
import courseModule from "@/components/courseModule.vue";
import {
  courseType,
  CourseModule,
  CourseModuleSection,
  CourseModuleSectionItems,
  CourseModuleItemEnum
} from "@/store/interfaces/course";
import { documentType } from "@/store/interfaces/document";
import Assignments from "@/components/Assignments.vue";
import {
  Assignment,
  AssignmentReading,
  AssignmentTest
} from "@/store/interfaces/assignments.types";
import CourseEditingModal from "@/components/CourseEditingModal.vue";

export default defineComponent({
  components: { courseModule, DocumentCard, Assignments, CourseEditingModal },
  name: "Course",
  setup() {
    const CourseId = Number(router.currentRoute.value.query.cid);
    const course: courseType = store.getters.getCoursebyId(CourseId);

    const documents: documentType = store.getters.getDocuments;

    const menuIndex = ref<number>(0);

    const courseEditingModal = ref<any>();

    const menuChoices = [
      "Home",
      "Documents",
      "Assignments",
      "Tests",
      "Grades",
      "Events"
    ];

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
    };

    const SectionItem: CourseModuleSectionItems = {
      ItemID: 0,
      Item: "Section Item Test",
      ItemResourceID: 0,
      ItemType: CourseModuleItemEnum.Link
    };

    const CourseModuleSection: CourseModuleSection = {
      SectionID: 0,
      SectionName: "Section Test",
      SectionItems: [SectionItem, SectionItem]
    };

    const courseModule: CourseModule = {
      courseModuleID: 0,
      courseId: 0,
      moduleOrderIndex: 0,
      moduleName: "Module Test",
      moduleSections: [
        CourseModuleSection,
        CourseModuleSection,
        CourseModuleSection
      ]
    };

    const CourseModules: CourseModule[] = [
      courseModule,
      courseModule,
      courseModule,
      courseModule
    ];

    const Test: AssignmentTest = {
      TestID: 0,
      QSID: 0
    };

    const Reading: AssignmentReading = {
      ReadingID: 0,
      ReadingDesc: "Read Chapter 1 of Narnia",
      documentID: 2
    };
    const Assignment: Assignment = {
      AssignmentID: 0,
      courseID: 0,
      AssignmentName: "HomeWork ",
      Date: "11 May 2021",
      ReadingList: [Reading, Reading, Reading],
      TestList: [Test, Test]
    };

    const Assignments: Assignment[] = [Assignment, Assignment, Assignment];

    return {
      course,
      events,
      menuChoices,
      menuIndex,
      MenuUpdate,
      CourseModules,
      documents,
      Assignments,
      courseEditingModal
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

.course-banner > .container {
  position: relative;
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
  padding: 3%;
  font-size: small;
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

.sidebar-container {
  position: absolute;
  top: 163%;
  width: 100%;
}

.sidebar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar ul {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0;
}

.sidebar ul li[data-v-3aef9135] {
  height: 2.5em;
  border-bottom: 5px solid transparent;
  display: flex;
  align-items: center;
  opacity: 0.7;
  padding-left: 5%;
  transition: all 0.3s;
  min-width: fit-content;
  padding: 0 4%;
}

.sidebar ul li:hover {
  border-bottom: 5px solid rgba(179, 179, 179, 0.308);
  cursor: pointer;
}

.sidebar ul li.active {
  border-bottom: 5px solid rgb(179, 179, 179);
  font-weight: 700;
}

.course-page-view-container {
  min-height: 85vh;
  padding: 1%;
  margin-top: 1%;
}

.course-page-view-inner-container {
  transition: all 0.3s;
}

.course-page-view-inner-header {
  height: 5rem;
  padding: 1% 1%;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-page-view-inner-header h1 {
  color: #777777;
}

.course-page-view-inner-header .icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #3a7892;
  color: white;
}

.course-page-view-inner-header .icon-container:hover {
  cursor: pointer;
}

.course-page-view-inner-body {
  padding-top: 1%;
  width: 100%;
}

.documents-container {
  display: flex;
  flex-wrap: wrap;
  /* padding: 0 1%; */
}
</style>
