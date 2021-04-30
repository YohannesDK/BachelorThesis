<template>
  <!-- <div class="container"> -->
  <div class="container" @contextmenu.prevent="showToolBar()">
    <!-- <button @click.prevent="updateDoc">SAVE</button> -->
    <div
      ref="root"
      id="editor"
      spellcheck="false"
    ></div>

    <!-- readzone refrences -->
    <div class="topic-readzones">
      <div id="topic-non-readzone-1"></div>
      <div id="topic-readzone"></div>
      <div id="topic-non-readzone-2"></div>
    </div>


    <div class="monitoring-data card shadow-sm"
    :class="{'show' : visualize}"
    @click="visualize = !visualize"
    >
      <div class="selected-topic">
        <h5>Topics Data</h5>
      </div>
      <div class="topic-monitoring-data"
      v-for="(value, topic) in TopicData"
      :key="topic"
      :class="{'in-readzone': value.InReadZone}"
      >
        <span>Topic: {{value.Topic}}</span>
        <span>Time: {{value.Time}}</span>
        <span>InReadZone: {{value.InReadZone}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, Ref, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import katex from "katex";
import hljs, { highlight } from "highlight.js";
import Quill, { DeltaOperation } from "quill";
import Delta from "quill-delta";
import MyQuill from "@/libs/myQuill/myquill";
import store from "@/store";
import router from "@/router";
import { documentType } from "@/store/interfaces/document";
import { UserType } from "@/store/interfaces/user.types";

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
    },
    courseDocument: {
      type: Boolean,
      default: false
    }
  },
  emits: ["updateDoc", "updateTopicTime"],
  setup(props, { emit }) {

    const user: Ref<UserType> = ref<UserType>(store.getters.getActiveUser);
    const InitialLoad = ref<boolean>(false);
    const Saved = ref<boolean>(true);
    const visualize = ref(false);

    const IsTeacher = computed(() => store.getters.getIsTeacher);

    const SelectedTopicID = ref(null);
    const TopicData = ref({});
    const Time = ref(0);

    // Editor container element
    const root = ref<HTMLElement | string>("");
    let Editor: Quill | any;

    //Editor Toolbar
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block", "link"],

      [{ list: "ordered" }, { list: "bullet" }],
      ["formula", { script: "sub" }, { script: "super" }], // superscript/subscript
      // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"] // remove formatting button
    ];

    // Sets Editor Content
    const SetEditorContent = (ops: DeltaOperation[]) => {
      if (ops.length) {
        const delta = new Delta(ops);
        Editor.setContents(delta);
      }
    };

    onBeforeRouteLeave((to, from) => {
      if (Saved.value === false) {
        const delta = Editor.getContents();
        Editor.UpdateTopicIds(delta);

        const updatedData = {
          docID: props.docmentId,
          body: delta,
          userId: user.value.UserID
        };
        emit("updateDoc", updatedData);
      }

      if (props.courseDocument === true) {
        emit("updateTopicTime", TopicData.value)
      }

    });

    const showToolBar = () => {
      Editor.theme.tooltip.edit();
      Editor.theme.tooltip.show();
      // Editor.theme.tooltip.show()
    };

    const InitilizeDocment = () => {
      console.log(typeof props.courseDocument, props.courseDocument);

      // initialize editor instance
      Editor = new MyQuill(root.value, {
        placeholder: "Write something cool...",
        theme: "bubble",
        modules: {
          toolbar: toolbarOptions,
          syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value
          },
          TopicSelectionModule: {}
        },
        SelectedTopicID: SelectedTopicID.value,
        TopicData: TopicData.value,
        Time: Time.value,
        Monitor: props.courseDocument === true // TODO - for testing purposes, remove this later
        // Monitor: props.courseDocument === true && !IsTeacher.value
      });

      //Send Get request to fetch the document that has been clicked on
      if (props.docmentId !== -1) {
        let Document: documentType;

        if (props.courseDocument === true) {
          Document = store.getters.getCourseDocumentById(props.docmentId)
        } else {
          Document = store.getters.getDocmentbyId(props.docmentId);
        }

        if (Document) {
          SetEditorContent(Document.body as DeltaOperation[]);
          if (props.courseDocument === true) {
            Editor.enable(false); 
          }
        }
        InitialLoad.value = true;
      }

      Editor.on("text-change", () => {
        if (InitialLoad.value === true) {
          Saved.value = false;
        }
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
      TopicData,
      SelectedTopicID,
      Time,
      visualize
    };
  }
});
</script>

<style scoped>
@import "~quill/dist/quill.bubble.css";
/* @import "~quill/dist/quill.snow.css"; */
@import "~katex/dist/katex.min.css";
@import "~highlight.js/styles/hybrid.css";

.container {
  /* width: 70%; */
  margin: 0 auto;
}

/* Editor configurations */
#editor {
  min-height: 40vh;
  border: none;
  /* overflow-x: hidden; */
  margin-bottom: 20vh;
}
.ql-container {
  font-size: 0.97rem;
}

.container .ql-container .ql-editor {
  font-size: 18px;
  /* overflow-x: hidden; */
}



.topic-readzones{
  position: fixed;
  left: 4%;
  top: 0;
  height: 100vh;
  width: 100px;
  opacity: 0;
}

#topic-non-readzone-1, #topic-non-readzone-2{
  height: 20vh;
  background: #fd6f6f;
  width: 100%;
}

#topic-readzone {
  height: 60vh;
  background: #68ce68;
  width: 100%;
}


.monitoring-data {
  position: fixed;
  right: 0;
  z-index: 2;
  /* background: whitesmoke; */
  width: 15%;
  padding: 0 1%;
  height: 5vh;
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  overflow-y: scroll;
  bottom: 0;
}

.monitoring-data:hover {
  cursor: pointer;
}

.monitoring-data::-webkit-scrollbar {
  display: none;
}

.monitoring-data.card.shadow-sm.show {
  height: 65vh;
}

.topic-monitoring-data {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid;
  padding-bottom: 4%;
  padding-top: 3%;
  transition: all 0.3s;
  margin-top: 5%;
}

.topic-monitoring-data span {
  width: 100%;
  padding: 0 1%;
}

.topic-monitoring-data.in-readzone {
  background: rgb(205, 225, 243);
  border: none;
}

.selected-topic {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
