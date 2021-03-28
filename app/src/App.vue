<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav-bar v-if="showSideBar" @MoveBody="OnMoveBody" />

    <!-- page content -->
    <div
      ref="appContainer"
      :class="{ appFullWidth: showSideBar }"
      class="container-fluid appContainer"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  },
  setup() {
    const appContainer = ref<HTMLDivElement>();

    const showSideBar = computed(() => {
      return router.currentRoute.value.meta.showSideBar !== false;
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
      OnMoveBody
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
