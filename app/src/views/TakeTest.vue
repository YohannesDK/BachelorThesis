<template>
  <div class="navbar navbar-light mb-3 test-navbar">
    <div class="container">
      <span class="navbar-brand mb-0 h1 test-tittle">{{ QuestionSet.Tittle }}</span>
    </div>
  </div>

  <div class="container test-container">
    <question-set-card v-for="(question, index) in QuestionSet.QuestionSet"
    :ref="
          el => {
            questionCards[index] = el;
          }
    "
    :key="question"
    :index="index"
    :focus="focusIndex === index"
    :QuestionProp="question"
    :QuestionCardType="1"
    @focusChange="OnfocusChange(index)"
    class="question-set-card"
    />
  </div>

  <div class="test-sidebar shadow">
    <ul class="list-unstyled">
      <li
      v-for="(question, index) in QuestionSet.QuestionSet" :key="question"
      @click="OnfocusChange(index)"
      :class="{'active' : focusIndex === index}"
      >{{index + 1}}</li>
    </ul>
  </div>
  <div class="test-info shadow"
  :class="{'hide' : hideInfoBar}"
  >
    <div v-if="hideInfoBar"
    @click="hideInfoBar = false"
    >
    <fa icon="info"/>
    </div>
    <div class="test-info-inner">
      <div class="test-info-nav">
        <div class="close-info"
        @click="hideInfoBar = true"
        >
          <fa icon="minus-circle" class="close-minus" />
        </div>
      </div>
      <div class="test-info-data">
        <ul class="list-unstyled">
          <li>Time Remaining</li>
          <li>12:55 min</li>

          <li>Questions Answered</li>
          <li>1 / 12</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="test-handin shadow"
  @click="Finished"
  >
    <fa icon="check" />
    <div class="tooltip">
      <span class="tooltiptext">Finished</span>
    </div>
  </div>
  <div class="test-quit shadow"
  @click="Quit"
  >
    <fa icon="flag" />
    <div class="tooltip">
      <span class="tooltiptext">Quit</span>
    </div>
  </div>
</template>

<script lang="ts">
import QuestionSetCard from '@/components/QuestionSetCard.vue';
import router from '@/router'
import store from '@/store'
import { QuestionSet } from "@/store/interfaces/question.type";
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { TestQuestionAndAnswer, TestData } from "@/store/interfaces/QuestionTest.types";
import { date } from "@/utils/calender.utils";
import { UserType } from '@/store/interfaces/user.types';
export default defineComponent({
  components: { QuestionSetCard },
  name: "TakeTest",
  setup(){
    const focusIndex = ref<number>(0);
    const questionCards = ref<Array<any>>([]);
    const hideInfoBar = ref<boolean>(true);

    const QuestionSet =  ref<QuestionSet>({
      QSID: -1,
      Tittle: "",
      Description: "",
      QuestionSet: [],
      CreateBy: "",
      LastEdited: "",
      DocumentID: [],
      CourseId: []
    })
    
    const TestData: Ref<TestData> = ref<TestData>({
      TestID: -1,
      userName: "",
      date: date,
      QSID: -1,
      TestData: []
    })

    const OnfocusChange = (index: number) => {
      focusIndex.value = index
      try {
        if (questionCards.value[index]) {
          if (QuestionSet.value.QuestionSet.length > 3) {
            questionCards.value[index].$el.scrollIntoView({block: "center"})
          }
        }        
      } catch (error) {
        console.error(error)
      }
    }

    const Finished = () => {
      questionCards.value.forEach((ele: any) => {
        if (ele) {
          try {
            const testData = ele.getTestData.call()
            TestData.value.TestData.push(testData)
          } catch (e) {
            console.error(e)
          }
        }
      })
      console.log(TestData.value);
      store.dispatch("AddTestData", TestData.value)
      router.push({name: "QuestionSets"})    
    }

    const Quit = () => {
      const leave = window.confirm("Are you sure you want to quit?")
      if (leave) {
        router.push({name: "QuestionSets"})    
      }
    }


    const InitilizeTest = () => {
      const user: UserType = store.getters.getActiveUser;
      if (router.currentRoute.value.query.QSID) {
        const qs: QuestionSet = store.getters.getQuestionSetById(Number(router.currentRoute.value.query.QSID))
        QuestionSet.value.QSID = qs.QSID
        QuestionSet.value.Tittle = qs.Tittle
        QuestionSet.value.Description = qs.Description
        QuestionSet.value.QuestionSet = qs.QuestionSet
      }

      // initilize test data
      if (TestData.value.TestID === -1) {
        TestData.value.TestID = store.getters.getTestID;
        TestData.value.QSID = QuestionSet.value.QSID;
        TestData.value.userName = user.UserName;

        store.dispatch("IncrementTestID");
        }
      };

    onMounted(() => {
      store.dispatch("loading", true)
      setTimeout(() => {
        // while fetching all data
        store.dispatch("loading", false)
        InitilizeTest()
        
      }, 1000);
    })

    return {
      QuestionSet,
      focusIndex,
      OnfocusChange,
      questionCards,
      hideInfoBar,
      Finished,
      Quit
    }
  }
})
</script>


<style scoped>
.test-navbar{
  padding: 1% 5%;
  border-bottom: 1px solid lightgray;
  min-height: 10vh;
  max-height: 10vh;
}

.test-navbar .test-tittle {
  font-size: 1.6rem;
}
.test-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 70vh;
}

.question-set-card{
  margin-bottom: 11%;
}

.test-sidebar, .test-info, .test-handin, .test-quit{
  position: fixed;
  right: 15%;
  top: 30vh;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.6rem;
  border-radius: 0.9rem;
  color: rgb(201, 201, 201);
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  transition: all 0.5s;
  overflow: hidden;
}

.test-info {
  right: 2%;
  width: 12%;
  height: calc(50vh - 8rem);
}

.test-info.hide:hover {
  color: black;
  cursor: pointer;
  background: whitesmoke;
}

.test-handin, .test-quit {
  right: 12%;
  height: 2.6rem;
  width: 2.6rem;
  border-radius: 50%;
  top: 70vh;
  overflow: visible;
}

.test-handin:hover, .test-quit:hover {
  background: whitesmoke;
  cursor: pointer;
}

.test-quit {
  top: calc(70vh + 3.3rem);
}

.test-handin:hover .tooltip, .test-quit:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.test-handin:hover .tooltiptext, .test-quit:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}


.test-info-inner {
  display: flex;
  flex-direction: column;
  padding: 1%;
  height: 100%;
  width: 100%;
}


.close-minus {
  float: right;
  padding: 2%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin-right: 2%;
  margin-top: 2%;
}

.close-minus:hover {
  background: whitesmoke;
  cursor: pointer;
}

.test-info.hide {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  right: 12%;
}

.test-info.hide .test-info-inner{
  display: none;
}


.test-sidebar ul {
  padding-top: 1px;
  padding-bottom: 1px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  scrollbar-width: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.test-sidebar ul::-webkit-scrollbar {
  display: none;
}

.test-sidebar ul li {
  min-height: 2.6rem;
  min-width: 2.6rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.test-sidebar ul li:hover {
  background: rgba(245, 245, 245, 0.767);
  color: black;
  cursor: pointer;
}

.test-sidebar ul li.active {
  background: rgba(245, 245, 245, 0.767);
  color: black;
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

@media only screen and (max-width: 1680px) {
  .test-sidebar {
    right: 11%;
  }
  .test-info {
    background: white;
    width: 8%;
  }
  .test-info.hide {
    right: 8%;
  }
  .test-handin, .test-quit {
    right: 8%;
  }
}

</style>


