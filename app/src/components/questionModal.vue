<template>
  <!-- This component is just to test modals, need to figure out how to send data from this modal to other components -->

  <div id="modal-wrap">
    <button class="button" @click="showModal = true">
      +
    </button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modall" v-if="showModal">
        <h1>Add Notes</h1>
        <label>Notes</label>
        <!-- <input v-model="note" name="note" />
        <button class="buttonn" @click="addNotes">Add</button>
        <button class="buttonn" @click="showModal = false">Close</button> -->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "questionModal",
  data() {
    return {
      showModal: false
    };
  },
  props: ["noteText"]
};
</script>

<style>
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */

body {
  font-family: "montserrat", sans-serif;
}

h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

#modal-wrap {
  z-index: 999;
  /* position: relative;
    display: flex;
    justify-content: center;
    align-items: center; */

  /* width: 100vw;
    min-height: 100vh; */
  overflow-x: hidden;
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 2px 7px;
  background-image: linear-gradient(to right, #00043fad, #00043fa4);
  border-radius: 100%;
  font-size: 15px;
  color: white;
  font-weight: 300;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}

.buttonn {
  margin-left: 1em;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 5px 5px;
  background-image: linear-gradient(to right, #00043fad, #00043fa4);
  margin-top: 2em;
  border-radius: 100%;
  font-size: 10px;
  color: white;
  font-weight: 300;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  color: rgb(255, 255, 255);
}

.modal-overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
}

.modall {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 16px;

  padding: 25px;
}

.fade-enter-from,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
