<template>
  <div v-if="show" class="modal" @click.self="closeModal">
    <!-- Modal content -->
    <div class="modal-content container d-flex flex-column card">
      <div class="modal-close navbar navbar-expand-lg">
        <div class="close" @click="closeModal">
          <fa icon="times" />
        </div>
      </div>

      <div class="modal-content-inner">
        <slot name="content" :settings="settingschoiche"> </slot>
        <div class="settingsCard">
          <ul class="list-unstyled">
            <li
              :class="{ active: settingschoiche === 0 }"
              @click="settingsChange(0)"
            >
              Documents
            </li>
            <li
              :class="{ active: settingschoiche === 1 }"
              @click="settingsChange(1)"
            >
              Courses
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Modal",
  setup() {
    // visiabilty logic
    const show = ref<boolean>(false);
    const showModal = () => {
      show.value = true;
    };
    const closeModal = () => {
      show.value = false;
    };

    // settings logic
    const settingschoiche = ref<number>(0);

    const settingsChange = (setting: number) => {
      settingschoiche.value = setting;
    };

    return {
      showModal,
      show,
      closeModal,
      settingschoiche,
      settingsChange
    };
  }
});
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.settingsCard {
  padding: 1%;
  width: 16%;
  min-height: 10rem;
  max-height: fit-content;
  border-radius: 15px;
  margin-top: 3.7%;
  padding-top: 0;
}

.settingsCard p {
  color: grey;
  margin: 0;
  font-size: 1.3rem;
  /* padding-left: 2%; */
  white-space: nowrap;
}

.settingsCard ul li {
  height: 2.5em;
  /* background-color: rgb(248, 248, 248); */
  margin-bottom: 1%;
  border-left: 5px solid transparent;
  padding-left: 3%;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.settingsCard ul li:hover {
  cursor: pointer;
  border-left: 5px solid rgb(179, 179, 179);
}

.settingsCard ul li.active {
  border-left: 5px solid rgb(179, 179, 179);
  background-color: whitesmoke;
  /* transform: translateX(4px); */
}
/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin-top: 15%; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  margin-bottom: 5%;
  border: 5px solid whitesmoke;
  border-radius: 15px;
  position: relative;
  left: 1%;
}

.modal-content-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 2rem;
}

/* The Close Button */
.close {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  color: tomato;
  transition: all 0.3s;
  border-radius: 50%;
  padding: 1%;
  z-index: 2;
  position: relative;
  left: 0.5rem;
}

.close:hover,
.close:focus {
  background: whitesmoke;
  cursor: pointer;
}
</style>
