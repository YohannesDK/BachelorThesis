<template>
  <div class="assignment-container shadow-sm">
    <div class="assignment-header" @click="ToogleAssignmentBody()">
      <h3>{{ Assignment.AssignmentName }}</h3>
      <div class="icon-container">
        <p class="mx-3 mb-0">Due {{ Assignment.Date }}</p>
        <div class="icon">
          <fa icon="ellipsis-v" />
        </div>
      </div>
    </div>
    <div
      class="assignment-body"
      :class="{ showAssignment: ShowAssignmentBody }"
    >
      <div class="assignment-readings">
        <div class="assignment-readings-header">
          <h4>Reading</h4>
        </div>
        <ul class="list-unstyled assignment-reading-list">
          <li v-for="(read, index) in Assignment.ReadingList" :key="index">
            {{ read.ReadingDesc }}
          </li>
        </ul>
      </div>
      <div class="assignment-tests">
        <div class="assignment-tests-header">
          <h4>Tests</h4>
        </div>
        <ul class="list-unstyled assignment-test-list">
          <li v-for="(Test, index) in Assignment.TestList" :key="index">
            {{ Test.QSID }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AssignmentModule } from "@/store/interfaces/assignments.types";
export default defineComponent({
  name: "Assignments",
  props: {
    Assignment: {
      type: Object as () => AssignmentModule,
      default: () => ({})
    }
  },
  setup() {
    const ShowAssignmentBody = ref(false);

    const ToogleAssignmentBody = () => {
      ShowAssignmentBody.value = !ShowAssignmentBody.value;
    };

    return {
      ShowAssignmentBody,
      ToogleAssignmentBody
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
</style>
