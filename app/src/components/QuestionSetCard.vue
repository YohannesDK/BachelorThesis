<template>
  <div
    class="question-card card"
    :class="{ shadow: showSideBar }"
    v-test="{ id: 'question-card-container' }"
    @click="$emit('focusChange')"
  >
    <div
      class="question-card-inner"
      v-if="QuestionType === QuestionTypeEnum.ShortText"
      v-test="{ id: 'question-card-type-ShortText' }"
    >
      <div class="question-card-inner-top">
        <span class="question-nr">{{ index + 1 }}</span>
        <div
          class="question-delete-button"
          @click.stop="$emit('delete', index)"
        >
          <fa icon="times" />
        </div>
      </div>
      <div class="question-card-question-answer-container">
        <div class="question-answer-inner-container">
          <div class="question-inner question">
            <div class="wordside" style="position: relative;">
              <div class="question-input-container">
                <div class="question-input-inner">
                  <input
                    class="question-input"
                    placeholder="Enter Question"
                    v-model="Question"
                    v-test="{ id: 'question-card-type-Question' }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="question-inner question">
            <div class="wordside" style="position: relative;">
              <div class="question-input-container">
                <div class="question-input-inner">
                  <input
                    class="question-input"
                    placeholder="Enter Answer"
                    v-model="ShortAnswer"
                    v-test="{ id: 'question-card-type-Answer' }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="question-card-inner"
      v-if="QuestionType === QuestionTypeEnum.LongText"
      v-test="{ id: 'question-card-type-LongText' }"
    >
      <div class="question-card-inner-top">
        <span class="question-nr">{{ index + 1 }}</span>
        <div
          class="question-delete-button"
          @click.stop="$emit('delete', index)"
        >
          <fa icon="times" />
        </div>
      </div>

      <div class="longText-question-container">
        <div class="question-inner question longText-inner">
          <div class="wordside" style="position: relative;">
            <div class="question-input-container">
              <div class="question-input-inner">
                <input
                  class="question-input longText-input"
                  placeholder="Enter Question"
                  v-model="Question"
                  v-test="{ id: 'question-card-type-Question' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="longText-answer-container">
        <div class="question-inner question longText-inner">
          <div class="wordside" style="position: relative;">
            <div class="question-input-container">
              <div class="question-input-inner">
                <textarea
                  class="question-input longText-input longText-textarea"
                  rows="1"
                  placeholder="Enter Answer"
                  v-model="LongTextAnswer"
                  v-test="{ id: 'question-card-type-Answer' }"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="question-card-inner"
      v-if="QuestionType === QuestionTypeEnum.TrueFalse"
      v-test="{ id: 'question-card-type-TrueFalse' }"
    >
      <div class="question-card-inner-top">
        <span class="question-nr">{{ index + 1 }}</span>
        <div
          class="question-delete-button"
          @click.stop="$emit('delete', index)"
        >
          <fa icon="times" />
        </div>
      </div>
      <div class="true-false-question-container">
        <div class="question-inner question longText-inner">
          <div class="wordside" style="position: relative;">
            <div class="question-input-container">
              <div class="question-input-inner">
                <input
                  class="question-input longText-input"
                  placeholder="Enter Statement"
                  v-model="Question"
                  v-test="{ id: 'question-card-type-Question' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="true-false-answer-container">
        <div
          class="true-false-card card"
          :class="{ 'shadow bg-success': TrueFalseAnswer === AnswerOptions.Option1}"
          @click="TrueFalseHandler(AnswerOptions.Option1)"
          v-test="{ id: 'question-card-type-Answer' }"
        >
          {{TrueOption}}
        </div>
        <div
          class="true-false-card card"
          :class="{ 'shadow bg-success': TrueFalseAnswer === AnswerOptions.Option2}"
          @click="TrueFalseHandler(AnswerOptions.Option2)"
          v-test="{ id: 'question-card-type-Answer' }"
        >
          {{FalseOption}}
        </div>
      </div>
    </div>

    <div
      class="question-card-inner"
      v-if="QuestionType === QuestionTypeEnum.MultipleChoice"
      v-test="{ id: 'question-card-type-MultipleChoice' }"
    >
      <div class="question-card-inner-top">
        <span class="question-nr">{{ index + 1 }}</span>
        <div
          class="question-delete-button"
          @click.stop="$emit('delete', index)"
        >
          <fa icon="times" />
        </div>
      </div>
      <div class="true-false-question-container">
        <div class="question-inner question longText-inner">
          <div class="wordside" style="position: relative;">
            <div class="question-input-container">
              <div class="question-input-inner">
                <input
                  class="question-input longText-input"
                  placeholder="Enter Statement"
                  v-model="Question"
                  v-test="{ id: 'question-card-type-Question' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="multiple-choice-answer-container">
        <div class="multiple-choice-tuple">
          <div
            class="true-false-card card"
            :class="{ 'shadow bg-success': MultipleChoiceAnswerID === AnswerOptions.Option1}"
            @click.self="MultipleChoiceHandler(AnswerOptions.Option1)"
            v-test="{ id: 'question-card-type-Answer' }"
          >
            <p contenteditable="true">{{MultipleChoiceAnswerOptions.Option1}}</p>
          </div>
          <div
            class="true-false-card card"
            :class="{ 'shadow bg-success': MultipleChoiceAnswerID === 1 }"
            @click.self="MultipleChoiceHandler(AnswerOptions.Option2)"
            v-test="{ id: 'question-card-type-Answer' }"
          >
            <p contenteditable="true">{{MultipleChoiceAnswerOptions.Option2}}</p>
          </div>
        </div>
        <div class="multiple-choice-tuple">
          <div
            class="true-false-card card"
            :class="{ 'shadow bg-success': MultipleChoiceAnswerID === 2 }"
            @click.self="MultipleChoiceHandler(AnswerOptions.Option3)"
            v-test="{ id: 'question-card-type-Answer' }"
          >
            <p contenteditable="true">{{MultipleChoiceAnswerOptions.Option3}}</p>
          </div>
          <div
            class="true-false-card card"
            :class="{ 'shadow bg-success': MultipleChoiceAnswerID === 3 }"
            @click.self="MultipleChoiceHandler(AnswerOptions.Option4)"
            v-test="{ id: 'question-card-type-Answer' }"
          >
            <p contenteditable="true">{{MultipleChoiceAnswerOptions.Option4}}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="question-card-sideBar"
      v-test="{ id: 'question-card-sideBar' }"
      :class="{ 'showSideBar shadow': showSideBar }"
    >
      <ul class="list-unstyled mb-0">
        <li
          class="add-new-question"
          @click="$emit('AddNew')"
          v-test="{ id: 'question-card-sideBar-option-AddNew' }"
        >
          <fa icon="plus" />
          <div class="tooltip">
            <span class="tooltiptext">New Question</span>
          </div>
        </li>
        <li
          :class="{ 'question-card-questionType': QuestionType === QuestionTypeEnum.ShortText }"
          @click="ChangeQuestionType(QuestionTypeEnum.ShortText)"
          v-test="{ id: 'question-card-sideBar-option-ShortText' }"
        >
          <fa icon="question" />
          <div class="tooltip">
            <span class="tooltiptext">Short Text</span>
          </div>
        </li>
        <li
          :class="{ 'question-card-questionType': QuestionType === QuestionTypeEnum.LongText }"
          @click="ChangeQuestionType(QuestionTypeEnum.LongText)"
          v-test="{ id: 'question-card-sideBar-option-LongText' }"
        >
          <fa icon="paragraph" />
          <div class="tooltip">
            <span class="tooltiptext">Long Text</span>
          </div>
        </li>
        <li
          :class="{ 'question-card-questionType': QuestionType === QuestionTypeEnum.TrueFalse }"
          @click="ChangeQuestionType(QuestionTypeEnum.TrueFalse)"
          v-test="{ id: 'question-card-sideBar-option-TrueFalse' }"
        >
          <fa icon="dot-circle" />
          <div class="tooltip">
            <span class="tooltiptext">True / False</span>
          </div>
        </li>
        <li
          :class="{ 'question-card-questionType': QuestionType === QuestionTypeEnum.MultipleChoice }"
          @click="ChangeQuestionType(QuestionTypeEnum.MultipleChoice)"
          v-test="{ id: 'question-card-sideBar-option-MultipleChoice' }"
        >
          <fa icon="check-square" />
          <div class="tooltip">
            <span class="tooltiptext">Multiple Choice</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref, watch } from "vue";
