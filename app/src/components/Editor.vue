<template>
  <div class="container">
    <div ref="root" id="editor" spellcheck="false"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Quill, { DeltaOperation } from "quill";
import Delta from "quill-delta";
import MyQuill from "@/libs/myQuill/myquill";
import { useStore } from "vuex";
import { doucmentType } from "@/store/interfaces/document";

export default defineComponent({
  name: "Editor",
  props: {
    delta: {
      type: String,
      default: ""
    },
    docmentId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    //Store
    const store = useStore();

    // shared document referense
    let Document: doucmentType;

    // Editor container element
    const root = ref<HTMLElement | string>("");
    let Editor: Quill;

    // Sets Editor Content
    const SetEditorContent = (ops: DeltaOperation[]) => {
      console.log(ops);
      if (ops.length) {
        const delta = new Delta(ops);
        Editor.setContents(delta);
      }
    };

    const InitilizeDocment = () => {
      // initialize editor instance
      Editor = new MyQuill(root.value, {
        placeholder: "Write something cool...",
        theme: "bubble"
      });

      // Editor.on("text-change", () => {
      //   console.log(Editor.getContents());
      // });

      if (props.docmentId !== -1) {
        Document = store.getters.getDocmentbyId(props.docmentId);
        if (Document) {
          SetEditorContent(Document.delta);
        }
      }
    };

    onMounted(() => {
      InitilizeDocment();
    });

    return {
      root
    };
  }
});
</script>

<style scoped>
@import "~quill/dist/quill.bubble.css";

.container {
  /* width: 70%; */
  margin: 0 auto;
}

/* Editor configurations */
#editor {
  min-height: 40vh;
  border: none;
}
.ql-container {
  font-size: 0.9rem;
}
#editor .ql-toolbar.ql-snow {
  border: none !important;
  background-color: khaki;
}
</style>
