<template>
  <div class="QuestionSet-container">
    <div class="QuestionSetHeader">
      <div class="container">
        <div class="QuestionSetHeader-header">
          <div class="QuestionSetHeader-Text">
            <div class="QuestionSetHeader-Tittle">
              <span>Create a new Question Set</span>
            </div>
            <div class="QuestionSetHeader-Status">
              <span :class="{ 'text-success': saved, 'text-danger': !saved }">{{
                saved ? "Saved" : "Unsaved"
              }}</span>
            </div>
          </div>
          <button @click="createTFQ()">True False Question</button>
          <div class="QuestionSetHeader-Button">
            <button
              type="button"
              class="btn"
              @click="Save()"
              v-test="{ id: 'qs-SaveBtn' }"
            >
              Save
            </button>
          </div>
        </div>
        <div class="QuestionSetHeader-content">
          <div class="QuestionSetHeader-tittle-input">
            <div class="wordside" style="position:relative;">
              <div class="question-input-container">
                <div class="question-input-inner">
                  <input
                    class="question-input"
                    placeholder="Enter title"
                    v-model="QuestionSetData.Tittle"
                    v-test="{ id: 'qs-Tittle' }"
                    @input="saved = false"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="QuestionSetHeader-tittle-description">
            <div class="wordside" style="position:relative;">
              <div class="question-input-container">
                <div class="question-input-inner">
                  <input
                    class="question-input"
                    placeholder="Enter description"
                    v-model="QuestionSetData.Description"
                    v-test="{ id: 'qs-Desc' }"
                    @input="saved = false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="queston-set-card-container container m-auto d-flex flex-column align-items-center"
      v-test="{ id: 'qs-container' }"
    >
      <question-set-card
        :ref="
          el => {
            questionCards[index] = el;
          }
        "
        v-test="{ id: 'qs-Card' }"
        v-for="(question, index) in QuestionSetData.QuestionSet"
        :key="question"
        :focus="focusIndex === index"
        :index="index"
        :QuestionProp="question"
        @AddNew="OnAddNew()"
        @delete="OnDelete(index)"
        @focusChange="OnfocusChange(index)"
        @questionUpdated="OnUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
