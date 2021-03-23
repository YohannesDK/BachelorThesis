<template>
  <div
    class="course-banner jumbotron text-white jumbotron-cover shadow bg_cover"
    :style="{
      backgroundImage:
        'url(\'' + require('@/assets/course_background.jpg') + '\')'
    }"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-9 col-sm-11">
          <div class="details_banner_content">
            <h4 class="title mb-4">{{ course.courseName }}</h4>
            <div class="details_media_wrapper d-flex flex-wrap">
              <div class="details_media d-flex align-items-center mt-30">
                <div class="media_image">
                  <img
                    class="author"
                    :src="require(`@/assets/teacher.jpg`)"
                    alt="author"
                  />
                </div>
                <div class="media_content media-body">
                  <p>Teacher</p>
                  <h6 class="title">Kiara alva ruba</h6>
                </div>
              </div>
              <div class="details_media d-flex align-items-center mt-30">
                <div class="media_image">
                  <img
                    class="bookmark"
                    :src="require(`../assets/bookmark.png`)"
                    alt="bookmark"
                  />
                </div>
                <div class="media_content media-body">
                  <p>Tags</p>
                  <h6 class="title"><a href="#">Andorid / Development</a></h6>
                </div>
              </div>
              <button @click="showDoc()" id="addDocButton" style="height: 52%; width: 200px; margin-bottom: -100px;">Add Document </button>

            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-9 col-sm-11">
          <div class="details_banner_content">
            <h4 class="title comming-events-title mb-4">Comming Events</h4>
            <div
              class="events_media_wrapper d-flex flex-wrap justify-content-end"
            >
              <div
                class="event-card-container details_media d-flex align-items-center mt-30"
              >
                <div
                  class="event-cards card"
                  v-for="(event, index) in events"
                  :key="index"
                >
                  <div class="card shadow my-card-icon">
                    <fa icon="calendar-alt" class="icon" />
                  </div>
                  <div class="text-center">
                    {{ event.event }}
                  </div>
                  <div class="text-center">
                    {{ event.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
          <div style="text-align: center">{{totalPages}}</div>
          <p style="text-align: center;">Page {{state.counter}}</p>
          <button @click="previousPage()">Previous</button>
          <button style="float: right;" @click="nextPage()">Next</button>

        <!-- <div id="content"></div> -->
        <div class="editing" ref="root" id="editor" spellcheck="false"></div>

      <h1 class="m-auto" v-if="filteredDocuments.length === 0">
        No documents found...
      </h1>
      <div id ="docContainer" style="visibility: hidden; ">

          <document-card @click="addDoc()" id="documentCard" style="display: inline-block;"
        v-for="(doc, index) in filteredDocuments"
        :document="doc"
        :key="index"
      />
      </div>

  </div>
</template>

<script lang="ts">
import router from "@/router";
import { courseType } from "@/store/interfaces/course";
import DocumentCard from "@/components/documentCard.vue";
import { defineComponent, onBeforeMount, onMounted, ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import katex from "katex";
import hljs, { highlight } from "highlight.js";
import Quill, { DeltaOperation } from "quill";
import Delta from "quill-delta";
import MyQuill from "@/libs/myQuill/myquill";
import axios from "axios";
import { documentType } from "@/store/interfaces/document";

hljs.configure({
  languages: ["python"]
});
hljs.highlightAll();

export default defineComponent({
  name: "Course",
    components: {
    DocumentCard
  },
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
    const store = useStore();
    const CourseId = Number(router.currentRoute.value.query.cid);
    const searchValue = ref<string>("");
    const course: courseType = store.getters.getCoursebyId(CourseId);


    const documents = ref<Array<documentType>>([]);
    let userId = 0;

      //Get request to get all the documents
      axios
      .get("/api/documentInfo", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        userId = response.data.document[0].userId
        documents.value = response.data.document
        });

    // shared document referense
    let Document: documentType;

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
      if (ops.length) {
        const delta = new Delta(ops);
        Editor.setContents(delta);
      }
    };

    const showDoc = () => {
      // @ts-ignore
      document.getElementById('editor').style.display = "none"
      // @ts-ignore
      document.getElementById("docContainer").style.visibility = ""
    }

    const addDoc = () => {
      console.log("adding")
    }

    const courseDocuments = [] as any

    const state = reactive({
      counter: 1
    })
    

    const nextPage = () => {
      if(courseDocuments.value[state.counter+1] != undefined) {
        state.counter ++
        SetEditorContent(JSON.parse(courseDocuments.value[state.counter]).ops);
        // @ts-ignore
        console.log(document.querySelector(".container").innerHTML)
        // document.getElementById('content').innerHTML = document.querySelector(".ql-editor").innerHTML
      }
    }

    const previousPage = () => {
      if(courseDocuments.value[state.counter-2] != undefined) {
        state.counter --
        SetEditorContent(JSON.parse(courseDocuments.value[state.counter]).ops);
        // document.getElementById('content').innerHTML = document.querySelector(".ql-editor").innerHTML
      }

    }

      axios.get("/api/fetchCourseDoc", {params: {cid: course.courseId}}).then(response => {
            Document = JSON.parse(response.data.documentList[0])
            courseDocuments.value = response.data.documentList

        });


  let usID = 0;
  // @ts-ignore
  const docID = router.currentRoute._rawValue.query.did;


  onBeforeMount(() => {
    //Get request to get the user id
    //Probably not the best way to do this, need to find a way to do it better
      axios
      .get("/api/studentCourse", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        usID = response.data.id
        });
  });


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

      let Document = "" as any
      const testList = [{"thisone: ": ""}]

      //Send Get request to fetch the document that has been clicked on
      axios.get("/api/fetchCourseDoc", {params: {cid: course.courseId}}).then(response => {
            Document = JSON.parse(response.data.documentList[0])
            testList.push(response.data.documentList[0])
            courseDocuments.value = response.data.documentList
            
            if (props.docmentId !== -1) {
              if (Document) {
                SetEditorContent(Document.ops);
              }
            }

            return {courseDocuments}
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

    const events = [
      {
        event: "Test",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      },
      {
        event: "Test 2",
        date: "23 Feb. 2021"
      }
    ];
    console.log(course);


    const filteredDocuments = computed(() => {

      let tempDocuments = documents.value;

      if (searchValue.value !== "") {
        tempDocuments = tempDocuments.filter((doc: documentType) => {
          return (
            doc.name
              .replace(/ /g, "")
              .toUpperCase()
              .includes(searchValue.value.replace(/ /g, "").toUpperCase()) ||
            // Search text inside document
            // doc.delta
            //   .replace(/ /g, "")
            //   .toUpperCase()
            //   .includes(searchValue.value.replace(/ /g, "").toUpperCase()) ||
            doc.tags
              .map((tag: string) => {
                return tag.toUpperCase();
              })
              .includes(searchValue.value.toUpperCase())
          );
        });
      }
      return tempDocuments;
    });


    return {
      course,
      events,
      root,
      showToolBar,
      showDoc,
      filteredDocuments,
      addDoc,
      nextPage,
      previousPage,
      state
      };
  }
});
</script>

<style scoped>
.course-banner {
  position: relative;
  padding-top: 194px;
  padding-bottom: 95px;
  z-index: 5;
  background-position: top center;
}
.course-banner::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 41, 69, 0.95);
  z-index: -1;
}
.details_banner_content .title {
  font-size: 36px;
  color: #fff;
  font-weight: 600;
}
.details_media {
  width: 50%;
}
.details_media_wrapper p {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #484848;
  margin: 0px;
}

.details_media .media_image .author {
  width: 50px;
  border-radius: 50%;
}
.details_media .media_content {
  padding-left: 15px;
}

.details_media .media_content p {
  font-size: 14px;
  color: #fff;
}

.details_media .media_content .title a,
.details_media .media_content .title {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
}

.details_media .media_image .bookmark {
  width: 20px;
}

.comming-events-title {
  text-align: end;
  font-size: 20px !important;
  padding-top: 16px;
}

.event-cards {
  min-width: 6rem;
  min-height: 3.4rem;
  color: black;
  /* margin-bottom: 5%; */
}
.event-cards:not(:last-child) {
  margin-right: 4%;
}

.ql-editor {
  overflow-x: hidden;
}

.event-card-container {
  position: absolute;
  right: 0;
  padding: 1%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 47%;
  padding-top: 2%;
}

.event-card-container::-webkit-scrollbar {
  display: none;
}

.events_media_wrapper {
  position: relative;
}

.my-card-icon {
  position: absolute;
  left: 40%;
  top: -14px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.my-card-icon > .icon {
  padding: 12%;
  margin: auto;
}



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


.ql-editor {
  overflow-x: hidden;
  background-color: black im !important;
}

</style>
