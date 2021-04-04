<template>
  <div class="course-module-container">
    <div class="course-module shadow rounded">
      <div class="course-module-header" @click="ToogleCourseModule()">
        <h3 class="tittle">{{ courseModule.moduleName }}</h3>
        <div class="icon-container">
          <div class="icon">
            <fa icon="plus" />
          </div>
          <div
            class="icon"
            @click.stop="HandleDropDown()"
            @mouseleave="RemoveDropDowns()"
          >
            <fa icon="ellipsis-v" />
            <div class="dropdowncontainer" v-if="showModuleDropDown">
              <div class="course-module-dropdown-drop shadow-sm">
                <ul class="list-unstyled mb-0">
                  <li>Edit</li>
                  <li>Publish</li>
                  <li>Hide</li>
                  <hr />
                  <li>Delete</li>
                </ul>
              </div>
            </div>
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
            {{ section.SectionName }}
          </div>
          <div
            class="course-section-item"
            v-for="(sectionItem, sIndex) in section.SectionItems"
            :key="sIndex"
          >
            <div class="section-item-item">
              {{ sectionItem.Item }}
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
    },
    index: {
      type: Number,
      default: -1
    }
  },
  setup(props) {
    const msg = "hello world";
    const ShowModuleBody = ref(false);
    const showModuleDropDown = ref(false);
    const dropdownIndex = ref(-1);

    const ToogleCourseModule = () => {
      ShowModuleBody.value = !ShowModuleBody.value;
    };

    const HandleDropDown = (newdropdownIndex = -1) => {
      if (newdropdownIndex === -1) {
        showModuleDropDown.value = true;
        return;
      }
      dropdownIndex.value = newdropdownIndex;
    };

    const RemoveDropDowns = () => {
      showModuleDropDown.value = false;
      dropdownIndex.value = -1;
    };

    onMounted(() => {
      if (props.index === 0) {
        ShowModuleBody.value = true;
      }
    });

    return {
      msg,
      ToogleCourseModule,
      ShowModuleBody,
      showModuleDropDown,
      HandleDropDown,
      RemoveDropDowns
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
  min-height: 5rem;
  background: whitesmoke;
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  padding: 0 1%;
  justify-content: space-between;
}

.course-module-header .tittle {
  color: #969696;
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
  position: relative;
}

.course-module-header .icon:hover {
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

.course-module-section-header,
.course-section-item {
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

.dropdowncontainer:hover {
  display: block;
}

.dropdowncontainer {
  display: block;
  position: absolute;
  z-index: 1;
  min-width: 100%;
  padding-left: 6%;
  transition: all 1s;
  color: black;
  top: 100%;
  width: 11rem;
  left: -8.2rem;
}

.course-module-dropdown-drop {
  float: right;
  width: 100%;
  transition: all 0.4s;
  border-radius: 0.8rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 100%;
}

.course-module-dropdown-drop ul li {
  min-height: 2.5em;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  transition: background-color 0.7s ease-out;
  background-color: white;
  padding-left: 10px !important;
  padding: 4%;
  font-size: small;
}

.course-module-dropdown-drop ul hr {
  width: 92%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.course-module-dropdown-drop ul li:hover {
  background: whitesmoke;
}

.course-module-dropdown-drop ul li a {
  padding: 12px 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.course-module-dropdown-drop ul li:nth-child(1) {
  border-top-right-radius: 0.8rem;
  border-top-left-radius: 0.8rem;
  padding-top: 5%;
}

.course-module-dropdown-drop ul li:last-child {
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  color: #bd0000;
}
</style>
