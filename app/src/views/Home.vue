<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Home Page</h1>
    <document-card/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocumentCard from "@/components/documentCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    DocumentCard
  },
  setup() {
    console.log(process.env.NODE_ENV);
  }
});
</script>

    DocumentCard