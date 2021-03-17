<template>
  <label class="label-container">
    <span class="switch" :class="{'checked': checked}" @click="updateClick"></span>
    <span class="label">{{ documentName }}</span>
  </label>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: "ToogleSwitch",
  props: {
    documentId: {
      type: Number,
      default: -1
    },
    documentName: {
      type: String,
      default: ""
    }
  },
  emits: ["update"],
  setup(props, { emit }) {
    const checked = ref<boolean>(false);

    const updateClick = () => {
      checked.value = !checked.value
        emit("update", {did: props.documentId, status: checked.value});
    }
    return {
      checked,
      updateClick
    }
  }
})
</script>

<style scoped>
.label-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  margin-top: 1rem;
}

.label {
  margin-left: 12px;
  color: #1a202c;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap;
}

.switch {
  /* Vertically center the inner circle */
  display: flex;
  align-items: center;
  position: relative;
  height: calc(50px / 2);
  flex-basis: 50px;
  /* Make the container element rounded */
  border-radius: calc(50px / 2);
  background-color: #e2e8f0;
  transition: background-color 0.25s ease-in-out;
  flex-shrink: 0;
}
.switch::before {
  content: "";
  position: absolute;
  /* Move a little bit the inner circle to the right */
  left: 1px;
  height: calc(calc(50px / 2) - 4px);
  width: calc(calc(50px / 2) - 4px);
  /* Make the inner circle fully rounded */
  border-radius: 9999px;
  background-color: white;
  transition: transform 0.375s ease-in-out;
  border: 2px solid #e2e8f0;
}

.switch.checked {
  /* Teal background */
  background-color: #4fd1c5;
}
.switch.checked::before {
  border-color: #4fd1c5;
  /* Move the inner circle to the right */
  transform: translateX(
    calc(50px - calc(50px / 2))
  );
}
</style>