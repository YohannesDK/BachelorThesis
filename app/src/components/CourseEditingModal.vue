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
        <slot name="content"> </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "CourseEditingModal",
  setup() {
    const show = ref<boolean>(false);
    const showModal = () => {
      show.value = true;
    };
    const closeModal = () => {
      show.value = false;
    };

    return {
      showModal,
      closeModal,
      show
    };
  }
});
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 6; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal::-webkit-scrollbar {
  display: none;
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
