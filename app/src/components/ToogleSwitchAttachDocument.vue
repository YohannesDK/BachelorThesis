<template>
  <label class="label-container" v-test="{ id: 'ToogleSwitch-container' }">
    <span
      v-test="{ id: 'ToogleSwitch-btn' }"
      class="switch"
      :class="{ checked: checked }"
      @click="updateClick"
    ></span>
    <span class="label" v-if="toogleSwitchType === 0" v-test="{ id: 'ToogleSwitch-label' }">{{
      documentName
    }}</span>
    <span class="label" v-if="toogleSwitchType === 1" v-test="{ id: 'ToogleSwitch-label' }">{{
      QuestionSetName
    }}</span>
  </label>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Test from "@/directives/test.directive";
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
    },
    QSID: {
      type: Number,
      default: -1
    },
    QuestionSetName: {
      type: String,
      default: ""
    },
    toogleSwitchType: {
      type: Number,
      default: 0,
      required: false
    },
    attached: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    Test
  },
  emits: ["update"],
  setup(props, { emit }) {
    const checked = ref<boolean>(props.attached);

    const updateClick = () => {
      checked.value = !checked.value;
      if (props.toogleSwitchType === 0) {
        emit("update", { did: props.documentId, status: checked.value });
      } else if (props.toogleSwitchType === 1) {
        emit("update", { QSID: props.QSID, status: checked.value });
      }
    };
    return {
      checked,
      updateClick
    };
  }
});
</script>

<style scoped>
.label-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  width: 13rem;
  margin-top: 1rem;
}

.label {
  margin-left: 12px;
  color: #1a202c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 9rem;
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
  transform: translateX(calc(50px - calc(50px / 2)));
}
</style>
