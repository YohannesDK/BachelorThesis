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
                    v-model="questionSetInfo.title"
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
                    v-model="questionSetInfo.description"
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
        v-for="(question, index) in Data.QuestionSet"
        :key="question"
        :focus="focusIndex === index"
        :index="index"
        :QuestionProp="question"
        @AddNew="OnAddNew()"
        @delete="OnDelete(index)"
        @focusChange="OnfocusChange(index)"
        @SaveStatus="saved = false"
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
import Test from "@/directives/test.directive.ts";
import router from "@/router";
import store from "@/store";
import axios from "axios";
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
  SaveQS
} from "@/services/api/questionset.service";
export default defineComponent({
  name: "AddNewQuestionSet",
  components: {
    QuestionSetCard
  },
  directives: {
    Test
  },
  props: {
    correctAnswer: Number
  },
  setup() {
    const questionCards = ref<Array<any>>([]);
    const questionSetFlag = ref<number>(QuestionSetFlag.CREATE);
    const focusIndex = ref<number>(0);
    const QSID = ref<number>(-1);
    const Tittle = ref<string>("");
    const Desc = ref<string>("");
    const saved = ref<boolean>(true);
    

    const questionSetInfo = reactive({
      title: "",
      description: ""
    });

    const Data = ref<QuestionSet>({
      QSID: -1,
      Tittle: "",
      Description: "",
      CreateBy: "",
      QuestionSet: [] as Question[],
      LastEdited: `${day} ${month} ${year}`,
      DocumentID: [],
      CourseId: []
    });

    const User: ComputedRef<UserType> = computed(
      () => store.getters.getActiveUser
    );
    //This function creates a true/false question type
    const createTFQ = () => {
      axios
        .post("/api/createTFQ", {
          questionsetId: router.currentRoute.value.query.QSID,
          question: "",
          questionType: 2,
          Answers: {
            TrueOption: "True",
            FalseOption: "False"
          },
          CorrectAnswer: 2
        })
        .then(response => {
          console.log(response);

          Data.value.QuestionSet.push({
            QuestionID: response.data.question.question_id,
            QuestionType: response.data.question.question_type,
            Question: {
              Question: response.data.question.question,
              Answer: {
                TrueOption: "True",
                FalseOption: "False"
              },
              CorrectAnswer: 2
            }
          });

          console.log(response.data.question.question_type);
        });
    };

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
        alert("You have unsaved work");
      }
    });

    onBeforeUpdate(() => {
      questionCards.value = [];
    });

    const OnAddNew = () => {
      saved.value = false;
     //Create question in backend
      axios
        .post("api/createQuestion", {
          questionsetId: router.currentRoute.value.query.QSID,
          question: "",
          questionType: 0
        })
        .then(response => {
          Data.value.QuestionSet.push({
            QuestionID: response.data.question.question_id,
            QuestionType: response.data.question.question_type,
            Question: {
              Question: response.data.question.question,
              Answer: ""
            }
          });
          console.log(response.data.question.question_type);
        });
      store.dispatch("IncrementQuestionId");
    };

    // Initilize Question Set if it exists

    // Initilize Question Set if it exists
    const InitilizeQuestionSet = (QSID: number) => {
      //Get data from backend
      axios
        .get("/api/fetchQS", {
          params: { QSID: router.currentRoute.value.query.QSID }
        }) 
        .then(response => {
          console.log(response)
          questionSetInfo.title = response.data.questionset.title;
          questionSetInfo.description = response.data.questionset.description;
          //if this questionset has pre-existing questions, fetch them
          if (response.data.questions.length !== 0) {
            const QuestionSet: QuestionSet = store.getters.getQuestionSetById(
              QSID
            );
            for (let i = 0; i < response.data.questions.length; i++) {
              for(let j = 0; j < response.data.correctAnswer.length; j++) {
                if(response.data.questions[i].question_id == response.data.correctAnswer[j].question_id){
                  Data.value.QuestionSet.push({
                  QuestionID: response.data.questions[i].question_id,
                  QuestionType: response.data.questions[i].question_type,
                  Question: {
                    Question: response.data.questions[i].question,
                    Answer: {
                      TrueOption: "True",
                      FalseOption: "False"
                    },
                    CorrectAnswer: response.data.correctAnswer[j].correct_answer
                  }
                });
                }
              }
              // if (response.data.questions[i].question_type == 2) {
              //   Data.value.QuestionSet.push({
              //     QuestionID: response.data.questions[i].question_id,
              //     QuestionType: response.data.questions[i].question_type,
              //     Question: {
              //       Question: response.data.questions[i].question,
              //       Answer: {
              //         TrueOption: "True",
              //         FalseOption: "False"
              //       },
              //       CorrectAnswer: 2
              //     }
              //   });
              {if(response.data.questions[i].question_type != 2){
                Data.value.QuestionSet.push({
                  QuestionID: response.data.questions[i].question_id,
                  QuestionType: response.data.questions[i].question_type,
                  Question: {
                    Question: response.data.questions[i].question,
                    Answer: ""
                  }
                });
              }
              }
            }
            //Here we set the answer for shortanswer questions (Can also be used to set for longanswer)
            //But it does not work for multiple choice / true false, therefore we have to check for it
            for (let i = 0; i < response.data.questions.length; i++) {
              for (let j = 0; j < response.data.answer.length; j++) {
                if (
                  response.data.questions[i].question_id ==
                  response.data.answer[j].answerset_id &&
                  response.data.questions[i].question_type == 0
                ) {
                  console.log(response.data.answer[j].answer_option);
                  Data.value.QuestionSet[i].Question.Answer =
                  response.data.answer[j].answer_option;
                }
              }
            }
            return;
          } else {
            //if the questionset is empty, initialize it with an empty question
            console.log("hmm");
            OnAddNew();
          }
        });
    };

    // Change between question cards
    const OnfocusChange = (index: number) => {
      focusIndex.value = index;
    };

    const OnDelete = (index: number) => {
      saved.value = false;
      if (index !== 0) {
        // TODO - fix visual effect - shaking effect

        questionCards.value = [
          ...questionCards.value.slice(0, index),
          ...questionCards.value.slice(index + 1)
        ];

        Data.value.QuestionSet = [
          ...Data.value.QuestionSet.slice(0, index),
          ...Data.value.QuestionSet.slice(index + 1)
        ];
        focusIndex.value = index - 1;
      } else {
        OnfocusChange(0);
      }
    };

    const Save = () => {
      // Update document QuestionSetId, and questionst documentid, when saving
      if (router.currentRoute.value.query.did) {
        console.log("saved to " + router.currentRoute.value.query.did);
        store.dispatch("SetDocumentQSID", {
          documentid: Number(router.currentRoute.value.query.did),
          QSID: Data.value.QSID
        });
        Data.value.DocumentID.push(Number(router.currentRoute.value.query.did));
      }

      // To avoid duplactes, when updating question set
      Data.value.QuestionSet.length = 0;

      questionCards.value.forEach((ele: any) => {
        if (ele) {
          try {
            const questionData = ele.QuestionDataHandler.call();
            if(questionData.Question.CorrectAnswer){
               console.log("denne her " + questionData.Question.CorrectAnswer)
            }
            // console.log(questionData.Question.CorrectAnswer)
            //Post request to save the document info
            axios
              .post("api/saveQuestion", {
                question: questionData.Question.Question,
                answer: questionData.Question.Answer,
                title: questionSetInfo.title,
                description: questionSetInfo.description,
                questionId: questionData.QuestionID,
                questionType: questionData.QuestionType,
                answerOption: questionData.Question.Answer,
                correctAnswer: questionData.Question.CorrectAnswer,
                QSID: router.currentRoute.value.query.QSID
              })
              .then(response => {
                console.log("updated");
              });
              Data.value.QuestionSet.push(questionData);
                } catch (e) {
            // TODO: Error with testing, everything works but when running this in node
            //       it errors out, so i catch for now to avoid nasty output
            console.error("Error: ", e);
          }
        }
      });

      // vet ikke om d er best å ha username eller userid, mtp sikkerhet så er d nok bedre med username
      if (Data.value.CreateBy === "") {
        Data.value.CreateBy = User.value.UserName;
      }
      // SaveQS(Data.value, questionSetFlag.value);
      store.dispatch("AddNewQuestionSet", Data.value);
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
      Data,
      focusIndex,
      questionSetInfo,
      createTFQ
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
