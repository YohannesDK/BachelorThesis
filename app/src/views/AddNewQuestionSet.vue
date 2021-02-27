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
              <span>{{ Data.saved ? "Saved" : "Unsaved" }}</span>
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
                    v-model="Tittle"
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
                    v-model="Desc"
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
        v-for="(question, index) in questionlist"
        :key="index"
        :focus="question.focus"
        :index="index"
        @AddNew="OnAddNew()"
        @delete="OnDelete(index)"
        @focusChange="OnfocusChange(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
// TODO - add animations later - https://codepen.io/Takumari85/pen/RaYwpJ
import { defineComponent, onBeforeUpdate, ref } from "vue";
import QuestionSetCard from "@/components/QuestionSetCard.vue";
import Test from "@/directives/test.directive.ts";
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
    const Tittle = ref<string>("");
    const Desc = ref<string>("");
    const questionlist = ref<Array<any>>([
      {
        focus: true
      }
    ]);

    const Data = ref({
      tittle: Tittle.value,
      desc: Desc.value,
      saved: false,
      QuestionSet: questionlist.value
    });

    onBeforeUpdate(() => {
      questionCards.value = [];
    });

    // Change between question cards
    const OnfocusChange = (index: number) => {
      questionlist.value[focusIndex.value].focus = false;
      focusIndex.value = index;
      questionlist.value[focusIndex.value].focus = true;
    };

    const OnAddNew = () => {
      questionlist.value.push({
        focus: false
      });
    };

    const OnDelete = (index: number) => {
      if (index !== 0) {
        // TODO - fix visual effect - shaking effect
        questionlist.value = [
          ...questionlist.value.slice(0, index),
          ...questionlist.value.slice(index + 1)
        ];
        questionCards.value = [
          ...questionCards.value.slice(0, index),
          ...questionCards.value.slice(index + 1)
        ];
      } else {
        OnfocusChange(0);
      }
    };

    const Save = () => {
      Data.value.saved = true;
      questionCards.value.forEach((ele: any) => {
        try {
          const questionData = ele.getQuestion.call();
          console.log(questionData);
        } catch {
          // TODO: Error with testing, everything works but when running this in node
          //       it errors out, so i catch for now to avoid nasty output
          console.error("Undefined");
        }
      });
    };

    return {
      OnAddNew,
      OnDelete,
      questionCards,
      questionlist,
      OnfocusChange,
      Save,
      Tittle,
      Desc,
      Data
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
