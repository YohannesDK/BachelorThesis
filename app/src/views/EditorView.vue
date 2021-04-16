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

  <Editor @updateDoc="onUpdateDoc" :docmentId="docID" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";

//components
import Editor from "@/components/Editor.vue";
import router from "@/router";
import { CreateDocument } from "@/services/api/document.service";

export default defineComponent({
  name: "EditorView",
  components: {
    Editor
  },

  setup() {
    const DocumentTittle = ref<HTMLHeadingElement>();
    const Title = ref<string>("Enter Title...");
    const LastEdited = ref<string>("");
    const docID = Number(router.currentRoute.value.query.did);

    const TittleSetup = () => {
      // Set document title and last edited
      if (docID !== -1) {
        const document = store.getters.getDocmentbyId(docID);
        if (document) {
          Title.value = document.name;
          LastEdited.value = document.lastEdited;
        }
      }

      if (DocumentTittle.value) {
        // Add Enter Event Listner
        DocumentTittle.value.addEventListener(
          "keypress",
          (e: KeyboardEvent) => {
            if (e.key === "Enter") {
              e.preventDefault();
              //TODO: define setters for this
              if (DocumentTittle.value) {
                store.dispatch("SetDocumentTittle", {
                  Documentid: docID,
                  DocumentTittle: DocumentTittle.value.innerText
                });
                DocumentTittle.value.blur();
              }
            }
          }
        );
      }
    };

    const onUpdateDoc = (updatedData: any) => {
      if (DocumentTittle.value) {
        updatedData["DocumentTittle"] = DocumentTittle.value.innerText;
      }
      // document is defined
      if (updatedData.docID !== -1) {
        store.dispatch("UpdateDocumentBody", updatedData);
      }
      CreateDocument(updatedData.userId, JSON.stringify(updatedData.body), updatedData.DocumentTittle)
    };

    onMounted(() => {
      // Document Tittle events and setup
      TittleSetup();
    });

    return {
      DocumentTittle,
      Title,
      LastEdited,
      docID,
      onUpdateDoc
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
