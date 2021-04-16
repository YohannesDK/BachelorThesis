<template>
  <div>
        <button @click="toggleOff">click me</button>
          <vue-highcharts v-if="showCharting"
            type="chart"
            :options="chartOptions"
            :redrawOnUpdate="true"
            :oneToOneUpdate="false"
            :animateOnUpdate="true"
            @rendered="onRender"
            @update="onUpdate"
            @destroy="onDestroy"/>

    </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from 'axios';
import {ref, computed, onMounted, onBeforeMount} from 'vue';
import VueHighcharts from "vue3-highcharts"

export default defineComponent({
  name: "chartTest",
  components: {
      VueHighcharts
  },
  data() {
  return {
      showCharting: false,
  };
},  
methods: {
      toggleOff() {
          console.log(this.showCharting)
          this.showCharting = true
          console.log(this.showCharting)
      }
  }
,
  setup() {
      let showChart = true
 

    const dataList = []
    const chartOptions = {
    chart: {
        type: 'scatter',
    },
    title: {
        text: 'Student Data'
    },
    subtitle: {
        text: 'Course: Web Programming 101'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Time'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Score'
        }
    },
    // legend: {
    //     layout: 'vertical',
    //     align: 'left',
    //     verticalAlign: 'top',
    //     x: 100,
    //     y: 70,
    //     floating: true,
    //     backgroundColor: "white",
    //     borderWidth: 1
    // },
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
                pointFormat: '{point.x} Time, {point.y} Score'
            }
        }
    },
    series: dataList


                };




    

    const onRender = () => {
      console.log('Chart rendered');
        console.log(chartOptions)

    };

    const onUpdate = () => {
      console.log('Chart updated');
      console.log(chartOptions.chart)
    };

    const onDestroy = () => {
      console.log('Chart destroyed');
    };


    const initializeChart = () => {
        showChart = false;

        axios
        .get("/api/getAttemptData", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
 
            for(let i = 0; i < response.data.dataList.length; i++){
                dataList.push({
                    name: response.data.dataList[i].Name,
                    data: [[response.data.dataList[i].Time, response.data.dataList[i].Score]]
                    })
            }
            console.log(dataList)




        });

        
    }


    onMounted(() => {
        initializeChart();
        console.log("optionsaa")
    })



    return {
        showChart,
      onRender,
      onUpdate,
      onDestroy,
        title: '',
    chartType: 'Spline',
    seriesColor: '#6fcd98',
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