<template>
  <div class="QuestionTest-container">
    <div class="header-area container ">
      <h1>Practice</h1>
    </div>
    <div class="container">
      <div class="questionset-settings-container row">
        <div class="questionset-inner col-8">
          <div class="col-sm-8">
            <fa icon="info" class="icon" />
            <ul class="list-unstyled">
              <li>
                <div class="li-info">
                  <span>Title</span>
                  <p>{{ Data.Tittle }}</p>
                </div>
              </li>
              <li>
                <div class="li-info">
                  <span>Description</span>
                  <p>{{ Data.Description || "..." }}</p>
                </div>
              </li>
              <li>
                <div class="li-info">
                  <span>Number of Questions</span>
                  <p>{{ Data.QuestionSet.length }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-sm-4">
            <ul class="list-unstyled">
              <li>
                <div class="li-info">
                  <span>Previous Attempt</span>
                  <p>1 / {{ Data.QuestionSet.length }}</p>
                </div>
              </li>
              <li>
                <div class="li-info">
                  <span>Previous Time Used</span>
                  <p>12:23 min</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="settings-inner col-3">
          <div class="settings-nav">
            <fa icon="cog" class="icon" />
            <ul class="list-unstyled settings-list">
              <li
                :class="{ active: settingsOption === 0 }"
                @click="updateSettingsOption(0)"
              >
                Time
              </li>
              <li
                :class="{ active: settingsOption === 1 }"
                @click="updateSettingsOption(1)"
              >
                Answer Options
              </li>
              <li
                :class="{ active: settingsOption === 2 }"
                @click="updateSettingsOption(2)"
              >
                Other
              </li>
            </ul>
          </div>
          <div class="settings-container">
            <div class="timesettings" v-if="settingsOption === 0">
              <!-- Time -->
              Time settings
            </div>

            <div class="answersettings" v-if="settingsOption === 1">
              Answer settings
            </div>
            <div class="othersettings" v-if="settingsOption === 2">
              Other settings
            </div>
          </div>
        </div>
      </div>
      <div class="questionset-settings-container row">
        <div class="button-container">
          <div class="btn shadow-sm bg-success" @click="OpenTest()">Start</div>
          <div class="btn shadow-sm">Reset</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import { QuestionSet, Question } from "@/store/interfaces/question.type";
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "QuestionTest",
  setup() {
    const settingsOption = ref<number>(0);
    const updateSettingsOption = (newsetting: number) => {
      settingsOption.value = newsetting;
    };

    let numOfQuestions = ref<number>(0)

    const Data = ref<QuestionSet>({
      QSID: -1,
      Tittle: "",
      Description: "",
      QuestionSet: [],
      CreateBy: "",
      LastEdited: "",
      DocumentID: [],
      CourseId: []
    });

    const OpenTest = () => {
      router.push({
        name: "TakeTest",
        query: { QSID: router.currentRoute.value.query.QSID }
      });
    };

    const InitilizeDocumet = (QSID: number) => {

      //Fetch QS here
      //Here we need to fetch questionset
            //Get data from backend
      axios
        .get("/api/fetchQS", {
          params: { QSID: router.currentRoute.value.query.QSID }
        })
        .then(response => {
          // Data.value.Tittle = response.data.questionset.title;
          // Data.value.Description = response.data.questionset.description;
          console.log(response)
          //if this questionset has pre-existing questions, fetch them
          Data.value.QSID = response.data.questionset.questionset_id,
          Data.value.Tittle = response.data.questionset.title,
          Data.value.Description = response.data.questionset.description,
          Data.value.LastEdited = response.data.questionset.updatedAt

          for(let i = 0; i < response.data.questions.length; i++){
            Data.value.QuestionSet.push(response.data.questions[i])
          }

          // console.log(response.data.questions.length)

          numOfQuestions = response.data.questions.length
          console.log(Data.value.QuestionSet.length)


        });

          console.log(numOfQuestions)


      // const qs = store.getters.getQuestionSetById(QSID);
      // QuestionSet.value.QSID = qs.QSID;
      // QuestionSet.value.Tittle = qs.Tittle;
      // QuestionSet.value.Description = qs.Description;
      // QuestionSet.value.QuestionSet = qs.QuestionSet;
      // QuestionSet.value.LastEdited = qs.LastEdited;
    };

    onMounted(() => {
      if (router.currentRoute.value.query.QSID) {
        InitilizeDocumet(Number(router.currentRoute.value.query.QSID));
        console.log(store.getters.getAllTestStats);
        return;
      }
      router.push({ name: "PageNotFound" });
    });

    return {
      Data,
      settingsOption,
      updateSettingsOption,
      OpenTest,
      numOfQuestions
    };
  }
});
</script>

<style scoped>
.QuestionTest-container {
  width: 100%;
  padding-top: 5%;
}

.header-area h1 {
  color: grey;
  margin: 0;
  font-size: 2rem;
  white-space: nowrap;
  padding: 0 4%;
}

.questionset-settings-container {
  justify-content: space-between;
  padding: 0 4%;
}

.questionset-inner {
  border: none;
  display: flex;
  flex-direction: row;
  padding-top: 1%;
  position: relative;
}
.settings-inner {
  border: none;
}
.li-info {
  display: flex;
  flex-direction: column;
}

.li-info span {
  font-weight: 600;
}

.button-container-inner {
  padding: 0 1%;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1%;
  padding: 0;
}

.button-container .btn {
  border-radius: 6px;
  background: #4d94b3;
  color: white;
  font-weight: 500;
}
.button-container .btn:last-child {
  margin-left: 1%;
}

.settings-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  position: relative;
}

.icon {
  height: 2rem;
  position: absolute;
  left: -3%;
}
.settings-nav .icon {
  left: -12%;
}

.settings-list {
  display: flex;
  width: 90%;
  overflow-x: scroll;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  margin: 0;
}

.settings-list::-webkit-scrollbar {
  display: none;
}

.settings-list li {
  min-width: 5rem;
  min-height: 2rem;
  max-height: 2rem;
  padding-left: 4%;
  transition: all 0.3s;
  white-space: nowrap;
  display: inline-table;
  padding-right: 4%;
  border-left: 4px solid transparent;
}

.settings-list li:hover {
  background: whitesmoke;
  cursor: pointer;
}

.settings-list li.active {
  border-left: 4px solid grey;
  background: whitesmoke;
}

.settings-container {
  width: 100%;
  height: calc(100% - 5rem);
}
</style>
