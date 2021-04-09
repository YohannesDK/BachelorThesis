<template>
  <div class="assignment-container shadow rounded"
  v-test="{ id: 'assignment-module-container' }"
  >
    <div class="assignment-header" @click="ToogleAssignmentBody()">
      <h3 class="tittle"
        v-test="{ id: 'assignment-module-name' }"
      >{{ Assignment.AssignmentName }}</h3>
      <div class="icon-container">
        <p class="mx-3 mb-0"
        v-test="{ id: 'assignment-module-date' }"
        >Due {{ Assignment.Date }}</p>
        <div class="icon"
          @click.stop="HandleDropDown()"
          @mouseleave="RemoveDropDowns()"
        >
          <fa icon="ellipsis-v" />
          <div class="dropdowncontainer" v-if="showModuleDropDown">
              <div class="course-module-dropdown-drop shadow-sm">
                <ul class="list-unstyled mb-0">
                  <li @click="Edit()">Edit</li>
                  <hr />
                  <li @click="Delete()">Delete</li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div
      class="assignment-body"
      :class="{ showAssignment: ShowAssignmentBody }"
    >
      <div class="assignment-readings"
        v-test="{ id: 'assignment-module-reading-container' }"
      >
        <div class="assignment-readings-header">
          <h4>Reading</h4>
        </div>
        <ul class="list-unstyled assignment-reading-list">
          <li v-for="(read, index) in Assignment.ReadingList" :key="index"
          
            v-test="{ id: 'assignment-module-reading-assignment' }"
          >
            {{ read.ReadingDesc }}
          </li>
        </ul>
      </div>
      <div class="assignment-tests"
        v-test="{ id: 'assignment-module-test-container' }"
      >
        <div class="assignment-tests-header">
          <h4>Tests</h4>
        </div>
        <ul class="list-unstyled assignment-test-list">
          <li v-for="(Test, index) in Assignment.TestList" :key="index"
            v-test="{ id: 'assignment-module-test-assignment' }"
          >
            {{ Test.TestDesc }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AssignmentModule } from "@/store/interfaces/assignments.types";
import Test from "@/directives/test.directive";
export default defineComponent({
  name: "Assignments",
  directives: {
    Test
  },
  props: {
    Assignment: {
      type: Object as () => AssignmentModule,
      default: () => ({})
    }
  },
  emits: ["edit", "delete"],
  setup(props, { emit }) {
    const ShowAssignmentBody = ref(false);
    const showModuleDropDown = ref(false);

    const ToogleAssignmentBody = () => {
      ShowAssignmentBody.value = !ShowAssignmentBody.value;
    };
    const HandleDropDown = (newdropdownIndex = -1) => {
      console.log("her")
      if (newdropdownIndex === -1) {
        showModuleDropDown.value = true;
        return;
      }
    };

    const RemoveDropDowns = () => {
      showModuleDropDown.value = false;
    };

    const Edit = () => {
      if (props.Assignment) {
        emit("edit");
      }
    };

    const Delete = () => {
      if (props.Assignment) {
        emit("delete");
      }
    };

    return {
      ShowAssignmentBody,
      ToogleAssignmentBody,
      showModuleDropDown,
      HandleDropDown,
      RemoveDropDowns,
      Edit,
      Delete
    };
  }
});
</script>

<style scoped>
.assignment-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.assignment-header {
  min-height: 5rem;
  background: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 1%;
  justify-content: space-between;
  color: #969696;
}

.assignment-header:hover {
  cursor: pointer;
}

.icon-container {
  width: fit-content;
  padding-left: 1%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

.icon-container:hover .icon {
  color: rgb(121, 118, 118);
  cursor: pointer;
}

.assignment-body {
  transition: all 0.3s;
  overflow: hidden;
  display: flex;
  max-height: 0;
  min-height: 0;
  overflow: hidden;
  flex-direction: column;
  padding: 0% 1%;
}

.assignment-body.showAssignment {
  max-height: fit-content;
  min-height: 20vh;
  height: fit-content;
}

.assignment-readings-header,
.assignment-tests-header {
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 1% 1%;
}

.assignment-readings-header > h4,
.assignment-tests-header > h4 {
  width: 100%;
  /* border-bottom: 1px solid; */
  padding: 1% 0;
}

.assignment-reading-list,
.assignment-test-list {
  padding: 1% 1%;
}

.assignment-reading-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin-bottom: 1rem;
}

.assignment-test-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin-bottom: 1rem;
}

.dropdowncontainer:hover {
  display: block;
}

.dropdowncontainer {
    display: block;
    position: absolute;
    z-index: 5;
    min-width: 100%;
    padding-left: 6%;
    transition: all 1s;
    color: black;
    top: 1rem;
    width: 7rem;
    left: -5.9rem;
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
