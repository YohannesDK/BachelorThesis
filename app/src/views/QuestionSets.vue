<template>
  <div class="container">
    <h1>Question set</h1>
    <table class="table questionsettable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"
          ><span>Tittle</span> <fa icon="caret-down"/></th>
          <th scope="col">Questios <fa icon="caret-down"/></th>
          <th scope="col">Last Edited <fa icon="caret-down"/></th>
          <th scope="col" class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-questionsets-row" v-for="(questionset, index) in QuestionSets" :key="index"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ questionset.Tittle }}</td>
          <td>{{ questionset.QuestionSet.length }}</td>
          <td>{{ questionset.LastEdited }}</td>
          <td class="d-flex justify-content-end"
          >
            <div class="actions-button"
            @click="ShowDropDown(index)"
            @mouseleave="dropdownIndex = -1"
            >
              <fa icon="ellipsis-v" />
              <div class="dropdowncontainer"
              v-if="dropdownIndex === index"
              @mouseleave="dropdownIndex = -1"
              >
                <div class="doc-item-more-dropdown shadow-sm">
                  <ul
                    class="list-unstyled mb-0"
                    v-test="{ id: 'card-options-dropdown' }"
                  >
                    <li
                    @click="OpenQuestionSet(questionset.QSID)"
                    >Open</li>
                    <li>Rename</li>
                    <li>Share</li>
                    <hr />
                    <li>Delete</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <!-- <h1 v-if="QuestionSets.length === 0" class="m-auto">No Question Sets</h1> -->
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import store from "@/store";
import Test from "@/directives/test.directive";
import router from '@/router';

export default defineComponent({
  name: "Questions",
  directives: {
    Test
  },
  setup() {
    const QuestionSets = computed(() => store.getters.getAllQuestionSets);
    const dropdownIndex = ref<number>(-1);

    const ShowDropDown = (index: number ) => {
      dropdownIndex.value = index;
    }
    const OpenQuestionSet = (QSID: number) => {
      router.push({
        name: "AddQuestionSet",
        query: { QSID: QSID}
      });
    };
    return {
      QuestionSets,
      ShowDropDown,
      dropdownIndex,
      OpenQuestionSet
    }
  }
})
</script>

<style scoped>
.col-action {
  text-align: right;
}

.actions-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: relative;
}

.actions-button:hover{
  background-color: whitesmoke;
}

.questionsettable{
  vertical-align: -webkit-baseline-middle;
  vertical-align: baseline;
  vertical-align: -moz-baseline;
}

.questionsettable thead th {
  /* display: flex; */
  justify-content: space-between;
}
.questionsettable thead th:hover {
  background-color: whitesmoke;
  cursor: pointer;
}

.table-questionsets-row{
  transition: all 0.3s;
}

.table-questionsets-row:hover {
  background-color: rgba(229, 231, 238, 0.514);
  cursor: pointer;
}

.questionsettable .dropdowncontainer {
  display: block;
  position: absolute;
  z-index: 1;
  min-width: 100%;
  padding-left: 6%;
  transition: all 1s;
  color: black;
  top: 64%;
  width: 10vw;
  left: 11%;
  z-index: 2;
}

.dropdowncontainer:hover {
  display: block;
}

.doc-item-more-dropdown {
  float: right;
  width: 100%;
  transition: all 0.4s;
  border-radius: 0.8rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 100%;
}

.doc-item-more-dropdown ul li {
  min-height: 2.5em;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  transition: background-color 0.7s ease-out;
  background-color: white;
  padding-left: 10px !important;
  padding: 4%;
}

.doc-item-more-dropdown ul hr {
  width: 92%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.doc-item-more-dropdown ul li:hover {
  background: whitesmoke;
}

.doc-item-more-dropdown ul li a {
  padding: 12px 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.doc-item-more-dropdown ul li:nth-child(1) {
  border-top-right-radius: 0.8rem;
  border-top-left-radius: 0.8rem;
  padding-top: 5%;
}

.doc-item-more-dropdown ul li:last-child {
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  color: #bd0000;
}

</style>
