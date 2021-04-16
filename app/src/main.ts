import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import HighChartsVue from 'highcharts-vue';
import VueHighCharts from 'vue3-highcharts';
import { FontAwesomeIcon } from "@/plugins/font-awesome";

axios.defaults.baseURL = "http://localhost:3000";

createApp(App)
  .use(store)
  .use(VueHighCharts)
  .use(VueChartkick as any)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
