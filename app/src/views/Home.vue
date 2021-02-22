<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Home Page</h1>
    <document-card :document="document" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocumentCard from "@/components/documentCard.vue";
import store from "@/store";

export default defineComponent({
  name: "Home",
  components: {
    DocumentCard
  },
  setup() {
    const document = store.getters.getDocmentbyId(0);
    return {
      document
    };
  }
});
</script>

DocumentCard
