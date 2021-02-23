<template>
  <div class="container" @contextmenu.prevent="showToolBar()">
    <div ref="root" id="editor" spellcheck="false"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import katex from "katex";
import hljs, { highlight } from "highlight.js";
import Quill, { DeltaOperation } from "quill";
import Delta from "quill-delta";
import MyQuill from "@/libs/myQuill/myquill";
import { useStore } from "vuex";
import { doucmentType } from "@/store/interfaces/document";

hljs.configure({
  languages: ["python"]
});

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
    let Editor: Quill | any;

    //Editor Toolbar
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block", "link"],

      ["image"], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      ["formula", { script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"] // remove formatting button
    ];

    // Sets Editor Content
    const SetEditorContent = (ops: DeltaOperation[]) => {
      console.log(ops);
      if (ops.length) {
        const delta = new Delta(ops);
        Editor.setContents(delta);
      }
    };

    const showToolBar = () => {
      Editor.theme.tooltip.edit();
      Editor.theme.tooltip.show();
      // Editor.theme.tooltip.show()
    };

    const InitilizeDocment = () => {
      // initialize editor instance
      Editor = new MyQuill(root.value, {
        placeholder: "Write something cool...",
        theme: "bubble",
        modules: {
          toolbar: toolbarOptions,
          syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value
          }
        }
      });

      Editor.on("text-change", () => {
        console.log(Editor);
      });

      if (props.docmentId !== -1) {
        Document = store.getters.getDocmentbyId(props.docmentId);
        if (Document) {
          SetEditorContent(Document.delta);
        }
      }
    };

    onMounted(() => {
      // Add katex for enabling formulas
      (window as any).katex = katex;

      // add highlight js for syntax highlighting in code
      (window as any).hljs = highlight;
      InitilizeDocment();
    });

    return {
      root,
      showToolBar
    };
  }
});
</script>

<style scoped>
@import "~quill/dist/quill.bubble.css";
/* @import "~quill/dist/quill.snow.css"; */
@import "~katex/dist/katex.min.css";
@import "~highlight.js/styles/hybrid.css";
@import "../assets/css/editor.css";

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
  font-size: 0.97rem;
}
</style>
