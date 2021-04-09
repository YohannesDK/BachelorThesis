<template>
  <div class="addassignmentmodule-container">
    <div class="row title-container">
      <h2 class="title">{{ Title }}</h2>
      <div class="save-btn-container">
        <div class="save-btn shadow" @click="Save()">
          Save
        </div>
      </div>
    </div>
    <div class="row">
      <div class="addassigmentmodule-module-data">
        <div class="module-name-container">
          <div class="modulename">
            <div class="wordside" style="position: relative;">
              <div class="question-input-container">
                <div class="module-input-inner">
                  <input
                    class="module-input"
                    placeholder="Enter Assignment Name"
                    v-model="assignmentModuleData.AssignmentName"
                  />
                  <input
                    class="module-input date-input"
                    placeholder="dd-mm-yyyy"
                    v-model="assignmentModuleData.Date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-container">
          <h5>Reading</h5>
          <div class="btn-container">
            <input type="text" placeholder="Reading..." v-model="ReadingDesc" />

            <div class="icon-container" @click="AddNewReading()">
              <span>+</span>
            </div>
          </div>
        </div>

        <div class="input-container">
          <h5>Test</h5>
          <div class="btn-container">
            <input type="text" placeholder="Test..." v-model="TestDesc" />
            <div class="icon-container" @click="AddNewTest()">
              <span>+</span>
            </div>
          </div>
        </div>
      </div>

      <div class="addassigmentmodule-module-preview">
        <h5>Reading Preview</h5>
        <div class="reading-preview">
          <ul class="list-unstyled">
            <li
              v-for="(reading, index) in assignmentModuleData.ReadingList"
              :key="reading"
            >
              <span class="desc">
                {{ reading.ReadingDesc }}
              </span>
              <span @click="DeleteReading(index)">x</span>
            </li>
          </ul>
        </div>
        <h5>Test Preview</h5>
        <div class="test-preview">
          <ul class="list-unstyled">
            <li
              v-for="(test, index) in assignmentModuleData.TestList"
              :key="test"
            >
              <span class="desc">
                {{ test.TestDesc }}
              </span>
              <span @click="DeleteTest(index)">x</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import {
  AssignmentModule,
  AssignmentReading,
  AssignmentTest
} from "@/store/interfaces/assignments.types";
import router from "@/router";
import store from "@/store";
export default defineComponent({
  name: "AddAssignmentModule",
  props: {
    AssigmentModuleAction: {
      type: Number,
      default: 0
    },
    AssignmentModule: {
      type: Object as () => AssignmentModule,
      default: () => ({})
    }
  },
  setup(props) {
    const Title = computed(() => {
      if (props.AssigmentModuleAction === 0) {
        return "Add New Assignment Module";
      }
      if (props.AssigmentModuleAction === 1) {
        return "Edit Assignment Module";
      }
    });

    const ReadingDesc = ref("");
    const TestDesc = ref("");

    const assignmentModuleData: Ref<AssignmentModule> = ref({
      AssignmentID: -1,
      courseID: -1,
      AssignmentName: "",
      Date: "",
      ReadingList: [],
      TestList: []
    });

    const AddNewReading = () => {
      if (ReadingDesc.value !== "") {
        const newReading: AssignmentReading = {
          ReadingID: assignmentModuleData.value.ReadingList.length,
          ReadingDesc: ReadingDesc.value
        };
        assignmentModuleData.value.ReadingList.push(newReading);
        ReadingDesc.value = "";
      }
    };

    const AddNewTest = () => {
      if (TestDesc.value !== "") {
        const newTest: AssignmentTest = {
          TestID: assignmentModuleData.value.TestList.length,
          TestDesc: TestDesc.value
        };
        assignmentModuleData.value.TestList.push(newTest);
        TestDesc.value = "";
      }
    };

    const DeleteReading = (readingIndex: number) => {
      try {
        if (readingIndex <= assignmentModuleData.value.ReadingList.length - 1) {
          assignmentModuleData.value.ReadingList.splice(readingIndex, 1);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const DeleteTest = (TestIndex: number) => {
      try {
        if (TestIndex <= assignmentModuleData.value.TestList.length - 1) {
          assignmentModuleData.value.TestList.splice(TestIndex, 1);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const Save = () => {
      if (props.AssigmentModuleAction === 0) {
        store.dispatch("AddNewAssignmentModule", assignmentModuleData.value);
        return;
      }
      if (props.AssigmentModuleAction === 1) {
        store.dispatch("updateAssignmentModule", assignmentModuleData.value);
      }
    };

    const InitilizeAssingmentModule = () => {
      if (props.AssigmentModuleAction === 0) {
        assignmentModuleData.value.courseID = Number(
          router.currentRoute.value.query.cid
        );
        return;
      }
      if (props.AssigmentModuleAction === 1) {
        if (props.AssignmentModule) {
          assignmentModuleData.value = props.AssignmentModule;
        }
      }
    };

    onMounted(() => {
      InitilizeAssingmentModule();
    });

    return {
      Title,
      assignmentModuleData,
      AddNewReading,
      AddNewTest,
      ReadingDesc,
      TestDesc,
      DeleteReading,
      DeleteTest,
      Save
    };
  }
});
</script>

<style scoped>
.addassignmentmodule-container {
  display: flex;
  flex-direction: column;
  width: 93%;
  height: 100%;
  padding: 1%;
  padding-top: 0;
  color: #969696;
}

.title-container {
  justify-content: space-between;
  position: relative;
}

.addassignmentmodule-container .row .title {
  padding: 0;
  border-bottom: 1px solid #777777;
  padding-bottom: 1%;
  width: fit-content;
}

.addassignmentmodule-container .row {
  flex-direction: row;
  width: 100%;
  padding: inherit;
}

.addassigmentmodule-module-data {
  width: 50%;
  padding-left: 1%;
  border-left: 1px solid #969696a9;
  min-height: 20rem;
}

.addassigmentmodule-module-preview {
  width: 50%;
  min-height: 20rem;
  border-left: 1px solid #969696a9;
  position: relative;
}

.input-container {
  padding: 2% 0;
}

.input-container .btn-container {
  display: flex;
}

.btn-container input {
  border: none;
  border-bottom: 1px solid grey;
  margin-right: 4%;
  outline: none;
}

.btn-container input:focus {
  outline: none;
}

.btn-container .icon-container {
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  background: #3a7892;
}

.btn-container .icon-container:hover {
  cursor: pointer;
}

.icon-container span {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  padding-bottom: 14%;
}

.modulename {
  padding-right: 1.25rem;
  width: 100%;
  cursor: text;
  display: table-cell;
  padding-top: 0.75rem;
  position: relative;
  word-break: break-word;
  z-index: 1;
}

.module-input-inner {
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.44444;
  display: flex;
  justify-content: space-between;
}

.module-name-container {
  display: table;
  min-height: 3.375rem;
  table-layout: fixed;
  transition: none 0.3s ease-out;
  transition-property: background;
  width: 100%;
}

.module-input {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
  border-left: none;
  border-top: none;
  border-right: none;
  width: 65%;
}

.module-input.date-input {
  width: 30%;
}

.module-input:focus {
  outline: none;
}

.addassigmentmodule-module-preview ul {
  display: flex;
  width: 100%;
  white-space: nowrap;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  padding: 1% 1%;
  flex-wrap: wrap;
  max-height: 9rem;
  overflow-y: scroll;
}

.addassigmentmodule-module-preview ul::-webkit-scrollbar {
  width: 2px;
  height: 0.3rem;
  margin-top: 1%;
}

.addassigmentmodule-module-preview ul::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.addassigmentmodule-module-preview ul li {
  height: 2.5em;
  border-bottom: 5px solid transparent;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: all 0.3s;
  min-width: max-content;
  width: 100%;
  justify-content: space-between;
  min-width: 25%;
  margin-bottom: 1%;
  max-width: 45%;
  border-bottom: 1px solid transparent;
  margin-right: 3%;
  padding: 0 1%;
  transition: all 0.3s;
}

.addassigmentmodule-module-preview ul li span.desc {
  overflow: hidden;
  max-width: 85%;
}

.addassigmentmodule-module-preview ul li:hover {
  background: whitesmoke;
  cursor: pointer;
}

.save-btn-container {
  width: 8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: 0;
}

.save-btn {
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

.save-btn:hover {
  cursor: pointer;
  background: whitesmoke;
}
</style>