import Test from "@/directives/test.directive";
import { QuestionTypeEnum, Question, AnswerOptions, ShortTextQuestionType, LongTextQuestionType, TrueFalseQuestionType, MultipleChoiceQuestionType} from "@/store/interfaces/question.type";
import store from "@/store";
export default defineComponent({
  name: "QuestionSetCard",
  directives: { Test },
  props: {
    focus: {
      type: Boolean
    },
    QuestionProp: {
      type: Object as () => Question,
      defailt: () => ({})
    },
    index: {
      type: Number
    }
  },
  setup(props) {
    const QuestionData = {} as Question;
    const showSideBar: Ref<boolean> = ref(props.focus);
    const QuestionType = ref<number>(0);
    
    const Question = ref<string>("");
    const ShortAnswer = ref<string>("");
    const LongTextAnswer = ref<string>("");

    const TrueOption = ref<string>("True");
    const FalseOption = ref<string>("False");
    const TrueFalseAnswer = ref<number>(-1);

    const MultipleChoiceAnswerOptions = ref({
      Option1: "Enter Answer",
      Option2: "Enter Answer",
      Option3: "Enter Answer",
      Option4: "Enter Answer",
    });

    const MultipleChoiceAnswer = ref<string>("");
    const MultipleChoiceAnswerID = ref<number>(-1);
    
    const TrueFalseHandler = (answer: number) => {
      TrueFalseAnswer.value = answer;
    };

    const MultipleChoiceHandler = (
      multipleChoiceAnswerID: number
    ) => {
      MultipleChoiceAnswerID.value = multipleChoiceAnswerID;
    };

    const ChangeQuestionType = (newQuestionType: number) => {
      QuestionType.value = newQuestionType;
    };

    watch(
      () => props.focus,
      newValue => {
        showSideBar.value = newValue;
      }
    );
   
    const QuestionDataHandler = () : Question => {
      if (!props.QuestionProp) {
        QuestionData.QuestionID = store.getters.getQuestionId; 
        store.dispatch("IncrementQuestionId")
      }

      if (QuestionType.value === QuestionTypeEnum.ShortText) {
        QuestionData.QuestionType = QuestionTypeEnum.ShortText;
        const ShortTextQuestion : ShortTextQuestionType = {
          Question: Question.value,
          Answer: ShortAnswer.value
        }
        QuestionData.Question = ShortTextQuestion

      } else if (QuestionType.value === QuestionTypeEnum.LongText) {
        QuestionData.QuestionType = QuestionTypeEnum.LongText;
        const LongTextQuestion : LongTextQuestionType = {
          Question: Question.value,
          Answer: LongTextAnswer.value
        }
        QuestionData.Question = LongTextQuestion

      } else if (QuestionType.value === QuestionTypeEnum.TrueFalse) {
        QuestionData.QuestionType = QuestionTypeEnum.TrueFalse;
        const TrueFalseQuestion : TrueFalseQuestionType = {
          Question: Question.value,
          Answer: {
            TrueOption: TrueOption.value,
            FalseOption: FalseOption.value
          },
          CorrectAnswer: TrueFalseAnswer.value
        }
        QuestionData.Question = TrueFalseQuestion

      } else if (QuestionType.value === QuestionTypeEnum.MultipleChoice) {
        QuestionData.QuestionType = QuestionTypeEnum.MultipleChoice;
        const MutipleChoiceQuestion : MultipleChoiceQuestionType = {
          Question: Question.value,
          Answer: {
            Option1: MultipleChoiceAnswerOptions.value.Option1,
            Option2: MultipleChoiceAnswerOptions.value.Option2,
            Option3: MultipleChoiceAnswerOptions.value.Option3,
            Option4: MultipleChoiceAnswerOptions.value.Option4,
          },
          CorrectAnswer: MultipleChoiceAnswerID.value
        }
        QuestionData.Question = MutipleChoiceQuestion
      }
      return QuestionData
    }

    const getQuestion = () => {
      // Validate input here by calling a validate function

      const data = {
        questionType: QuestionType.value,
        question: Question.value,
        ShortText: {
          answer: ShortAnswer.value
        },
        LongText: {
          answer: LongTextAnswer.value
        },
        TrueFalse: {
          answer: TrueFalseAnswer.value
        },
        MultipleChoice: {
          answerID: MultipleChoiceAnswerID.value,
          answer: MultipleChoiceAnswer.value
        }
      };
      const d = QuestionDataHandler()
      console.log("Handler:", d);
      
      return data;
    };

    const InitilizeQuestion = () => {
      if (props.QuestionProp) {
        console.log("her");
        
        const question = props.QuestionProp;

        QuestionData.QuestionID = question.QuestionID
        Question.value = question.Question.Question
        QuestionType.value = question.QuestionType

        if ( QuestionType.value === QuestionTypeEnum.ShortText) {
          ShortAnswer.value = (question.Question as ShortTextQuestionType).Answer
        }
        else if ( QuestionType.value === QuestionTypeEnum.LongText) {
          LongTextAnswer.value = (question.Question as LongTextQuestionType).Answer
        }
        else if ( QuestionType.value === QuestionTypeEnum.TrueFalse) {
          TrueOption.value = (question.Question as TrueFalseQuestionType).Answer.TrueOption
          FalseOption.value = (question.Question as TrueFalseQuestionType).Answer.FalseOption
          TrueFalseAnswer.value = (question.Question as TrueFalseQuestionType).CorrectAnswer
        }
        else if ( QuestionType.value === QuestionTypeEnum.MultipleChoice) {
          MultipleChoiceAnswerOptions.value.Option1 = (question.Question as MultipleChoiceQuestionType).Answer.Option1
          MultipleChoiceAnswerOptions.value.Option2 = (question.Question as MultipleChoiceQuestionType).Answer.Option2
          MultipleChoiceAnswerOptions.value.Option3 = (question.Question as MultipleChoiceQuestionType).Answer.Option3
          MultipleChoiceAnswerOptions.value.Option4 = (question.Question as MultipleChoiceQuestionType).Answer.Option4
          MultipleChoiceAnswerID.value = (question.Question as MultipleChoiceQuestionType).CorrectAnswer
        }
      }
    }


    onBeforeMount(() => {
      InitilizeQuestion()
    })


    return {
      showSideBar,
      QuestionType,
      ChangeQuestionType,
      Question,
      ShortAnswer,
      LongTextAnswer,
      TrueOption,
      FalseOption,
      TrueFalseAnswer,
      TrueFalseHandler,
      MultipleChoiceAnswerOptions,
      MultipleChoiceHandler,
      MultipleChoiceAnswer,
      MultipleChoiceAnswerID,
      getQuestion,
      QuestionTypeEnum,
      AnswerOptions,
      QuestionDataHandler
    };
  }
});
</script>

