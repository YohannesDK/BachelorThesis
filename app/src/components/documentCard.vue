<template>
  <div class="doc-item shadow-sm" v-test="{ id: 'card-container' }">
    <div
      class="doc-item-thumbnail"
      v-test="{ id: 'card-thumbnail' }"
      @click="OpenEditor(document.Documentid)"
    >
      {{ documentText }}
    </div>

    <div class="doc-item-data-container">
      <div
        class="doc-item-tittle"
        v-test="{ id: 'card-tittle' }"
        @click="OpenEditor(document.Documentid)"
      >
        {{ document.name }}
      </div>

      <div class="doc-item-time-container" v-if="minimal === false">
        <span>Åpnet</span>
        <span
          class="doc-item-last-edited"
          v-test="{ id: 'card-last-edited' }"
          >{{ document.lastEdited }}</span
        >

        <div
          class="doc-item-more"
          v-test="{ id: 'card-more-button' }"
          @click="More()"
          @mouseleave="RemoveMore()"
        >
          <fa icon="ellipsis-h" />
          <div class="dropdowncontainer" v-if="showDropDown">
            <div class="doc-item-more-dropdown shadow-sm">
              <ul
                class="list-unstyled mb-0"
                v-test="{ id: 'card-options-dropdown' }"
              >
                <li @click="OpenEditor(document.Documentid)">Open</li>
                <li>Rename</li>
                <li @click="OpenQuestionSet(-1)">
                  Add New Question Set
                </li>
                <li @click="addDoc()">Add to course</li>
                <li>Share</li>
                <hr />
                <li @click="deleteDocument(document.Documentid)">Delete</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Test from "@/directives/test.directive";
import { documentType } from "@/store/interfaces/document";
import axios, { AxiosError } from "axios";
import { DeltaToPlainText } from "@/utils/delta.utils";
import { DeleteDocument } from "@/services/api/document.service";
import router from "@/router";
export default defineComponent({
  name: "documentCard",
  directives: { Test },
  props: {
    document: {
      type: Object as () => documentType,
      default: () => ({})
    },
    minimal: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const documentText = ref<string>("");
    const documentTextLength = 150;
    const showDropDown = ref<boolean>(false);
    const documentLastEdited = ref(props.document.lastEdited);

    // let documentParsed = true

    // @ts-ignore
    const courseID = router.currentRoute._rawValue.query.cid;

    const More = () => {
      showDropDown.value = true;
    };

    const RemoveMore = () => {
      showDropDown.value = false;
    };

    const addDoc = () => {
      console.log("added this one" + props.document.Documentid);
      axios
        .post("api/linkDocument", {
          documentId: props.document.Documentid,
          courseId: courseID
        })
        .then(response => {
          console.log(response);
        }).catch((error: AxiosError) => {
          console.error(error);
        });
    };

    //THIS QUERY WONT WORK
    const OpenEditor = (DocumentId: number) => {
      router.push({ name: "EditorView", query: { did: DocumentId } });
    };

    const OpenQuestionSet = (QSID: number) => {
      router.push({
        name: "QuestionSets",
        query: { QSID: QSID, did: props.document.Documentid }
      });
    };

    const deleteDocument = (docID: number) => {
      showDropDown.value = false;
      DeleteDocument(docID);
    };

    onMounted(() => {
      //This is the preview text inside document cards
      if (props.document.body !== undefined) {
        let parseBody;
        if (
          typeof props.document.body === "string" &&
          props.document.body !== ""
        ) {
          parseBody = JSON.parse(props.document.body).ops;
        } else if (
          typeof props.document.body === "string" &&
          props.document.body === ""
        ) {
          documentText.value = "Empty Document";
          return;
        } else {
          parseBody = props.document.body;
        }

        documentText.value = DeltaToPlainText(parseBody)
          .substring(0, documentTextLength)
          .concat("...");
      } else {
        documentText.value = "Empty Document";
      }
    });
    return {
      documentText,
      documentTextLength,
      showDropDown,
      More,
      RemoveMore,
      OpenEditor,
      OpenQuestionSet,
      addDoc,
      documentLastEdited,
      deleteDocument
    };
  }
});
</script>

<style scoped>
.doc-item {
  border: 1px solid #dfe1e5;
  border-radius: 8px;
  box-shadow: none;
  cursor: pointer;
  opacity: 1;
  width: fit-content;
  max-width: 178px;
  height: 208px;
  margin-bottom: 20px;
  margin-right: 20px;
  transition: all 0.5s;
}

.doc-item:hover {
  cursor: pointer;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
}

.doc-item-thumbnail {
  background: linear-gradient(45deg, white, whitesmoke);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 156px;
  width: 176px;
  background-repeat: no-repeat;
  background-size: 208px auto;
  border: none;
  position: relative;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
  padding: 6%;
  font-size: 0.77em;
  padding-top: 13%;
  overflow-x: hidden;
}

.doc-item-data-container {
  border-top: 1px solid #e2e2e2;
  padding: 5px 8px 14px 16px;
  position: relative;
}

.doc-item-tittle {
  color: #414549;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 18px;
  margin-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
}

.doc-item-time-container {
  color: #80868b;
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.3px;
  line-height: 24px;
  margin-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
  width: 80%;
}

.doc-item-time-data {
  margin-left: 6px;
  font-weight: 500;
}

.doc-item-more {
  position: absolute;
  right: 0;
  margin-right: 4%;
  bottom: 40%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  border-radius: 4px;
  z-index: 1;
}

.doc-item-more:hover {
  background: #ededed;
}

.dropdowncontainer:hover {
  display: block;
}

.doc-item-more .dropdowncontainer {
  display: block;
  position: absolute;
  z-index: 1;
  min-width: 100%;
  padding-left: 6%;
  transition: all 1s;
  color: black;
  top: 64%;
  width: 8vw;
  left: 11%;
}

.doc-item-more-dropdown {
  float: right;
  width: 100%;
  transition: all 0.4s;
  border-radius: 0.8rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 100%;
}

.doc-item-more-dropdown ul li {
  min-height: 2.5em;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  transition: background-color 0.7s ease-out;
  background-color: white;
  padding-left: 10px !important;
  padding: 4%;
}

.doc-item-more-dropdown ul hr {
  width: 92%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.doc-item-more-dropdown ul li:hover {
  background: whitesmoke;
}

.doc-item-more-dropdown ul li a {
  padding: 12px 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.doc-item-more-dropdown ul li:nth-child(1) {
  border-top-right-radius: 0.8rem;
  border-top-left-radius: 0.8rem;
  padding-top: 5%;
}

.doc-item-more-dropdown ul li:last-child {
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  color: #bd0000;
}

.doc-item-last-edited {
  margin-left: 5%;
}
</style>
