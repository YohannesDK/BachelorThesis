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
                  <h6 class="title">{{ courseTeacher.UserName }}</h6>
                </div>
                <div @click="showDoc()" class="contact-teacher">
                  <a href="mailto:kassaye85@gmail.com">
                    <fa icon="paper-plane" />
                  </a>
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
      <add-course-module
        v-if="AddingType === 0 && CourseModuleAction === 0"
        :CourseModuleAction="CourseModuleAction"
        :courseID="course.courseId"
      />
      <add-course-module
        v-if="AddingType === 0 && CourseModuleAction === 1"
        :CourseModuleAction="CourseModuleAction"
        :courseID="course.courseId"
        :courseModule="courseModule"
      />

      <add-document-to-course
        v-if="AddingType === 1"
        :courseID="course.courseId"
        :courseDocuments="course.documents"
        @documentsUpdated="ondocumentsUpdated"
      />

      <add-assignment-module
        v-if="AddingType === 2 && AssigmentModuleAction === 0"
        :AssigmentModuleAction="AssigmentModuleAction"
      />

      <add-assignment-module
        v-if="AddingType === 2 && AssigmentModuleAction === 1"
        :AssigmentModuleAction="AssigmentModuleAction"
        :AssignmentModule="assignmentModule"
      />

      <div v-if="AddingType === 3">tests</div>
    </template>
  </course-editing-modal>

  <div class="course-page-container">
    <div class="container">
      <div class="course-page-view-container">
        <div class="course-page-view-inner-container" v-if="menuIndex === 0">
          <div class="course-page-view-inner-header">
            <h1>Home</h1>
            <div class="icon-container" @click="AddNew(0)" v-if="IsTeacher">
              <div class="icon">
                <fa icon="plus" />
              </div>
            </div>
          </div>
          <div class="course-page-view-inner-body">
            <course-module
              v-for="(courseModule, index) in course.courseModules"
              :key="index"
              :index="index"
              :courseModule="courseModule"
              @edit="OnEdit(courseModule, 0)"
              @delete="OnDelete(courseModule)"
            />
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 1">
          <div class="course-page-view-inner-header">
            <h1>Documents</h1>
            <div class="icon-container" @click="AddNew(1)" v-if="IsTeacher">
              <div class="icon">
                <fa icon="plus" />
              </div>
            </div>
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
            <div class="icon-container" @click="AddNew(2)" v-if="IsTeacher">
              <div class="icon">
                <fa icon="plus" />
              </div>
            </div>
          </div>
          <div class="course-page-view-inner-body">
            <assignments
              v-for="(assignment, index) in course.AssignmentModules"
              :key="index"
              :Assignment="assignment"
              @edit="OnAssingmentEdit(assignment, 2)"
              @delete="OnAssignmentDelete(assignment)"
            />
          </div>
        </div>

        <div class="course-page-view-inner-container" v-if="menuIndex === 3">
          <div class="course-page-view-inner-header">
            <h1>Question Sets</h1>
            <div class="icon-container" @click="AddNew(3)" v-if="IsTeacher">
              <div class="icon">
                <fa icon="plus" />
              </div>
            </div>
          </div>
          <div class="course-page-view-inner-body">
            <table class="table questionsettable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <div class="th-container" @click="updateSortOption(0)">
                      <span>Tittle</span>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="th-container" @click="updateSortOption(0)">
                      <span>Description</span>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="th-container" @click="updateSortOption(1)">
                      <span>Questions</span>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="th-container" @click="updateSortOption(2)">
                      <span>Last Edited</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-questionsets-row qs-splitter">
                  <th scope="row"></th>
                  <td colspan="4">
                    Course Question sets
                  </td>
                </tr>
                <tr
                  class="table-questionsets-row"
                  v-for="(questionset, index) in QuestionSets"
                  :key="index"
                  @click="OpenQuestionSet(questionset.QSID)"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    {{ questionset.Tittle }}
                  </td>
                  <td>
                    {{
                      questionset.Description.substring(
                        0,
                        DescriptionSubstringLength
                      ) + "..."
                    }}
                  </td>
                  <td>
                    {{ questionset.QuestionSet.length }}
                  </td>
                  <td>
                    {{ questionset.LastEdited }}
                  </td>
                </tr>
                <tr class="table-questionsets-row qs-splitter">
                  <th scope="row"></th>
                  <td colspan="4">
                    Document Question sets
                  </td>
                </tr>
                <tr
                  class="table-questionsets-row"
                  v-for="(questionset, index) in documentQuestionSets"
                  :key="index"
                  @click="OpenQuestionSet(questionset.QSID)"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    {{ questionset.Tittle }}
                  </td>
                  <td>
                    {{
                      questionset.Description.substring(
                        0,
                        DescriptionSubstringLength
                      ) + "..."
                    }}
                  </td>
                  <td>
                    {{ questionset.QuestionSet.length }}
                  </td>
                  <td>
                    {{ questionset.LastEdited }}
                  </td>
                </tr>
              </tbody>
            </table>
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
  reactive,
  Ref,
  ComputedRef
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
  AssignmentModule,
  AssignmentReading,
  AssignmentTest
} from "@/store/interfaces/assignments.types";
import CourseEditingModal from "@/components/CourseEditingModal.vue";
import AddCourseModule from "@/components/AddCourseModule.vue";
import AddAssignmentModule from "@/components/AddAssignmentModule.vue";
import AddDocumentToCourse from "@/components/AddDocumentToCourse.vue";
import { UserType } from "@/store/interfaces/user.types";
import { QuestionSet } from "@/store/interfaces/question.type";

