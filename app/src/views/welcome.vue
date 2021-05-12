<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a href="" class="navbar-brand d-flex justify-content-between"
        >BrandName</a
      >
      <button
        class="navbar-toggler collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample07XL"
        aria-controls="navbarsExample07XL"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse nav-ul-container">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <span>Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <span>Register</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <span>Login</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <h1>welcome Page</h1>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Welcome",
  setup() {
    store.dispatch("loading", false);
    return {};
  }
});
</script>

<style scoped>
.nav-ul-container {
  width: fit-content;
}
</style>
