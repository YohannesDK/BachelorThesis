<template>
  <div ref="typeormformRef" class="formcontainer"></div>
</template>

<script lang="ts">
import router from "@/router";
import { OnSubmitEvent } from "@typeform/embed";
import { defineComponent, onMounted, ref } from "vue";
import axios from "@/services/api";
import { Register } from "@/services/api/auth.service";

export default defineComponent({
  name: "Register",
  setup() {
    const typeormformRef = ref(null);

    onMounted(() => {
      (async () => {
        const { makeWidget }: any = await import("@typeform/embed");
        makeWidget(
          typeormformRef.value,
          "https://f8hitt1d7ph.typeform.com/to/vRs8ZOsa",
          {
            size: 100,
            onSubmit: function(event: OnSubmitEvent) {
              Register(event.response_id);
            }
          }
        );
      })();
    });

    return {
      typeormformRef
    };
  }
});
</script>

<style scoped>
.formcontainer {
  width: 100vw;
  height: 100vh;
}

#sidebar {
  display: none !important;
}
</style>
