import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@/plugins/font-awesome";

createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
