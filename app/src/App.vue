<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav-bar />

    <!-- page content -->
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  }
});
</script>

<style>
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}
</style>
