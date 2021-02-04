<template>

  <div class="wrapper">
    <nav-bar/>

    <!-- page content -->
    <div class="container-fluid">
      <router-view />
      <button type="button" class="btn btn-primary">Primary</button>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
