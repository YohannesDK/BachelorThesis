<template>
  <div class="pagenotfound">
    <img src="../assets/AppLogo.svg" class="logo" />
    <span>Page Not Found</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageNotFound"
});
</script>

<style scoped>
.pagenotfound {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  max-width: 150px;
  margin-bottom: 1%;
}

.pagenotfound span {
  text-align: center;
  width: 100%;
  font-weight: 600;
  font-size: 1.3rem;
}
</style>