export default defineComponent({
  components: {
    courseModule,
    DocumentCard,
    Assignments,
    CourseEditingModal,
    AddCourseModule,
    AddAssignmentModule,
    AddDocumentToCourse
  },
  name: "Course",
  setup() {
    const CourseId = Number(router.currentRoute.value.query.cid);
    const course: Ref<courseType> = ref(store.getters.getCoursebyId(CourseId));

    const courseModule: Ref<CourseModule> = ref({
      courseModuleID: -1,
      courseId: -1,
      moduleOrderIndex: 0,
      public: false,
      moduleName: "",
      moduleSections: []
    });

    const assignmentModule: Ref<AssignmentModule> = ref({
      AssignmentID: -1,
      courseID: -1,
      AssignmentName: "",
      Date: "",
      ReadingList: [],
      TestList: []
    });

    const documents: Ref<Array<documentType>> = ref(
      store.getters.getCourseDocuments(course.value.documents)
    );

    const documentQuestionSets: ComputedRef<Array<QuestionSet>> = computed(() => {
      let questionsetIDs: number[] = []
      documents.value.forEach((doc: documentType) => {
        questionsetIDs = [...questionsetIDs, ...doc.QuestionSetID]
      })
      return store.getters.getCourseDocumentQuestionSets(questionsetIDs)
    });

    const menuIndex = ref<number>(0);
    const DescriptionSubstringLength = 25;
    const AddingType = ref(0);
    const CourseModuleAction = ref(0);
    const AssigmentModuleAction = ref(0);
    const QuestionSetsMenuIndex = ref(0);
    const menuChoices = [
      "Home",
      "Documents",
      "Assignments",
      "Question Sets",
      "Grades"
    ];

    const courseEditingModal = ref<any>();




    const MenuUpdate = (UpdatedMenuIndex: number) => {
      menuIndex.value = UpdatedMenuIndex;
    };

    const OpenQuestionSet = (QSID: number) => {
      router.push({
        name: "AddQuestionSet",
        query: { QSID: QSID }
      });
    };

    const AddNew = (addingType: number) => {
      CourseModuleAction.value = 0;
      if (courseEditingModal.value) {
        try {
          AddingType.value = addingType;
          courseEditingModal.value.showModal.call();
        } catch (e) {
          return;
        }
      }
    };

    const OnEdit = (editcourseModule: CourseModule, addingtype: number) => {
      courseModule.value = editcourseModule;
      CourseModuleAction.value = 1;
      if (courseEditingModal.value) {
        try {
          AddingType.value = addingtype;
          courseEditingModal.value.showModal.call();
        } catch (e) {
          console.error(e);
        }
      }
    };

    const OnDelete = (courseModule: CourseModule) => {
      store.dispatch("deleteCourseModule", courseModule);
    };

    const OnAssingmentEdit = (
      AssignmentModule: AssignmentModule,
      addingtype: number
    ) => {
      assignmentModule.value = AssignmentModule;
      AssigmentModuleAction.value = 1;
      if (courseEditingModal.value) {
        try {
          AddingType.value = addingtype;
          courseEditingModal.value.showModal.call();
        } catch (error) {
          console.error(error);
        }
      }
    };
    const OnAssignmentDelete = (assigmentmodule: AssignmentModule) => {
      store.dispatch("deleteAssignmentModule", assigmentmodule);
    };

    const ondocumentsUpdated = () => {
      documents.value = store.getters.getCourseDocuments(
        course.value.documents
      );
    };

    const IsTeacher = computed(() => store.getters.getIsTeacher);

    const courseTeacher: ComputedRef<UserType> = computed(() => {
      if (IsTeacher.value) {
        return store.getters.getActiveUser;
      } else {
        return store.getters.getCourseTeacher(course.value.Teacher);
      }
    });

    const QuestionSets: ComputedRef<QuestionSet> = computed(() => {
      return store.getters.getAllQuestionSets;
    });

    return {
      course,
      menuChoices,
      menuIndex,
      MenuUpdate,
      documents,
      courseEditingModal,
      AddNew,
      AddingType,
      CourseModuleAction,
      OnEdit,
      courseModule,
      OnDelete,
      assignmentModule,
      OnAssingmentEdit,
      OnAssignmentDelete,
      AssigmentModuleAction,
      IsTeacher,
      ondocumentsUpdated,
      courseTeacher,
      QuestionSetsMenuIndex,
      QuestionSets,
      documentQuestionSets,
      DescriptionSubstringLength,
      OpenQuestionSet
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
  justify-content: space-between;
  margin: 0;
}

.sidebar ul li {
  height: 2.5em;
  border-bottom: 5px solid transparent;
  display: flex;
  align-items: center;
  opacity: 0.7;
  padding-left: 5%;
  transition: all 0.3s;
  min-width: max-content;
  width: 100%;
  padding: 0 4%;
  justify-content: center;
}

.sidebar ul li:not(:last-child) {
  margin-right: 1rem;
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

.questionsettable {
  vertical-align: -webkit-baseline-middle;
  vertical-align: baseline;
  vertical-align: -moz-baseline;
}

/* .questionsettable th:not(:first-child, :last-child) {
} */
.th-container {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 2%;
  padding-left: unset;
}

.th-container span {
  white-space: nowrap;
  margin-right: 1.2rem;
}

.th-icon-container {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.th-icon-container:hover {
  background-color: rgba(229, 231, 238, 0.514);
  cursor: pointer;
}

.table-questionsets-row {
  transition: all 0.3s;
}

.table-questionsets-row:hover {
  background-color: rgba(229, 231, 238, 0.514);
  cursor: pointer;
}

tr.table-questionsets-row.qs-splitter {
  height: 4rem;
  font-weight: 700;
}

.qs-splitter td {
  vertical-align: middle;
}

.qs-splitter:hover {
  background-color: rgba(229, 231, 238, 0);
}
.course-questionset-menu-btn {
  width: 49.9%;
  display: flex;
  justify-content: center;
  min-height: 3rem;
  align-items: center;
  border-radius: 3px;
  transition: all 0.3s;
  border-bottom: 4px solid transparent;
}

.course-questionset-menu-container {
  display: flex;
  justify-content: space-evenly;
}

.course-questionset-menu-btn.active {
  border-bottom: 4px solid #3b7991;
  background: rgba(245, 245, 245, 0.493);
}

.course-questionset-menu-btn:hover {
  background: rgba(245, 245, 245, 0.493);
  cursor: pointer;
  border-bottom: 4px solid #3b7991a6;
}
</style>
