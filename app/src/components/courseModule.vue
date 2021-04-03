<template>
  <div class="course-module-container">
    <div class="course-module shadow rounded">
      <div class="course-module-header" @click="ToogleCourseModule()">
        <h3>{{ courseModule.moduleName }}</h3>
        <div class="icon-container">
          <div class="icon">
            <fa icon="plus" />
          </div>
          <div class="icon">
            <fa icon="ellipsis-v" />
          </div>
        </div>
      </div>
      <div class="course-module-body" :class="{ showModule: ShowModuleBody }">
        <div
          class="course-module-section"
          v-for="(section, index) in courseModule.moduleSections"
          :key="index"
        >
          <div class="course-module-section-header">
            {{section.SectionName}}
          </div>
          <div class="course-section-item"
          v-for="(sectionItem, sIndex) in section.SectionItems"
          :key="sIndex"
          >
            <div class="section-item-item">
              {{sectionItem.Item}}
            </div>
            <div class="icon-container">
              <div class="icon">
                <fa icon="ellipsis-v" />
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  courseType,
  CourseModule,
  CourseModuleSection,
  CourseModuleSectionItems,
  CourseModuleItemEnum
} from "@/store/interfaces/course";

export default defineComponent({
  name: "CourseModule",
  props: {
    courseModule: {
      type: Object as () => CourseModule,
      default: () => ({}) 
    }
  },
  setup() {
    const msg = "hello world";
    const ShowModuleBody = ref(false); 

    const ToogleCourseModule = () => {
      ShowModuleBody.value = !ShowModuleBody.value;
    };

    return {
      msg,
      ToogleCourseModule,
      ShowModuleBody
    };
  }
});
</script>

<style scoped>
.course-module-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
}

.course-module {
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  width: 100%;
  /* padding: 0%; */
}

.course-module-header {
  min-height: 3rem;
  background: whitesmoke;
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  padding: 0 1%;
  justify-content: space-between;
}

.icon-container {
  width: fit-content;
  padding-left: 1%;
  display: flex;
  justify-content: space-evenly;
}

.icon-container .icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  padding: 1%;
  transition: all 0.3s;
  color: rgb(194, 189, 189);
}

.course-module-header .icon:hover {
  background: rgba(255, 255, 255, 0.76);
  cursor: pointer;
  color: black;
}

.course-module-header:hover {
  cursor: pointer;
}

.course-module-body {
  transition: all 0.3s;
  display: flex;
  max-height: 0;
  min-height: 0;
  height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.course-module-body.showModule {
  max-height: fit-content;
  height: fit-content;
  /* padding: 1% 1%; */
  min-height: 10vh;
}

.course-module-section {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.course-module-section-header, .course-section-item {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(180, 180, 180, 0.397);
  padding: 0;
  transition: all 0.3s;
  padding: 0 1%;
}

.course-module-section-header {
  font-weight: 700;
  font-size: 1.2rem;
}

.course-module-section:not(:first-child) {
  border-top: 1px solid rgba(180, 180, 180, 0.589);
}

.course-section-item {
  padding-left: 3%;
  display: flex;
  justify-content: space-between;
}

.course-section-item:hover {
  background: whitesmoke;
  cursor: pointer;
}

.course-module .course-section-item:last-child {
  border-bottom: none;
}

</style>
