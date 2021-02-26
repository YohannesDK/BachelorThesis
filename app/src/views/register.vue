<template>
  <div ref="typeormformRef" class="formcontainer"></div>
</template>

<script lang="ts">
import router from "@/router";
import { OnSubmitEvent } from "@typeform/embed";
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

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
              axios.get("/api/register", {}).then(res => {
                console.log(res);
              });

              console.log(event);
              console.log("Typeform successfully submitted");
              router.push({ path: "/login" });
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
