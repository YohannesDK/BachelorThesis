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
      v-if="SelectDocumentID !== -1"
    >
      <h4 class="text-muted mb-3 p-1">
        Topic Times - {{ selectedDocumentName }}
      </h4>
      <vue-highcharts
        v-if="chartOptions.series.length > 0"
        type="chart"
        :options="chartOptions"
        :redrawOnUpdate="true"
        :oneToOneUpdate="false"
        :animateOnUpdate="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from "vue";
import { TopicStatsDocuments } from "@/store/interfaces/topic.stats.types";
import VueHighcharts from "vue3-highcharts";

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
    const UpdateDocumentSelected = (docID: number, docName: string) => {
      SelectDocumentID.value = docID;
      selectedDocumentName.value = docName;
    };

    // sort student times, and set them in groups

    const dataList: any = [
      {
        name: "Time Used",
        data: [40, 20, 10, 34, 23, 34, 32, 66, 10, 45, 23, 22]
      },
      {
        name: "Time Expected",
        data: [20, 20, 30, 53, 23, 34, 32, 66, 10, 45, 23, 22]
      },
      // {
      //   type: "spline",
      //   name: "Average",
      //   data: [32, 12, 32, 23, 44, 54, 23, 54, 23, 23, 4, 2, 21]
      // },
      {
        type: "scatter",
        name: "Students Group 1",
        data: [
          {
            x: 0,
            y: 35,
            name: "Yohannes"
          },
          {
            x: 1,
            y: 24,
            name: "Osama"
          },
          {
            x: 2,
            y: 5,
            name: "Mamma"
          }
        ]
      },
      {
        type: "scatter",
        name: "Students Group 2",
        data: [
          {
            x: 0,
            y: 20,
            name: "Yohannes"
          },
          {
            x: 1,
            y: 44,
            name: "Osama"
          },
          {
            x: 2,
            y: 34,
            name: "Mamma"
          }
        ]
      }
    ];


    const categories: any = [
      "header 1",
      "header 2",
      "header 3",
      "header 4",
      "header 5",
      "header 6",
      "header 7",
      "header 8",
      "header 9",
      "header 11",
      "header 12",
      "header 13"
    ];

    const chartOptions = {
      chart: {
        type: "column"
      },
      title: false,
      xAxis: {
        categories: categories,

        title: {
          text: "Topic"
        }
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: "Time"
          }
        }
      ],
      tooltip: {
        headerFormat: "",
        pointFormat: "Name: <b>{point.name}</b><br/>Time: <b>{point.y}</b>"
      },
      series: dataList
    };
    return {
      chartOptions,
      SelectDocumentID,
      selectedDocumentName,
      UpdateDocumentSelected
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
  background: rgba(173, 216, 230, 0.219);
  /* border: 1px solid whitesmoke; */
}

.document-list li:hover {
  cursor: pointer;
  background: rgba(173, 216, 230, 0.219);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  /* border: 1px solid whitesmoke; */
}

.topic-time-chart-container {
  margin-bottom: 20vh;
}
</style>
