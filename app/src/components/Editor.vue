<template>
  <div class="container" @contextmenu.prevent="showToolBar()">
    <!-- <button @click.prevent="updateDoc">SAVE</button> -->
    <div
      style="overflow-x: hidden;"
      ref="root"
      id="editor"
      spellcheck="false"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import katex from "katex";
import hljs, { highlight } from "highlight.js";
import Quill, { DeltaOperation } from "quill";
import Delta from "quill-delta";
import MyQuill from "@/libs/myQuill/myquill";
import router from "@/router";
import axios from "axios";
import { useStore } from "vuex";
// import { doucmentType } from "@/store/interfaces/document";
import AppVue from "../App.vue";

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
    // let Document: documentType;

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

    console.log();
    // Sets Editor Content
    const SetEditorContent = (ops: DeltaOperation[]) => {
      if (ops.length) {
        const delta = new Delta(ops);
        Editor.setContents(delta);
      }
    };

    let usID = 0;
    // @ts-ignore
    const docID = router.currentRoute._rawValue.query.did;

    onBeforeRouteLeave((to, from) => {
      axios
        .post("api/alterDocument", {
          userId: usID,
          docID: docID,
          body: JSON.stringify(Editor.getContents()),
          title: document.getElementsByClassName("documentTitle")[0].innerHTML
        })
        .then(response => {
          console.log("updated");
        });
    });

    onBeforeMount(() => {
      //Get request to get the user id
      //Probably not the best way to do this, need to find a way to do it better
      axios
        .get("/api/studentCourse", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          usID = response.data.id;
        });
    });

    const updateDoc = () => {
      //Post request to save the document info
      axios
        .post("api/alterDocument", {
          userId: usID,
          docID: docID,
          body: JSON.stringify(Editor.getContents()),
          title: document.getElementsByClassName("documentTitle")[0].innerHTML
        })
        .then(response => {
          console.log("updated");
        });
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

      //Send Get request to fetch the document that has been clicked on
      axios
        .get("/api/fetchDoc", { params: { docId: docID } })
        .then(response => {
          const Document = JSON.parse(response.data.document.body);
          if (response.data.document.title != null) {
            document.getElementsByClassName("documentTitle")[0].innerHTML =
              response.data.document.title;
          }

          if (props.docmentId !== -1) {
            if (Document) {
              SetEditorContent(Document.ops);
            }
          }
        });

      Editor.on("text-change", () => {
        // console.log(JSON.stringify(Editor.getContents()));
      });
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
      showToolBar,
      updateDoc
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
  overflow-x: hidden;
}
.ql-container {
  font-size: 0.97rem;
}

.container .ql-container .ql-editor {
  font-size: 18px;
  overflow-x: hidden;
}
</style>
