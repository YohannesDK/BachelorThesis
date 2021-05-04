<template>
  <div class="ahha shadow rounded card p-1 mt-5">
    <h4 class="text-muted mb-3 p-1">Topic Times</h4>
    <vue-highcharts
        type="chart"
        :options="chartOptions"
        :redrawOnUpdate="true"
        :oneToOneUpdate="false"
        :animateOnUpdate="true"
      />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueHighcharts from "vue3-highcharts";

export default defineComponent({
  name: "TopicStats",
  components: {
    VueHighcharts
  },
  setup() {
    const msg = "Topic Stat"

    // sort student times, and set them in groups

    const dataList : any = [
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
        data: [{
          x: 0,
          y: 35,
          name: "Yohannes"
        }, {
          x: 1,
          y: 24,
          name: "Osama"
        }, {
          x: 2,
          y: 5,
          name: "Mamma"
        }],
        
      },
            {
        type: "scatter",
        name: "Students Group 2",
        data: [{
          x: 0,
          y: 20,
          name: "Yohannes"
        }, {
          x: 1,
          y: 44,
          name: "Osama"
        }, {
          x: 2,
          y: 34,
          name: "Mamma"
        }],
        
      },
    ]
    
    const categories : any = ["header 1", "header 2", "header 3", "header 4", "header 5", "header 6", "header 7", "header 8", "header 9",
    "header 11", "header 12", "header 13"
    ]

    const chartOptions = {
      chart: {
        type: "column"
      },
      title: false,
      xAxis: {
        categories: categories,
        title: "Topic"
      },
      yAxis: [{
        min: 0,
        title: "Time"
      }],
      tooltip: {
        headerFormat: '',
        pointFormat: 'Name: <b>{point.name}</b><br/>Time: <b>{point.y}</b>'
      },
      series: dataList
    }
    return {
      msg,
      chartOptions
    }
  }
})
</script>

<style scoped>
.ahha {
  margin-bottom: 20vh;
}
</style>