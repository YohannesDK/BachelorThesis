<template>
  <div class="container d-flex flex-column justify-content-end p-1 align-items-center"
  style="margin-top:3%;"
  >
    <div class="navbar" style="margin: auto; margin-left:0;">
      <h1 class="questionsetheader">My Question Sets</h1>
    </div>
    <table class="table questionsettable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"
          >
            <div class="th-container"
            @click="updateSortOption(0)"
            :class="{'sortactive' : sortOptions === 0}"
            >
              <span>Tittle</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 0" icon="caret-down"/>
                <fa v-if="sortOptions === 0" icon="caret-up"/>
              </div>
            </div>
          </th>
          <th scope="col"
          >
            <div class="th-container"
            @click="updateSortOption(1)"
            :class="{'sortactive' : sortOptions === 1}"
            >
              <span>Questions</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 1" icon="caret-down"/>
                <fa v-if="sortOptions === 1" icon="caret-up"/>
              </div>
            </div>
          </th>
          <th scope="col"
          >
            <div class="th-container"
            @click="updateSortOption(2)"
            :class="{'sortactive' : sortOptions === 2}"
            >
              <span>Last Edited</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 2" icon="caret-down"/>
                <fa v-if="sortOptions === 2" icon="caret-up"/>
              </div>
            </div>
          </th>
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
                    <li
                    @click="DeleteQuestionSet(questionset.QSID)"
                    >Delete</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="QuestionSets.length === 0">
          <td colspan="4" style="text-align: center; border-bottom: 0;">
            <h1 class="m-auto">No Question Sets</h1>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import store from "@/store";
import Test from "@/directives/test.directive";
import router from '@/router';
import { QuestionSet } from '@/store/interfaces/question.type';

export default defineComponent({
  name: "Questions",
  directives: {
    Test
  },
  setup() {
    const sortOptions = ref<number>(-1);

    const QuestionSets = computed(() => {
      if (sortOptions.value === -1) {
        return store.getters.getAllQuestionSets
      }
      else if (sortOptions.value === 0) {
        return store.getters.getAllQuestionSets.
          sort((a:QuestionSet, b: QuestionSet) => (a.Tittle > b.Tittle) ? 1 : (b.Tittle > a.Tittle) ? -1 : 0)
      }
      else if (sortOptions.value === 1) {
        return store.getters.getAllQuestionSets.
          sort((a:QuestionSet, b: QuestionSet) => (a.QuestionSet.length > b.QuestionSet.length) ? 1 : (b.QuestionSet.length > a.QuestionSet.length) ? -1 : 0)
      } else if (sortOptions.value === 2){
        
        return store.getters.getAllQuestionSets.
          sort((a:QuestionSet, b: QuestionSet) => {
            if (a.LastEdited && b.LastEdited) {
              return (a.LastEdited > b.LastEdited) ? 1 : (b.LastEdited > a.LastEdited) ? -1 : 0
            }
          })
      }

    });

    const updateSortOption = (newoption: number) => {
      if (sortOptions.value === newoption) {
        sortOptions.value = -1 
        return;
      }
      sortOptions.value = newoption
    }

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

    const DeleteQuestionSet = (QSID: number) => {
      store.dispatch("DeleteQuestionSet", QSID)
      store.dispatch("DeleteQuestionSetFromDocument", QSID)
    }
    return {
      QuestionSets,
      ShowDropDown,
      dropdownIndex,
      OpenQuestionSet,
      sortOptions,
      updateSortOption,
      DeleteQuestionSet
    }
  }
})
</script>

<style scoped>

.questionsetheader{
  color: grey;
  padding-top: 4%;
  margin: 0;
  font-size: 1.8rem;
  padding-left: 2%;
  white-space: nowrap;
}

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

.questionsettable th {
  /* padding-bottom: 0; */
}

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

.sortactive {
  background-color: rgba(229, 231, 238, 0.514);
  text-decoration: underline;
  border-bottom: 1px solid rgba(229, 231, 238, 0.514);
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
  top: 76%;
  width: 8vw;
  right: 20%;
  z-index: 2;
  font-size: 0.8rem;
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
