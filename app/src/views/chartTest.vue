<template>
  <div>
    <button @click="toggleOff">click me</button>
    <vue-highcharts
      v-if="showCharting"
      type="chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
      @rendered="onRender"
      @update="onUpdate"
      @destroy="onDestroy"
    />
    <line-chart :data="{ '2017-05-13': 2, '2017-05-14': 5 }"></line-chart>
    <column-chart
      :data="[
        ['Sun', 32],
        ['Mon', 46],
        ['Tue', 28]
      ]"
    ></column-chart>
    <div :constructor-type="'stockChart'"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { ref, computed, onMounted, onBeforeMount } from "vue";
import VueHighcharts from "vue3-highcharts";
import { Bar, Line } from "vue-chartjs";
export default defineComponent({
  name: "chartTest",
  extends: Bar,
  components: {
    VueHighcharts
  },
  data() {
    return {
      showCharting: false
    };
  },
  methods: {
    toggleOff() {
      console.log(this.showCharting);
      this.showCharting = true;
      console.log(this.showCharting);
    }
  },
  setup() {
    let showChart = true;

    const dataList = [];
    const chartOptions = {
      chart: {
        type: "spline"
      },
      xAxis: {
        categories: ["Time", "Score"]
      },
      title: {
        text: "Sin chart"
      },
      series: dataList
    };

    const onRender = () => {
      console.log("Chart rendered");
      console.log(chartOptions);
    };

    const onUpdate = () => {
      console.log("Chart updated");
      console.log(chartOptions.chart);
    };

    const onDestroy = () => {
      console.log("Chart destroyed");
    };

    const initializeChart = () => {
      showChart = false;

      axios
        .get("/api/getAttemptData", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          for (let i = 0; i < response.data.dataList.length; i++) {
            dataList.push({
              name: response.data.dataList[i].Name,
              data: [
                response.data.dataList[i].Time,
                response.data.dataList[i].Score
              ]
            });
          }
          console.log(dataList);
        });
    };

    onMounted(() => {
      initializeChart();
      console.log("optionsaa");
    });

    return {
      showChart,
      onRender,
      onUpdate,
      onDestroy,
      title: "",
      chartType: "Spline",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      chartOptions,
      initializeChart
    };
  }
});
</script>

<style scoped>
.vue-highcharts {
  width: 100%;
}
</style>
