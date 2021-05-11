<template>
  <div class="alert-container" v-if="showAlert"
  :class="{'bg-success text-white': AlertType === 1, 'bg-warning text-muted': AlertType === 2, 'bg-danger text-white': AlertType === 3}"
  >
    <span> {{ msg }} </span>
    <fa icon="times" @click="closeAlert" />
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: "Alert",
  props: {
    AlertMessage: {
      type: String,
      default: ""
    },
    ShowAlert: {
      type: Boolean,
      default: false
    },
    AlertType: {
      type: Number,
      default: 0
    },
    AlertID: {
      type: Number,
      default: -1
    }
  },
  setup(props) { 
    const msg = computed(() => {
      return props.AlertMessage;
    });


    // local show
    const show = ref(props.ShowAlert);

    const showAlert = computed(() => {
      return props.ShowAlert && show.value
    });

    const closeAlert = () => {
      show.value = false 
      if (props.AlertID !== -1) {
        store.dispatch("RemoveAlert", props.AlertID);
      }
    }


    // remove alert message after 5 second
    setTimeout(() => {
      closeAlert();
    }, 5000);

    return {
      msg,
      showAlert,
      show,
      closeAlert
    }
  },
})
</script>

<style scoped>
.alert-container {
  background: #DAD4C4;
  z-index: 10;
  height: 2rem;
  padding: 1%;
  margin: 0.5rem 1%;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  transition: all 0.3s;
  font-weight: 500;
}

.alert-container:hover {
  cursor: pointer;
}
</style>