<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav-bar v-show="showSideBar" @MoveBody="OnMoveBody" />

    <!-- page content -->
    <div
      ref="appContainer"
      :class="{ appFullWidth: showSideBar, loading: showLoading }"
      class="container-fluid appContainer"
    >
      <router-view />
      <loading-screen v-if="showLoading" />
      <div class="app-alert-container">
        <alert-component 
        v-for="alert in alertMessages"
        :key="alert"
        :AlertMessage="alert.message" 
        :ShowAlert="!alert.shown"
        :AlertType="alert.type"
        :AlertID="alert.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import LoadingScreen from "@/components/LoadingScreen.vue";
import store from "./store";
import AlertComponent from "./components/alertComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    LoadingScreen,
    AlertComponent
  },
  setup() {
    const appContainer = ref<HTMLDivElement>();

    const showSideBar = computed(() => {
      return router.currentRoute.value.meta.showSideBar !== false;
    });

    const showLoading = computed(() => {
      return store.getters.getIsLoading === true;
    });

    const currentRouteName = computed(() => {
      return router.currentRoute.value.name;
    });

    const OnMoveBody = (showSideBar: boolean, sideBarType?: number) => {
      if (appContainer.value) {
        if (showSideBar) {
          appContainer.value.style.marginLeft = "250px";
          appContainer.value.style.maxWidth = "calc(100% - 250px)";
        } else {
          // TODO - fix this navbar shit
          if (sideBarType === 0) {
            appContainer.value.style.marginLeft = "0px";
            appContainer.value.style.maxWidth = "100%";
          } else {
            appContainer.value.style.marginLeft = "3.3rem";
            appContainer.value.style.maxWidth = "calc(100% - 3.3rem)";
          }
        }
      }
    };

    const alertMessages = computed(() => {
      return store.getters.getAlertMessages;
    })

    // TODO - fix this navbar shit
    computed(() => {
      if (appContainer.value) {
        if (currentRouteName.value === "TakeTest") {
          appContainer.value.style.marginLeft = "0px";
        }
      }
    });
    return {
      appContainer,
      showSideBar,
      OnMoveBody,
      showLoading,
      alertMessages
    };
  }
});
</script>

<style>
@import "./assets/css/editor.css";
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

.container-fluid {
  padding: 0;
}

body::-webkit-scrollbar{
  width: 0.8rem;
}

body::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.appContainer {
  z-index: 0;
}


.appContainer.loading {
  z-index: 1;
}

.appFullWidth {
  margin-left: 250px;
  max-width: calc(100% - 250px);
}

.app-alert-container {
  position: fixed;
  display: flex;
  width: 100%;
  flex-direction: column;
  top: 0;
  padding-top: 1%
}
</style>
