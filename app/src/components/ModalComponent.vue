<template>
  <div v-if="show" class="modal" @click.self="closeModal">

     <!-- Modal content -->
    <div class="modal-content container d-flex flex-column card">
      <div class="modal-close navbar navbar-expand-lg">
        <span class="close"
        @click="closeModal"
        >&times;</span>
      </div>

      <div class="modal-content-inner">
        <slot name="content">
        </slot>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: "Modal",
  setup() {
    // visiabilty logic
    const show = ref<boolean>(false);
    const showModal = () => {
      show.value = true
    }
    const closeModal = () => {
      show.value = false;
    }

    const initilizedata = () => {
      // what to show, so we dont need to load unnecessary data
      // if (props.displayType === "attachdocument") {
      //   documents = ref(store.getters.getDocuments);
      //   console.log("Documents: ", documents.value, "QSID: ", props.QSID);
      // }
      console.log("her");
    }

    onMounted(() => {
      initilizedata()
    });

    return {
      showModal,
      show,
      closeModal
    }
  }
})
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin-top: 15%; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
}

.modal-content-inner{
  width: 96%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-close {
  position: absolute;
  top: 0;
  right: 1%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>