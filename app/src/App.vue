<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav-bar v-show="showSideBar" @MoveBody="OnMoveBody" />

    <!-- page content -->
    <div
      ref="appContainer"
      :class="{ appFullWidth: showSideBar }"
      class="container-fluid appContainer"
    >
      <router-view />
      <loading-screen v-if="showLoading" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import LoadingScreen from "@/components/LoadingScreen.vue";
import store from "./store";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    LoadingScreen
  },
  setup() {
    const appContainer = ref<HTMLDivElement>();

    const showSideBar = computed(() => {
      return router.currentRoute.value.meta.showSideBar !== false;
    });

    const showLoading = computed(() => {
      return store.getters.getIsLoading === true;
    });

    const OnMoveBody = (showSideBar: boolean, sideBarType?: number) => {
      if (appContainer.value) {
        if (showSideBar) {
          appContainer.value.style.marginLeft = "250px";
        } else {
          if (sideBarType === 0) {
            appContainer.value.style.marginLeft = "0px";
          } else {
            appContainer.value.style.marginLeft = "3.3rem";
          }
        }
      }
    };
    return {
      appContainer,
      showSideBar,
      OnMoveBody,
      showLoading
    };
  }
});
</script>

<style>
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

.container-fluid {
  padding: 0;
}

.appContainer {
  transition: all 0.3s;
}

.appFullWidth {
  margin-left: 250px;
}
</style>
