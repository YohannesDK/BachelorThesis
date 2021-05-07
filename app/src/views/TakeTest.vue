<template>
  <div
    class="navbar navbar-light shadow mb-3 test-navbar"
    v-test="{ id: 'TakeTest-test-navbar' }"
  >
    <div class="container">
      <span
        class="navbar-brand mb-0 h1 test-tittle"
        v-test="{ id: 'TakeTest-test-navbar-tittle' }"
        >{{ Data.Tittle }}</span
      >
    </div>
  </div>

  <div
    class="container test-container"
    v-test="{ id: 'TakeTest-test-container' }"
  >
    <question-set-card
      v-for="(question, index) in Data.QuestionSet"
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
      v-test="{ id: 'TakeTest-test-questions' }"
    />
  </div>

  <div class="test-sidebar shadow">
    <ul
      class="list-unstyled"
      v-test="{ id: 'TakeTest-test-question-navigation-sidebar' }"
    >
      <li
        v-for="(question, index) in Data.QuestionSet"
        :key="question"
        @click="OnfocusChange(index)"
        :class="{ active: focusIndex === index }"
        v-test="{ id: 'TakeTest-test-question-navigation-sidebar-item' }"
      >
        {{ index + 1 }}
      </li>
    </ul>
  </div>
  <div class="test-info shadow" :class="{ hide: hideInfoBar }">
    <div v-if="hideInfoBar" @click="hideInfoBar = false">
      <fa icon="info" />
    </div>
    <div class="test-info-inner">
      <div class="test-info-nav">
        <div class="close-info" @click="hideInfoBar = true">
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
  <div
    class="test-handin shadow"
    @click="Finished"
    v-test="{ id: 'TakeTest-test-btn-submit' }"
  >
    <fa icon="check" />
    <div class="tooltip">
      <span class="tooltiptext">Finished</span>
    </div>
  </div>
  <div
    class="test-quit shadow"
    @click="Quit"
    v-test="{ id: 'TakeTest-test-btn-quit' }"
  >
    <fa icon="flag" />
    <div class="tooltip">
      <span class="tooltiptext">Quit</span>
    </div>
  </div>
</template>

