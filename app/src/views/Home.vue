<template>
  <div class="home">
    <div class="header">
      <h1>Home</h1>
      <br /><br />
      <h4>Febraury 05 2021</h4>
    </div>

    <!-- Card components. Given classnames to customize -->
    <card class="one"></card>
    <card class="two"></card>
    <card class="three"></card>

    <!-- This is just to preview the questionModal component -->
    <question-modal class="test"></question-modal>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import card from "../components/card.vue";
import questionModal from "../components/questionModal.vue";

export default defineComponent({
  name: "Home",
  components: {
    card,
    questionModal
  },

  setup() {
    const note = ref("");
    const notes = ref([]) as any;

    function addNotes() {
      notes.value.push({
        done: false,
        content: note.value
      });
    }

    return {
      notes,
      note,
      addNotes
    };
  }
});
</script>

<style>
body,
html {
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
}
</style>

<style scoped>
img {
  max-height: 50%;
}

h1 {
  color: white;
  float: left;
  font-size: 24px;
}

h4 {
  color: white;
  float: left;
  font-size: 18px;
}

.header {
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  height: 30vh;
  background-color: rgba(7, 0, 26, 0.808);
  background-size: cover;
  z-index: -2;
}

.one {
  overflow-y: scroll;
  max-height: 320px;
}

.two {
  overflow-y: scroll;
  left: -4.5%;
  width: 30%;
  display: inline-block;
  height: 345px;
  margin: 2em;
  padding: 2em;
}

.three {
  overflow-y: scroll;
  display: inline-block;
  left: -3%;
  width: 65%;
  height: 345px;
  margin: 2em;
  margin-right: -7em;
}

.test {
  position: absolute;
  top: 10%;
  left: 50%;
}
</style>
