<template>
  <div class="card">
    <form @submit.prevent="addNotes">
      <label>Notes</label>
      <input v-model="note" name="note" />
      <button>Add</button>
    </form>

    <div class="notes-wrapper">
      <div class="notes" v-for="note in notes" v-bind:key="note">
        <h3>{{ note.content }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "card",
  data() {
    return {
      showModal: false
    };
  },
  setup() {
    const note = ref("");
    const notes = ref([]);

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
};
</script>

<style>
body,
html {
  width: 100%;
  overflow-x: hidden;
}
</style>

<style scoped>
button {
  left: 50%;
  margin-left: 1em;
  font-size: 10px;
}

input {
  left: 50%;
  width: 50%;
  margin-left: 1em;
}

form {
  margin-top: 10px;
}

.card {
  opacity: 0.9;
  margin-top: 15em;
  position: relative;
  z-index: 20;
  box-shadow: 3px 3px #888888;
  border-radius: 15px;
  border: grey solid 1px;
  overflow: hidden;
}

img {
  max-height: 50%;
}

.notes-wrapper {
  margin-left: 25%;
  margin-bottom: 2em;
  margin-top: 2em;
  max-width: 100%;

  margin-left: 0;
  min-height: 15vh;

  float: left;
  border-radius: 2%;
  box-shadow: grey 200px;
  z-index: 10;
}

.notes {
  margin: 0.5em;
  float: left;
  max-width: 10vw;
  height: 15vh;
  padding: 0.5em;
  border: 1px solid grey;
  border-radius: 5%;
  overflow-x: scroll;
  font-size: 5px;
}

::-webkit-scrollbar {
  visibility: hidden;
}

::-webkit-scrollbar:hover {
  display: block;
}

::-webkit-scrollbar-track {
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 70px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  height: 80%;
  border-radius: 20px;
  width: 5px;
  background-color: grey;
}

::-webkit-scrollbar-thumb {
  max-height: 50%;
  border-radius: 50px;
  background-color: grey;
}
</style>
