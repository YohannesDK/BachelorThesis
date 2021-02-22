<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav-bar v-if="showSideBar" />

    <!-- page content -->
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  },
  setup() {
    const showSideBar = computed(() => {
      return router.currentRoute.value.meta.hidesidebar !== false;
    });
    return {
      showSideBar
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
</style>
