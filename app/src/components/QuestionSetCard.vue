<template>
  <div class="question-card card"
    :class="{'shadow' : showSideBar}"
    v-test="{ id: 'question-set-card-container' }"
    @click="$emit('focusChange')"
  >
    <div class="question-card-inner">
      <div class="question-card-inner-top">
        <span class="question-nr">{{index+1}}</span>
        <div class="question-delete-button"
          @click.stop="$emit('delete', index)"
        >
          <fa icon="minus-square"/>
        </div>
      </div>

      <div class="question-card-question-answer-container">
        <div class="question-answer-inner-container">
          <div class="question-inner question">
            <div class="wordside" style="position: relative;">
              <div class="question-input-container">
                <div class="question-input-inner">
                  <input class="question-input" placeholder="Enter Question">
                </div>
              </div>
            </div>
          </div>
          <div class="question-inner question">
            <div class="wordside" style="position: relative;">
              <div class="question-input-container">
                <div class="question-input-inner">
                  <input class="question-input" placeholder="Enter Answer">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


    <div class="question-card-sideBar"
      v-test="{ id: 'question-set-card-container' }"
      :class="{'showSideBar shadow' : showSideBar}"
    ><ul class="list-unstyled mb-0">
        <li class="add-new-question"
          @click="$emit('AddNew')"
        >
            <fa icon="plus"/>
          <div class="tooltip">
            <span class="tooltiptext">New Question</span>
          </div>
        </li>
        <li :class="{'question-card-questionType' : QuestionType === 0}"
          @click="ChangeQuestionType(0)"
        >
          <fa icon="question"/>
          <div class="tooltip">
            <span class="tooltiptext">Short Text</span>
          </div>
        </li>
         <li :class="{'question-card-questionType' : QuestionType === 1}"
          @click="ChangeQuestionType(1)"
        >
          <fa icon="paragraph"/>
          <div class="tooltip">
            <span class="tooltiptext">Long Text</span>
          </div>
        </li>
         <li :class="{'question-card-questionType' : QuestionType === 2}"
          @click="ChangeQuestionType(2)"
        >
          <fa icon="dot-circle"/>
          <div class="tooltip">
            <span class="tooltiptext">True / False</span>
          </div>
        </li>
         <li :class="{'question-card-questionType' : QuestionType === 3}"
          @click="ChangeQuestionType(3)"
          >
          <fa icon="check-square"/>
          <div class="tooltip">
            <span class="tooltiptext">Multiple Choice</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import Test from "@/directives/test.directive";
export default defineComponent({
  name: "QuestionSetCard",
  directives: {Test},
  props: {
    focus: {
      type: Boolean,
    },
    index: {
      type: Number
    }
  },
  setup(props){
    const showSideBar: Ref<boolean> = ref(props.focus);
    const QuestionType = ref<number>(0);


    const ChangeQuestionType = (newQuestionType: number) => {
      QuestionType.value = newQuestionType
    }

    watch(() => props.focus, (newValue) => {
      showSideBar.value = newValue;
    });

    return {
      showSideBar,
      QuestionType,
      ChangeQuestionType
    }
  }
})
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
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
  transition: all 0.5s;
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
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
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
  color: green ;
}


.question-card-inner {
  border-radius: .5rem;
  position: relative;
}

.question-card-inner-top {
  margin-bottom: 0;
  margin-top: 0;
  padding: .75rem;
  display: flex;
  justify-content: space-between;
  border-bottom: thin #939bb4;
  align-items: center;
}

.question-nr {
  color: #939bb4;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: .0875rem;
  line-height: 1.5;
  width: 2.5rem;
}

.question-delete-button{
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
  padding: .75rem .75rem 1.5rem 4.625rem;
}

.question-answer-inner-container {
  display: table;
  min-height: 3.375rem;
  table-layout: fixed;
  transition: none .3s ease-out;
  transition-property: background;
  width: 100%;
}

.question-inner {
  cursor: text;
  display: table-cell;
  padding-top: .75rem;
  position: relative;
  vertical-align: bottom;
  word-break: break-word;
  z-index: 1;
}

.question {
  padding-left: .75rem;
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
  border-bottom: 1px dotted rgba(245, 245, 245, 0.767);;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgba(245, 245, 245, 0.767);;
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
  border-color: transparent  rgba(245, 245, 245, 0.767) transparent transparent;
}

</style>