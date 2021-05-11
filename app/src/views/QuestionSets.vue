<template>
  <div
    class="container d-flex flex-column justify-content-end p-1 align-items-center"
    style="margin-top:3%;"
    v-test="{ id: 'myquestionset-container' }"
  >
    <modal ref="Modal">
      <template v-slot:content="slotProps">
        <attach-document-to-question-set
          :QSID="AttachQSID"
          v-if="slotProps.settings === 0"
        />
      </template>
    </modal>

    <div class="navbar questionnav" style="margin: auto; margin-left:0;">
      <h1 class="questionsetheader">My Question Sets</h1>
      <div
        :class="{ plusicontop: QuestionSets.length > 0 }"
        class="plusicon"
        v-if="QuestionSets.length > 0"
        @click="AddNewQuestionSet"
        v-test="{ id: 'myquestionset-addNewBtn-empty' }"
      >
        <fa icon="plus" />
      </div>
    </div>
    <table
      class="table questionsettable"
      v-test="{ id: 'myquestionset-table' }"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-test="{ id: 'myquestionset-table-headers' }">
            <div class="th-container" @click="updateSortOption(0)">
              <span>Tittle</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 0" icon="caret-down" />
                <fa v-if="sortOptions === 0" icon="caret-up" />
              </div>
            </div>
          </th>
          <th scope="col" v-test="{ id: 'myquestionset-table-headers' }">
            <div class="th-container" @click="updateSortOption(0)">
              <span>Description</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 0" icon="caret-down" />
                <fa v-if="sortOptions === 0" icon="caret-up" />
              </div>
            </div>
          </th>
          <th scope="col" v-test="{ id: 'myquestionset-table-headers' }">
            <div class="th-container" @click="updateSortOption(1)">
              <span>Questions</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 1" icon="caret-down" />
                <fa v-if="sortOptions === 1" icon="caret-up" />
              </div>
            </div>
          </th>
          <th scope="col" v-test="{ id: 'myquestionset-table-headers' }">
            <div class="th-container" @click="updateSortOption(2)">
              <span>Last Edited</span>
              <div class="th-icon-container">
                <fa v-if="sortOptions !== 2" icon="caret-down" />
                <fa v-if="sortOptions === 2" icon="caret-up" />
              </div>
            </div>
          </th>
          <th scope="col" class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-questionsets-row"
          v-for="(questionset, index) in QuestionSets"
          :key="index"
          v-test="{ id: 'myquestionset-table-rows' }"
          @click="OpenQuestionSet(questionset.QSID)"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td v-test="{ id: 'myquestionset-table-rows-data' }">
            {{ questionset.Tittle }}
          </td>
          <td v-test="{ id: 'myquestionset-table-rows-data' }">
            {{
              questionset.Description.substring(0, DescriptionSubstringLength) +
                "..."
            }}
          </td>
          <td v-test="{ id: 'myquestionset-table-rows-data' }">
            {{ questionset.QuestionSet.length }}
          </td>
          <td v-test="{ id: 'myquestionset-table-rows-data' }">
            {{ questionset.LastEdited }}
          </td>
          <td class="d-flex justify-content-end">
            <div
              class="actions-button"
              @click.stop="ShowDropDown(index)"
              @mouseleave="dropdownIndex = -1"
              v-test="{ id: 'myquestionset-dropdown-button' }"
            >
              <fa icon="ellipsis-v" />
              <div
                class="dropdowncontainer"
                v-if="dropdownIndex === index"
                @mouseleave="dropdownIndex = -1"
              >
                <div class="doc-item-more-dropdown shadow-sm">
                  <ul
                    class="list-unstyled mb-0"
                    v-test="{ id: 'myquestionset-options-dropdown' }"
                  >
                    <li
                      @click="OpenQuestionSet(questionset.QSID)"
                      v-test="{ id: 'myquestionset-options-dropdown-items' }"
                    >
                      Open
                    </li>
                    <li v-test="{ id: 'myquestionset-options-dropdown-items' }"
                    @click="NotImplementedAlert()"
                    >
                      Rename
                    </li>
                    <li
                      @click="OpenTest(questionset.QSID)"
                      v-test="{ id: 'myquestionset-options-dropdown-items' }"
                    >
                      Practise
                    </li>
                    <li
                      @click="attachToDocument(questionset.QSID)"
                      v-test="{ id: 'myquestionset-options-dropdown-items' }"
                      v-if="IsTeacher"
                    >
                      Attach Question Set
                    </li>
                    <li v-test="{ id: 'myquestionset-options-dropdown-items' }"
                    @click="NotImplementedAlert()"
                    >
                      Share
                    </li>
                    <hr />
                    <li
                      @click="
                        DeleteQuestionSet(
                          questionset.DocumentID,
                          questionset.QSID
                        )
                      "
                      v-test="{ id: 'myquestionset-options-dropdown-items' }"
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="QuestionSets.length === 0">
          <td colspan="5" style="text-align: center; border-bottom: 0;">
            <div
              class="plusicon"
              @click="AddNewQuestionSet"
              v-test="{ id: 'myquestionset-addNewBtn' }"
            >
              <fa icon="plus" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import Test from "@/directives/test.directive";
