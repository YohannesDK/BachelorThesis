<template>
  <div class="questionset-charts-container mt-5">
    <h4>Select a Questionset</h4>
    <ul class="questionset-list list-unstyled">
      <li
        class="shadow-sm text-muted card"
        v-for="qs in QuestionSetStatsProp"
        :key="qs"
        :class="{ active: SelectedQuestionSetID === qs.QSID }"
        @click="UpdateQuestionSetSelected(qs.QSID, qs.Tittle)"
      >
        {{ qs.Tittle }}
      </li>
    </ul>

    <div
      class="topic-time-chart-container shadow rounded card p-1"
      v-if="SelectDocumentID !== -1"
    >
      <h4 class="text-muted mb-3 p-1">
        Questionset Stats - {{ SelectedQuestionSetName }}
      </h4>
      <vue-highcharts
        v-if="chartOptions !== -1"
        type="chart"
        :options="chartOptions"
        :redrawOnUpdate="true"
        :oneToOneUpdate="true"
        :animateOnUpdate="true"
      />
    </div>
  </div>

</template>

<script lang="ts">
import store from '@/store'
import { QuestionSet } from '@/store/interfaces/question.type'
import { QuestionSetStats } from "@/store/interfaces/QuestionSet.stats.types";
import { defineComponent, ref, PropType, computed } from 'vue'
import VueHighcharts from "vue3-highcharts";

export default defineComponent({
  name: "QuestionSets",
  components: {
    VueHighcharts
  },
  props: {
    QuestionSetStatsProp: {
      type: Array as PropType<Array<QuestionSetStats>>,
      default: () => []
    }
  },
  setup() {
    const QuestionSets: QuestionSet[] = store.getters.getAllCourseQuestionSets;
    const SelectedQuestionSetID = ref(-1);
    const SelectedQuestionSetName  = ref("");

    const QuestionSetStatData = computed(() => {
      if (SelectedQuestionSetID.value !== -1) {
        return 1; 
      }
      return -1
    })


    const ChartConfiguration = {
      chart: {
        type: "scatter",
        zoomType: 'xy'
      },
      title: false,
      xAxis: {
        title: {
          enabled: true,
          text: 'Score (%)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: "Time (sec)"
        }
      },
      plotOptions: {
        scatter: {
          marker: {
              radius: 5,
              states: {
                  hover: {
                      enabled: true,
                      lineColor: 'rgb(100,100,100)'
                  }
              }
          },
          states: {
              hover: {
                  marker: {
                      enabled: false
                  }
              }
          },
          tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: 'Name: {point.name}<br>Score: {point.x} %<br>Time: {point.y} sec'
          }
        }
      }
    }

    const scatterSerie = ref({
      name: "Students",
      color: "rgba(223, 83, 83, .5)",
      data: [{
        name: "Yohannes",
        x: 10,
        y: 40
      }]
    });

    const chartOptions = computed(() => {
      if (QuestionSetStatData.value !== -1) {
        
        return {
          ...ChartConfiguration,
          series: [scatterSerie.value]
        }
      }
      return -1
    })


    const UpdateQuestionSetSelected = (QSID: number, name: string) => {
      SelectedQuestionSetID.value = QSID;
      SelectedQuestionSetName.value = name;
    }

    return {
      QuestionSets,
      SelectedQuestionSetID,
      SelectedQuestionSetName,
      UpdateQuestionSetSelected,
      chartOptions
    }
  },
})
</script>


<style scoped>
.questionset-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-height: 14rem;
  overflow: scroll;
  padding-bottom: 3%;
}

.questionset-list::-webkit-scrollbar {
  width: 2px;
  height: 0.5rem;
  margin-top: 1%;
}

.questionset-list::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.questionset-list li {
  height: 3rem;
  margin-right: 1%;
  margin-top: 1%;
  /* border: 1px solid whitesmoke; */
  max-width: 50%;
  min-width: 23%;
  transition: all 0.3s;
  padding: 1%;
  border-color: whitesmoke;
}

.questionset-list li.active {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  /* background: rgb(74 104 118); */
  /* border: 1px solid whitesmoke; */
  /* color: white !important; */
}

.questionset-list li:hover {
  cursor: pointer;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  /* border: 1px solid whitesmoke; */
}

.questionset-charts-container {
  margin-bottom: 20vh;
}
</style>
