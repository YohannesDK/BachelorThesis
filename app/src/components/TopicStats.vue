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
        v-if="chartOptions !== -1"
        type="chart"
        :options="chartOptions"
        :redrawOnUpdate="true"
        :oneToOneUpdate="true"
        :animateOnUpdate="true"
      />
    </div>
    <div 
      v-if="SelectDocumentID === -1 || !ChartHasData"
      class="chart-no-data"
    >
      <h3>No Data</h3>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  Ref,
  watch
} from "vue";
import {
  GroupedTopicData,
  TopicStatsDocuments
} from "@/store/interfaces/topic.stats.types";
import VueHighcharts from "vue3-highcharts";
import store from "@/store";

export default defineComponent({
  name: "TopicStats",
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

    const TopicStatData = computed(() => {
      if (SelectDocumentID.value !== -1) {
        return store.getters.getTopicStats(SelectDocumentID.value);
      }
      return -1;
    });

    const ChartConfiguration = {
      chart: {
        type: "column",
        zoomType: 'xy'
      },
      title: false,
      yAxis: [
        {
          min: 0,
          title: {
            text: "Time"
          }
        }
      ],
      plotOptions: {
        column: {
          tooltip: {
            headerFormat: "<b>{point.x}</b><br>",
          }
        },
        scatter: {
          tooltip: {
            headerFormat: "",
            pointFormat: "Name: <b>{point.name}</b><br/>Time: <b>{point.y}</b>"
          }
        }
      },
    };

    const scatterSeries = ref<Array<any>>([
      {
        type: "scatter",
        name: `Student Group 1`,
        data: []
      },
      {
        type: "scatter",
        name: `Student Group 2`,
        data: []
      },
      {
        type: "scatter",
        name: `Student Group 3`,
        data: []
      },
      {
        type: "scatter",
        name: `Student Group 4`,
        data: []
      }
    ]);

    const chartOptions = computed(() => {
      if (TopicStatData.value !== -1) {
        const StudentTopicData: GroupedTopicData[][] =
          TopicStatData.value.StudentGroupsResult;

        StudentTopicData.forEach((g: GroupedTopicData[], index: number) => {
          const scatterData = g.map((g1: GroupedTopicData) => {
            return {
              x: g1.headerIndex, //+ (Math.random() * (0.1 - (-0.1)) + (-0.1)), // add some randomnes so we wont have to mane
                                 // scatter blots placed upon each other
              y: g1.UserStat.Time,
              name: g1.UserStat.Name
            };
          });
          scatterSeries.value[index].data = scatterData;
        });

        
        return {
          ...ChartConfiguration,
          xAxis: {
            categories: TopicStatData.value.TopicHeaders,
            title: {
              text: "Topic"
            }
          },
          series: [
            {
              name: "Time Used",
              data: TopicStatData.value.TimeUsed
            },
            // TODO - find out if this is needed, and how to do it
            // {
            //   name: "Pre-calculted Time",
            //   data: TopicStatData.value.TimeExpected
            // },
            ...scatterSeries.value
          ]
        };
      }
      return -1;
    });

    
    
    const ChartHasData = computed(() => {
      if (TopicStatData.value === -1) {
        return false 
      }
      return TopicStatData.value.TopicHeaders.length > 0
    })


    const UpdateDocumentSelected = (docID: number, docName: string) => {
      scatterSeries.value.forEach(scatterSerie => {
        scatterSerie.data.length = 0;
      });

      SelectDocumentID.value = docID;
      selectedDocumentName.value = docName;
    };

    return {
      chartOptions,
      SelectDocumentID,
      selectedDocumentName,
      UpdateDocumentSelected,
      TopicStatData,
      ChartHasData
    };
  }
});
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
  /* background: rgb(74 104 118); */
  /* border: 1px solid whitesmoke; */
  /* color: white !important; */
}

.document-list li:hover {
  cursor: pointer;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  /* border: 1px solid whitesmoke; */
}

.topic-time-chart-container {
  margin-bottom: 20vh;
}

.chart-no-data {
  display: flex;
  justify-content: center;
  height: 40vh;
}
</style>