import router from "@/router";
import { QuestionSet } from "@/store/interfaces/question.type";
import Modal from "@/components/ModalComponent.vue";
import AttachDocumentToQuestionSet from "@/components/AttachDocumentToQuestionSet.vue";
import AttachCourseToQuestionSetVue from "@/components/AttachCourseToQuestionSet.vue";

export default defineComponent({
  name: "Questions",
  directives: {
    Test
  },
  components: {
    Modal,
    AttachDocumentToQuestionSet,
  },
  setup() {
    const displaytype = ref<string>("");
    const AttachQSID = ref<number>(-1);
    const Modal = ref<any>();
    const DescriptionSubstringLength = 25;
    const questionsetList = ref<any>([]);
    const allQuestionSets = ref<Array<QuestionSet>>(
      store.getters.getAllQuestionSets
    );


    const IsTeacher = computed(() => store.getters.getIsTeacher);

    // drop down logic
    const dropdownIndex = ref<number>(-1);

    const ShowDropDown = (index: number) => {
      dropdownIndex.value = index;
    };

    // sort and show questions sets
    const sortOptions = ref<number>(-1);
    const QuestionSets = computed(() => {
      if (sortOptions.value === -1) {
        return allQuestionSets.value;
      } else if (sortOptions.value === 0) {
        return allQuestionSets.value.sort((a: QuestionSet, b: QuestionSet) =>
          a.Tittle > b.Tittle ? 1 : b.Tittle > a.Tittle ? -1 : 0
        );
      } else if (sortOptions.value === 1) {
        return allQuestionSets.value.sort((a: QuestionSet, b: QuestionSet) =>
          a.QuestionSet.length > b.QuestionSet.length
            ? 1
            : b.QuestionSet.length > a.QuestionSet.length
            ? -1
            : 0
        );
      } else if (sortOptions.value === 2) {
        return allQuestionSets.value.sort((a: QuestionSet, b: QuestionSet) => {
          if (a.LastEdited && b.LastEdited) {
            return a.LastEdited > b.LastEdited
              ? 1
              : b.LastEdited > a.LastEdited
              ? -1
              : 0;
          }
          return 0;
        });
      }
    });
    const updateSortOption = (newoption: number) => {
      if (sortOptions.value === newoption) {
        sortOptions.value = -1;
        return;
      }
      sortOptions.value = newoption;
    };


    // Question set actions
    const AddNewQuestionSet = () => {
      router.push({ name: "AddQuestionSet", query: { QSID: -1 } });
    }


    const OpenQuestionSet = (QSID: number) => {
      router.push({
        name: "AddQuestionSet",
        query: { QSID: QSID }
      });
    };


    const DeleteQuestionSet = (DocumentID: number[], QSID: number) => {
      store.dispatch("DeleteQuestionSet", QSID);
      store.dispatch("DeleteQuestionSetFromAllDocuments", {
        DocumentIds: DocumentID,
        QSID: QSID
      });
    };

    const attachToDocument = (QSID: number) => {
      //remove dropdown
      dropdownIndex.value = -1;

      //give prop right QSID value
      AttachQSID.value = QSID;

      if (Modal.value) {
        try {
          Modal.value.showModal.call();
        } catch (e) {
          return;
          // console.error(e);
        }
      }
    };

    const NotImplementedAlert = () => {
      store.dispatch("NotImplementedAlert");
    }

    const OpenTest = (QSID: number) => {
      router.push({ name: "TakeTest", query: { QSID: QSID } });
    };

    return {
      questionsetList,
      displaytype,
      Modal,
      QuestionSets,
      ShowDropDown,
      dropdownIndex,
      sortOptions,
      updateSortOption,
      DeleteQuestionSet,
      attachToDocument,
      AddNewQuestionSet,
      AttachQSID,
      OpenTest,
      OpenQuestionSet,
      DescriptionSubstringLength,
      allQuestionSets,
      IsTeacher,
      NotImplementedAlert
    };
  }
});
</script>

<style scoped>
.questionnav {
  margin: auto auto auto 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
}

.plusicon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3a7892;
  color: white;
  transition: all 0.3s;
  margin: auto;
  margin-top: 1rem;
}

.plusicon:hover {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
  cursor: pointer;
}

.plusicontop {
  margin: 0 1% 0 0 !important;
}

.questionsetheader {
  color: grey;
  padding-top: 4%;
  margin: 0;
  font-size: 1.8rem;
  /* padding-left: 2%; */
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

.actions-button:hover {
  background-color: whitesmoke;
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
