<template>
  <div
    class="jumbotron text-white jumbotron-cover shadow"
    :style="{
      backgroundImage: 'url(\'' + require('@/assets/background.jpg') + '\')'
    }"
  >
    <div class="container d-flex justify-content-between">
      <h2 class="documentTitle" ref="DocumentTittle" contenteditable="true">
        {{ Title }}
      </h2>
      <p>{{ LastEdited }}</p>
    </div>
  </div>

  <Editor :docmentId="docID" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

//components
import Editor from "@/components/Editor.vue";
import router from "@/router";

export default defineComponent({
  name: "EditorView",
  props: {
    DocumentId: {
      type: Number
    }
  },
  components: {
    Editor
  },

  setup(props) {
    const DocumentTittle = ref<HTMLHeadingElement>();
    const store = useStore();
    const Title = ref<string>("Enter Title...");
    const LastEdited = ref<string>("");
    const docID = Number(router.currentRoute.value.query.did);
    
    const TittleSetup = () => {
      // Set document title and last edited
      if (docID !== -1) {
        Title.value = store.getters.getDocmentbyId(docID).name;
        LastEdited.value = store.getters.getDocmentbyId(
          docID
        ).lastEdited;
      }

      // Add Enter Event Listner
      DocumentTittle.value?.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          DocumentTittle.value?.blur();
          console.log(DocumentTittle.value?.innerText);
        }
      });
    };

    onMounted(() => {
      // Document Tittle events and setup
      TittleSetup();
    });

    return {
      DocumentTittle,
      Title,
      LastEdited,
      docID
    };
  }
});
</script>

<style scoped>
.jumbotron-cover {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 30vh;
  display: flex;
  align-items: flex-end;
}

.documentTitle {
  outline: none;
  padding-left: 12px;
}
</style>
