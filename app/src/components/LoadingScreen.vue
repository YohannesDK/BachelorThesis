<template>
  <div class="loading-screen">
    <div class="loading-container">
      <div class="loading-content">
        <img src="../assets/AppLogo.svg" alt="logo" class="logo" />
      </div>
      <span class="loading-text">{{ loading }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "loadingScreen",
  setup() {
    const loading = "Loading...";
    return {
      loading
    };
  }
});
</script>

<style scoped>
.logo {
  max-width: 25%;
}
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: whitesmoke;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10000;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-text {
  position: relative;
  top: 7rem;
  text-align: center;
  width: 100%;
  padding-left: 10%;
  font-weight: 600;
  font-size: 1.3rem;
}
.loading-content {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-content::before {
  content: "";
  display: block;
  position: absolute;
  width: 170px;
  height: 170px;
}

.loading-content::before {
  border: 3px solid transparent;
  border-top-color: rgb(12 76 163);
  border-bottom-color: rgb(116 164 52);
  border-radius: 50%;
  -webkit-animation: loader 4s linear infinite;
  -moz-animation: loader 4s linear infinite;
  -o-animation: loader 4s linear infinite;
  animation: loader 4s linear infinite;
}

@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
