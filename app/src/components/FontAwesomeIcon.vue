<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="$props.class"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <path fill="currentColor" :d="svgPath" />
  </svg>
</template>

<script>
import { computed, defineComponent } from "vue";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

export default defineComponent({
  name: "FontAwesomeIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    class: String
  },

  setup(props) {
    const definition = computed(() =>
      findIconDefinition({
        prefix: "fas",
        iconName: props.icon
      })
    );
    console.log(definition, "halla");
    const width = computed(() => definition.value.icon.values);
    console.log(width);

    const height = computed(() => {
      return definition.value.icon[1] | 0;
    });
    const svgPath = computed(() => {
      return definition.value.icon[4] | 0;
    });

    return {
      width,
      height,
      svgPath
    };
  }
});
</script>