<style scoped>
.question-card {
  position: relative;
  border-radius: 0.35rem;
  padding: 1%;
  width: 90%;
  min-height: 160px;
  cursor: pointer;
  margin-bottom: 1%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
  left: -2%;
}

.question-card-sideBar {
  position: absolute;
  width: fit-content;
  top: 0;
  right: -55px;
  border-radius: 0.8rem;
  min-width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(201, 201, 201);
  visibility: hidden;
  opacity: 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
}
.showSideBar {
  visibility: visible;
  opacity: 1;
}

.question-card-sideBar ul {
  width: 100%;
  height: 100%;
}
.question-card-sideBar ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35px;
  border-radius: 50%;
}
.question-card-sideBar ul li:first-child {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.question-card-sideBar ul li:last-child {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.question-card-sideBar ul li:not(:last-child) {
  margin-bottom: 0.6rem;
}

.question-card-sideBar ul li:hover {
  background: rgba(245, 245, 245, 0.767);
  color: black;
}

.question-card-questionType {
  color: black;
}

.question-card-sideBar ul li:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
.question-card-sideBar ul li:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.add-new-question:hover {
  color: green;
}

.question-card-inner {
  border-radius: 0.5rem;
  position: relative;
}

.question-card-inner-top {
  margin-bottom: 0;
  margin-top: 0;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  border-bottom: thin #939bb4;
  align-items: center;
}

.question-nr {
  color: #939bb4;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.0875rem;
  line-height: 1.5;
  width: 2.5rem;
}

.question-delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  color: tomato;
  transition: all 0.3s;
  border-radius: 50%;
  padding: 1%;
  z-index: 2;
}

.question-delete-button:hover {
  background: whitesmoke;
}

.question-card-question-answer-container {
  padding: 0.75rem 0.75rem 1.5rem 4.625rem;
}

.question-answer-inner-container {
  display: table;
  min-height: 3.375rem;
  table-layout: fixed;
  transition: none 0.3s ease-out;
  transition-property: background;
  width: 100%;
}

.question-inner {
  cursor: text;
  display: table-cell;
  padding-top: 0.75rem;
  position: relative;
  vertical-align: bottom;
  word-break: break-word;
  z-index: 1;
}

.question {
  padding-left: 0.75rem;
  padding-right: 1.25rem;
  width: 50%;
}

.question-input-inner {
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.44444;
}

.question-input {
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
  border-left: none;
  border-top: none;
  border-right: none;
  width: 85%;
}

.question-input:focus {
  outline: none;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted rgba(245, 245, 245, 0.767);
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgba(245, 245, 245, 0.767);
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -16px;
  left: 22px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent rgba(245, 245, 245, 0.767) transparent transparent;
}

.longText-question-container,
.longText-answer-container,
.true-false-question-container,
.true-false-answer-container {
  display: flex;
  justify-content: center;
  transition: none 0.3s ease-out;
  transition-property: background;
  width: 100%;
  position: relative;
  top: -2rem;
}

.longText-inner {
  padding: 0;
}

.longText-input {
  width: 100%;
  min-height: 35px;
}

.longText-textarea {
  min-height: 50px;
  max-height: 100px;
  font-size: 1rem;
}

.longText-input::-webkit-scrollbar {
  display: none;
}

.longText-answer-container {
  top: 0;
}

.true-false-answer-container,
.multiple-choice-answer-container {
  display: flex;
  flex: 4 1 0%;
  flex-wrap: wrap;
  height: 100%;
  align-content: flex-start;
  z-index: 1;
  justify-content: space-evenly;
  margin-top: 2%;
}

.true-false-card {
  width: 25%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #60abce;
  color: white;
  font-size: x-large;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  margin: 0.25rem 0;
  white-space: nowrap;
}

.true-false-card p {
  padding: 0;
  margin: 0;
}

.multiple-choice-tuple {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
</style>