// TODO - add animations later - https://codepen.io/Takumari85/pen/RaYwpJ
import {
  computed,
  ComputedRef,
  defineComponent,
  onBeforeUpdate,
  onMounted,
  ref,
  reactive
} from "vue";
import QuestionSetCard from "@/components/QuestionSetCard.vue";
import Test from "@/directives/test.directive";
import router from "@/router";
import store from "@/store";
import {
  Question,
  QuestionSet,
  QuestionTypeEnum,
  QuestionSetFlag
} from "@/store/interfaces/question.type";
import { onBeforeRouteLeave } from "vue-router";
import { day, month, year } from "@/utils/calender.utils";
import { UserType } from "@/store/interfaces/user.types";
import {
  createQuestionSet,
  FetchQS,
  SaveQS,
  UpdateQuestionSet
} from "@/services/api/questionset.service";
export default defineComponent({
  name: "AddNewQuestionSet",
  components: {
    QuestionSetCard
  },
  directives: {
    Test
  },
  setup() {
    const questionCards = ref<Array<any>>([]);
    const questionSetFlag = ref<number>(QuestionSetFlag.CREATE);
    const focusIndex = ref<number>(0);
    const QSID = ref<number>(-1);
    const Tittle = ref<string>("");
    const Desc = ref<string>("");
    const saved = ref<boolean>(true);
    
    const QuestionSetData = ref<QuestionSet>({
      QSID: -1,
      Tittle: "",
      Description: "",
      CreateBy: -1,
      QuestionSet: [] as Question[],
      LastEdited: `${day} ${month} ${year}`,
      DocumentID: [],
      CourseId: []
    });

    const User: ComputedRef<UserType> = computed(
      () => store.getters.getActiveUser
    );

    // to capture updates
    const updatedQuestions: any = {};
    const deletedQuestions: any = {};

    const OnUpdated = (updatedQuestion: Question) => {
      console.log("updated", updatedQuestion)
      saved.value = false;
      if (updatedQuestion.QuestionID !== -1) {
        if (!(updatedQuestion.QuestionID in updatedQuestions)) {
          updatedQuestions[updatedQuestion.QuestionID] = updatedQuestion 
        } 
      }
    }


    // route save guard, if the quesitons are not saved
    const RouteSafeGuards = () => {
      if (window !== null) {
        window.addEventListener("beforeunload", e => {
          if (saved.value === false) {
            e.preventDefault();
            e.returnValue = "you have unsaved work";
          }
        });
      }
    };

    onBeforeRouteLeave((to, from, next) => {
      if (saved.value) {
        next();
      } else {
        const Confirm = confirm("You have unsaved work, are your sure you want to leave? ")
        if (Confirm) {
          saved.value = true;
          next(); 
        }
      }
    });

    onBeforeUpdate(() => {
      questionCards.value = [];
    });

    // Change between question cards
    const OnfocusChange = (index: number) => {
      focusIndex.value = index;
    };


    // #region mutations
    const OnAddNew = () => {
      saved.value = false;
      //Create question in backend
      QuestionSetData.value.QuestionSet.push({
        QuestionID: -1,
        QuestionType: QuestionTypeEnum.ShortText,
        Question: {
          Question: "",
          Answer: {
            id: -1,
            QuestionID: -1, 
            Answer: ""
          }
        }
      });
    };

    const OnDelete = (index: number) => {
      saved.value = false;
      if (index !== 0) {
        // delete from questionCards
        questionCards.value = [
          ...questionCards.value.slice(0, index),
          ...questionCards.value.slice(index + 1)
        ];

        const deletedQuestion: Question = QuestionSetData.value.QuestionSet[index];
        if (deletedQuestion.QuestionID !== -1) {
          // check that it doesnt exists in deletedquestions object
          if (!(deletedQuestion.QuestionID in deletedQuestions)) {
            deletedQuestions[deletedQuestion.QuestionID] = deletedQuestion
          }

          // remove from updated questions, now that its deleted
          if (deletedQuestion.QuestionID in updatedQuestions) {
            delete updatedQuestions[deletedQuestion.QuestionID];
          }
        }

        // delete from questionset
        QuestionSetData.value.QuestionSet = [
          ...QuestionSetData.value.QuestionSet.slice(0, index),
          ...QuestionSetData.value.QuestionSet.slice(index + 1)
        ];
        focusIndex.value = index - 1;
      } else {
        OnfocusChange(0);
      }
    };

    // Initilize Question Set if it exists
    const InitilizeQuestionSet = (QSID: number) => {
      if (QSID !== -1) {
        // we are updating
        questionSetFlag.value = QuestionSetFlag.UPDATE;
        const QuestionSet: QuestionSet = store.getters.getQuestionSetById(QSID);
        if (QuestionSet) {
          QuestionSetData.value.QSID = QuestionSet.QSID;
          QuestionSetData.value.Tittle = QuestionSet.Tittle;
          QuestionSetData.value.CreateBy = QuestionSet.CreateBy;
          QuestionSetData.value.Description = QuestionSet.Description;
          QuestionSetData.value.QuestionSet = QuestionSet.QuestionSet;

          if (QuestionSet.QuestionSet.length === 0) {
            OnAddNew(); 
          }
        }
        return;
      } else {
        //if the QSID is -1, initialize it with an empty question
        QuestionSetData.value.QSID = -1;
        QuestionSetData.value.CreateBy = User.value.UserID;
        OnAddNew();
      }
    };

    const Save = () => {
      // TODO - fix saving doc id later
      // Update document QuestionSetId, and questionst documentid, when saving
      // if (router.currentRoute.value.query.did) {
      //   console.log("saved to " + router.currentRoute.value.query.did);
      //   store.dispatch("SetDocumentQSID", {
      //     documentid: Number(router.currentRoute.value.query.did),
      //     QSID: QuestionSetData.value.QSID
      //   });
      //   QuestionSetData.value.DocumentID.push(Number(router.currentRoute.value.query.did));
      // }

      // To avoid duplactes, when updating question set
      QuestionSetData.value.QuestionSet.length = 0;

      // get all questions
      questionCards.value.forEach((ele: any) => {
        if (ele) {
          try {
            const questionData = ele.QuestionDataHandler.call();
            QuestionSetData.value.QuestionSet.push(questionData);
          } catch (e) {
            // TODO: Error with testing, everything works but when running this in node
            //       it errors out, so i catch for now to avoid nasty output
            return;
          }
        }
      });

      // check once again that user is specified
      if (QuestionSetData.value.CreateBy === -1) {
        QuestionSetData.value.CreateBy = User.value.UserID;
      }

      // check if we are creating or updating so we can call right api
      if (questionSetFlag.value === QuestionSetFlag.CREATE) {
        createQuestionSet(QuestionSetData.value);
      }

      if (questionSetFlag.value === QuestionSetFlag.UPDATE) {
        const EditedData = {
          updatedQuestions: updatedQuestions,
          deletedQuestions: deletedQuestions,
          QuestionSetData: QuestionSetData.value
        }
        UpdateQuestionSet(EditedData);
      }
      saved.value = true;
    };


    onMounted(() => {
      // add window events
      RouteSafeGuards();
      if (router.currentRoute.value.query.QSID) {
        QSID.value = Number(router.currentRoute.value.query.QSID);
      }
      InitilizeQuestionSet(QSID.value);
    });

    return {
      OnAddNew,
      OnDelete,
      questionCards,
      OnfocusChange,
      QSID,
      Save,
      saved,
      Tittle,
      Desc,
      QuestionSetData,
      focusIndex,
      OnUpdated
    };
  }
});
</script>

<style scoped>
body {
  background: whitesmoke;
}

.QuestionSet-container {
  transition: all 1s;
}
.QuestionSetHeader {
  min-height: 40vh;
  background: white;
  border-bottom: 2px solid white;
  padding: 2%;
}

.QuestionSetHeader-header {
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
  height: 4rem;
  height: 6.875rem;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.QuestionSetHeader-header-Text {
  min-width: 14.25rem;
}

.QuestionSetHeader-Tittle {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  margin: 0.25rem 0;
  white-space: nowrap;
}

.QuestionSetHeader-Status {
  color: #939bb4;
  margin: 0.25rem 0;
  font-size: 0.875rem;
  line-height: 1.285714285714286;
  font-weight: 600;
  white-space: nowrap;
}

.queston-set-card-container {
  position: relative;
  top: -2.5rem;
  margin-bottom: 10vh !important;
}

.QuestionSetHeader-Button button {
  background: #60abce;
  color: white;
  min-height: 5vh;
}

.question-input-inner {
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.44444;
}

.question-input {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
  border-left: none;
  border-top: none;
  border-right: none;
  width: 40%;
  margin-bottom: 4%;
  outline: none;
  border-bottom: 2px solid #c7c7c7;
}
</style>
