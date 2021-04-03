<template>
  <div class="course-module-container">
    <div class="course-module shadow rounded">
      <div class="course-module-header"
      @click="ToogleCourseModule()"
      >
        Header
      </div>
      <div class="course-module-body shadow"
      :class="{'showModule' : ShowCourseModule[0]}"
      >
        Body
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  courseType, 
  CourseModule, 
  CourseModuleSection,
  CourseModuleSectionItems,
  CourseModuleItemEnum
} from "@/store/interfaces/course";

export default defineComponent({
  name: "CourseModule",
  setup() {
    const msg = "hello world";
    const ShowCourseModule = ref({
      0: false
    });

    const SectionItem: 
      CourseModuleSectionItems = {
        ItemID: 0,
        Item: "Section Item Test",
        ItemType: CourseModuleItemEnum.Link
      }

    const CourseModuleSection: CourseModuleSection = {
      SectionID: 0,
      SectionName: "Section Test",
      SectionItems: [SectionItem]
    }
    const courseModules: CourseModule[] = [
      {
        courseModuleID: 0,
        courseId: 0,
        moduleOrderIndex: 0,
        moduleName: "Module Test",
        moduleSections: [CourseModuleSection]
      }
    ];


    const ToogleCourseModule = () => {
      ShowCourseModule.value[0] = !ShowCourseModule.value[0];
    };

    onMounted(() => {
      console.log(courseModules);
    })

    return {
      msg,
      courseModules,
      ToogleCourseModule,
      ShowCourseModule
    }
  }
})
</script>

<style scoped>
.course-module-container {
  width: 100%;
  display: flex;
  flex-direction: column;
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
}

.course-module-header:hover {
  cursor: pointer;
}

.course-module-body {
  background: #947171;
  padding: 0 1%;
  transition: all 0.3s;
  display: flex;
  max-height: 0;
  min-height: 0;
  height: 0;
  overflow: hidden;
}

.course-module-body.showModule {
  max-height: fit-content;
  height: fit-content;
  padding: 1% 1%;
  min-height: 10vh;
}
</style>