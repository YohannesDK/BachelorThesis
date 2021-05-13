<template>
<div class="topic-charts-container mt-5">
  <h4>Select a Document</h4>
  <ul class="document-list list-unstyled">
    <li
      class="shadow-sm text-muted card"
      v-for="doc in TopicStatsDocuments"
      :key="doc"
      :class="{ active: SelectDocumentID === doc.Documentid }"
      @click="UpdateDocumentSelected(doc.Documentid, doc.name)"
    >
      {{ doc.name }}
    </li>
  </ul>

  <div
    class="topic-time-chart-container shadow rounded card p-1"
    v-if="SelectDocumentID !== -1 && ChartHasData"
  >
    <h4 class="text-muted mb-3 p-1">
      Topic Times - {{ selectedDocumentName }}
    </h4>
    <vue-highcharts
      :ref="classChart"
      v-if="chartOptions !== -1"
      type="chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="true"
      :animateOnUpdate="true"
    />
  </div>
  <div 
      v-if="(SelectDocumentID === -1 || !ChartHasData) && !Loading"
      class="chart-no-data"
    >
      <h3>No Data</h3>
    </div>
</div>
</template>

<script lang="ts">
import store from '@/store';
import { TopicStatsDocuments } from '@/store/interfaces/topic.stats.types'
import { computed, defineComponent, PropType, ref, Ref } from 'vue'
import VueHighcharts from "vue3-highcharts";

export default defineComponent({
  name: "ClassStats",
  components: {
    VueHighcharts
  },
  props: {
    TopicStatsDocuments: {
      type: Array as PropType<Array<TopicStatsDocuments>>,
      default: () => []
    }
  },
  setup(props) {
    const SelectDocumentID: Ref<number> = ref(-1);
    const selectedDocumentName: Ref<string> = ref("");

    const classChart = ref(null);

    const TopicUserStasData = computed(() => {
      if (SelectDocumentID.value !== -1) {
        return store.getters.getCourseDocumentUserStats(SelectDocumentID.value) 
      }
      return -1
    })

    const seriesUserData: Ref<Array<any>> = ref([]);

    const ChartConfiguration = {
      chart: {
        type: "bar",
        zoomType: 'xy'
      },
      title: false,
      yAxis: [
        {
          min: 0,
          title: {
            text: "Time (min)"
          }
        }
      ],
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
    };

    const chartOptions = computed(() => {
      if (TopicUserStasData.value !== -1) {
        const TopicHeaders = TopicUserStasData.value.TopicHeaders;
        const InitialUserStats = TopicUserStasData.value.UserStats;

        

        const UserIds = Object.keys(InitialUserStats);
        const seriesdata: Ref<Array<any>> = ref([...seriesUserData.value]);
        UserIds.map((userid: string) => {
          seriesUserData.value.push(InitialUserStats[userid]);
        })



        return {
          ...ChartConfiguration,
          xAxis: {
            categories: TopicHeaders,
            title: {
              text: "Topic"
            }
          },
          series: seriesUserData.value
        };
      }
      return -1;
    });

    const ChartHasData = computed(() => {
      if (TopicUserStasData.value === -1) {
        return false 
      }
      return TopicUserStasData.value.TopicHeaders.length > 0 && Object.keys(TopicUserStasData.value.UserStats).length > 0
    })

    const Loading = ref(false);

    const UpdateDocumentSelected = (docID: number, docName: string) => {
      SelectDocumentID.value = -1;
      Loading.value = true

      setTimeout(() => {
        SelectDocumentID.value = docID;
        selectedDocumentName.value = docName;
        Loading.value = false
      }, 100);

      seriesUserData.value = []
    };
    return {
      UpdateDocumentSelected,
      SelectDocumentID,
      selectedDocumentName,
      chartOptions,
      classChart,
      ChartHasData,
      Loading
    } 
  },
})
</script>

<style scoped>
.document-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-height: 14rem;
  overflow: scroll;
  padding-bottom: 3%;
}

.document-list::-webkit-scrollbar {
  width: 2px;
  height: 0.5rem;
  margin-top: 1%;
}

.document-list::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.document-list li {
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

.document-list li.active {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.document-list li:hover {
  cursor: pointer;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.topic-charts-container {
  min-height: 50vh;
}

.topic-time-chart-container {
  margin-bottom: 20vh;
  transition: all 0.3s;
}

.chart-no-data {
  display: flex;
  justify-content: center;
  height: 40vh;
}
</style>