<script lang="ts">
import QuestionSetCard from "@/components/QuestionSetCard.vue";
import router from "@/router";
import store from "@/store";
import { Question, QuestionTypeEnum, QuestionSetFlag, QuestionSet } from "@/store/interfaces/question.type";
import { ComputedRef, computed , defineComponent, onMounted, ref, Ref } from "vue";
import axios, { AxiosError } from "axios";
import { SingleTestStat, TestData, TestStat } from "@/store/interfaces/QuestionTest.types";
import { date } from "@/utils/calender.utils";
import { UserType } from "@/store/interfaces/user.types";
import Test from "@/directives/test.directive";
import { CreateTestStat } from "@/utils/testStats.utils";
export default defineComponent({
  components: { QuestionSetCard },
  name: "TakeTest",
  directives: {
    Test
  },
  setup() {
    const focusIndex = ref<number>(0);
    const questionCards = ref<Array<any>>([]);
    const hideInfoBar = ref<boolean>(true);

    const user: UserType = store.getters.getActiveUser;

    let counting = true;
    const correct = 0;
    let timer = 0;
    const sortedAnswers = [] as any;

    const Data = ref<QuestionSet>({
      QSID: -1,
      Tittle: "",
      Description: "",
      QuestionSet: [] as Question[],
      CreateBy: -1,
      LastEdited: "",
      DocumentID: [],
      CourseId: []
    });

    const TestData: Ref<TestData> = ref<TestData>({
      TestID: -1,
      userID: -1,
      date: date,
      QSID: -1,
      TestData: []
    });

    const OnfocusChange = (index: number) => {
      focusIndex.value = index;
      try {
        if (questionCards.value[index]) {
          if (Data.value.QuestionSet.length > 3) {
            questionCards.value[index].$el.scrollIntoView({ block: "center" });
          }
        }
      } catch (error) {
        return;
      }
    };

    const delayReturn = () => {
      for(let i = 0; i < TestData.value.TestData.length; i++){

          axios
          .post("/api/storeAttemptData", {
            headers: { token: localStorage.getItem("token") },
            QuestionId: TestData.value.TestData[i].QuestionID,
            Answer: JSON.stringify(TestData.value.TestData[i].Answer),
            CorrectAnswer: JSON.stringify(sortedAnswers[i])
          })
          .then(response => {
            console.log(response)
          });

      }
    };

    //This function is called by the Finished function.
    const checkAnswer = () => {

      let correct = 0;
      const testStat: TestStat[] = store.getters.getAllTestStats;

      if (testStat.length > 0) {
        const latestTestStat: TestStat = testStat[testStat.length - 1];
        const total = Data.value.QuestionSet.length
        
        latestTestStat.TestStats.map((STS: SingleTestStat) => {
          correct += STS.Correct 
          return STS 
        })

        window.alert("You got " + correct + " out of " + total + " correct answers. You spent " + timer + " seconds.");
      }

      // for(let i = 0; i < TestData.value.TestData.length; i++){

      //   console.log(Data.value.QuestionSet[i].Question)

      //   // if(TestData.value.TestData[i].Answer == Data.value.QuestionSet[i].Question.Answer || 
      //   //   TestData.value.TestData[i].Answer == Data.value.QuestionSet[i].Question.CorrectAnswer ){

      //   //     correct++;
      //   //  }
      // }

      // axios
      //   .post("/api/saveAttempt", {
      //     headers: { token: localStorage.getItem("token") },
      //     // @ts-ignore
      //     questionsetId: parseInt(router.currentRoute.value.query.QSID),
      //     Time: timer,
      //     Score: correct
      //   })
      //   .then(response => {
      //     console.log(response)
      //   }).catch((error: AxiosError) => {
      //     console.error(error);
      //   })

    }


    const Finished = () => {
      counting = false;
      questionCards.value.forEach((ele: any) => {
        if (ele) {
          try {
            const testData = ele.getTestData.call();
            TestData.value.TestData.push(testData);
          } catch (e) {
            console.error(e);
          }
        }
      });
      store.dispatch("AddTestData", TestData.value);
      store.dispatch("AddNewTestStat", TestData.value);
      checkAnswer();

      console.log(TestData.value.TestData.length)
      // router.push({ name: "QuestionSets" });
    };

    const Quit = () => {
      const leave = window.confirm("Are you sure you want to quit?");
      if (leave) {
        router.push({ name: "QuestionSets" });
      }
    };

    const InitilizeTest = () => {

      //Sorting the answers from backend to a list
      //Set the counting variable to true upon loading the page.
      //When it is true, the counter starts

      counting = true;
      //Starts timer
      const interval = setInterval(() => {
        if (counting === true) {
          timer++
          console.log(timer)
        } else {
          clearInterval(interval)                
        }             
      }, 1000)

      const QSID = router.currentRoute.value.query.QSID;

      if (QSID) {
        const qs: ComputedRef<QuestionSet> = computed(() => {
          if (router.currentRoute.value.meta.courseQS) {
            const QuestionSetType = router.currentRoute.value.query.QST;

            if (QuestionSetType && Number(QuestionSetType) === 0) {
              return store.getters.getCourseQuestionSetById(Number(QSID));
            } else if (QuestionSetType && Number(QuestionSetType) === 1) {
              return store.getters.getCourseDocumentQuestionSetById(Number(QSID));
            }
          } else {
            return store.getters.getQuestionSetById(
                Number(router.currentRoute.value.query.QSID)
              );
          }
        });

        Data.value.QSID = qs.value.QSID;
        Data.value.Tittle = qs.value.Tittle;
        Data.value.Description = qs.value.Description;
        Data.value.QuestionSet = qs.value.QuestionSet;
      }

      // initilize test data
      if (TestData.value.TestID === -1) {
        TestData.value.TestID = store.getters.getTestID;
        TestData.value.QSID = Data.value.QSID;
        TestData.value.userID = -1;

        store.dispatch("IncrementTestID");
        console.log(TestData)
      }
    };

    onMounted(() => {
      store.dispatch("loading", true);
      setTimeout(() => {
        // TODO
        // while fetching all data, if not in store
        store.dispatch("loading", false);
        InitilizeTest();
      }, 1000);
    });

    return {
      Data,
      focusIndex,
      OnfocusChange,
      questionCards,
      hideInfoBar,
      Finished,
      Quit,
      checkAnswer
    };
  }
});
</script>

<style scoped>
.test-navbar {
  padding: 1% 5%;
  border-bottom: 1px solid lightgray;
  min-height: 10vh;
  max-height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 10;
  width: 100%;
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
  margin-top: 12vh;
}

.question-set-card {
  margin-bottom: 11%;
}

.test-sidebar,
.test-info,
.test-handin,
.test-quit {
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

.test-handin,
.test-quit {
  right: 12%;
  height: 2.6rem;
  width: 2.6rem;
  border-radius: 50%;
  top: 70vh;
  overflow: visible;
}

.test-handin:hover,
.test-quit:hover {
  background: whitesmoke;
  cursor: pointer;
}

.test-quit {
  top: calc(70vh + 3.3rem);
}

.test-handin:hover .tooltip,
.test-quit:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.test-handin:hover .tooltiptext,
.test-quit:hover .tooltiptext {
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

.test-info.hide .test-info-inner {
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
  .test-handin,
  .test-quit {
    right: 8%;
  }
}
</style>
