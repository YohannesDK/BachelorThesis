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
              <span 
              :class="{'text-success' : saved, 'text-danger' : !saved}"
              >{{ saved ? "Saved" : "Unsaved" }}</span>
            </div>
          </div>
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
                    placeholder="Enter tittle"
                    v-model="Data.Tittle"
                    v-test="{ id: 'qs-Tittle' }"
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
                    v-model="Data.Description"
                    v-test="{ id: 'qs-Desc' }"
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
import { defineComponent, onBeforeUpdate, onMounted, ref } from "vue";
import QuestionSetCard from "@/components/QuestionSetCard.vue";
import Test from "@/directives/test.directive.ts";
import router from "@/router";
import store from "@/store";
import { Question, QuestionSet, QuestionTypeEnum } from "@/store/interfaces/question.type";
import { onBeforeRouteLeave } from "vue-router";
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
    const focusIndex = ref<number>(0);
    const QSID = ref<number>(-1);
    const Tittle = ref<string>("");
    const Desc = ref<string>("");
    const saved = ref<boolean>(true);

    const Data = ref({
      QSID: -1,
      Tittle: "",
      Description: "",
      QuestionSet: [] as Question[]
    });


    // route save guard, if the quesitons are not saved
    const RouteSafeGuards = () => {
      if (window !== null) {
        window.addEventListener('beforeunload', (e) => {
          if (saved.value === false) {
            e.preventDefault()
            e.returnValue = 'you have unsaved work'
          }
        })      
      }
    }
    
    onBeforeRouteLeave((to, from, next) => {
      if (saved.value) {
        next()
      }else {
        alert("You have unsaved work")
      }
    })


    onBeforeUpdate(() => {
      questionCards.value = [];
    });

    const OnAddNew = () => {
      saved.value = false;
      Data.value.QuestionSet.push({
        QuestionID: store.getters.getQuestionId,
        QuestionType: QuestionTypeEnum.ShortText,
        Question: {
          Question: "",
          Answer: ""
        }
      });
      store.dispatch("IncrementQuestionId")
    };


    // Initilize Question Set if it exists
    const InitilizeQuestionSet = (QSID: number) => {
      if (QSID !== -1) {
        const QuestionSet : QuestionSet = store.getters.getQuestionSetById(QSID);
        Data.value.QSID = QuestionSet.QSID
        Data.value.Tittle = QuestionSet.Tittle
        Data.value.Description = QuestionSet.Description
        Data.value.QuestionSet = QuestionSet.QuestionSet

        return;
      }
      // Create first element if QSID is -1
      Data.value.QSID = store.getters.getQuestionSetLength;
      OnAddNew();
    }

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
        focusIndex.value = index-1

      } else {
        OnfocusChange(0);
      }
      
    };

    const Save = () => {
      // Update document QuestionSetId, when saving
      if (router.currentRoute.value.query.did) {
        store.dispatch("SetDocumentQSID", {
          documentid : Number(router.currentRoute.value.query.did),
          QSID: Data.value.QSID
        })
      }
      // To avoid duplactes, when updating question set
      Data.value.QuestionSet.length = 0

      questionCards.value.forEach((ele: any) => {
        if (ele) {
          try {
            const questionData = ele.QuestionDataHandler.call();
            Data.value.QuestionSet.push(questionData);
          } catch (e) {
            // TODO: Error with testing, everything works but when running this in node
            //       it errors out, so i catch for now to avoid nasty output
            console.error("Error: ", e);
          }
          
        }
      }); 
      store.dispatch("AddNewQuestionSet", Data.value);
      saved.value = true;
    };

    onMounted(() => {

      // add window events
      RouteSafeGuards();
      if (router.currentRoute.value.query.QSID) {
        QSID.value = Number(router.currentRoute.value.query.QSID)
      }
      InitilizeQuestionSet(QSID.value)
    })

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
      focusIndex
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
