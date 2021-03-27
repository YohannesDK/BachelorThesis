<template>
  <div class="attachdocument" v-test="{ id: 'AttachDocumentToQS-container' }">
    <div class="searchbar-container">
      <input
        type="text"
        class="searchbar shadow"
        placeholder="Search..."
        v-model="searchvalue"
        v-test="{ id: 'AttachDocumentToQS-searchbar' }"
      />
    </div>
    <ul
      class="list-unstyled documentlist"
      v-test="{ id: 'AttachDocumentToQS-list' }"
    >
      <li
        v-for="doc in searcheddocuments"
        :key="doc"
        v-test="{ id: 'AttachDocumentToQS-list-item' }"
      >
        <toogle-switch-attach-document
          :documentId="doc.DocumentId"
          :documentName="doc.documentName"
          :attached="doc.status"
          @update="updateDocumentQuestionSet"
          v-test="{ id: 'AttachDocumentToQS-list-tooglebtns' }"
        />
      </li>
      <p class="m-auto" v-if="searcheddocuments.length === 0">
        No documents...
      </p>
    </ul>
  </div>
  <div class="savebtn" :class="{ saved: saved }" @click="save">
    <fa icon="check" />
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { documentType } from "@/store/interfaces/document";
import { computed, defineComponent, onMounted, ref } from "vue";
import ToogleSwitchAttachDocument from "@/components/ToogleSwitchAttachDocument.vue";
import Test from "@/directives/test.directive";
export default defineComponent({
  components: { ToogleSwitchAttachDocument },
  name: "AttachDocument",
  props: {
    QSID: {
      type: Number,
      default: -1
    }
  },
  directives: {
    Test
  },
  setup(props) {
    const searchvalue = ref<string>("");
    const saved = ref<boolean>(false);
    const data = ref<any>({
      QSID: props.QSID,
      documentToAttachTo: {}
    });
    const documents = ref<Array<documentType>>(store.getters.getDocuments);
    const attacheddocuments = ref<Array<any>>([]);

    const InitAttachments = () => {
      console.log("init atchee");

      documents.value.forEach((doc: documentType) => {
        const index = doc.QuestionSetID.map((QSID: number) => QSID).indexOf(
          props.QSID
        );
        attacheddocuments.value.push({
          DocumentId: doc.Documentid,
          documentName: doc.name,
          status: true
        });
        if (index === -1) {
          attacheddocuments.value[
            attacheddocuments.value.length - 1
          ].status = false;
        }
      });
    };

    const searcheddocuments = computed(() => {
      if (searchvalue.value !== "") {
        return attacheddocuments.value.filter((ele: any) => {
          return ele.documentName
            .replace(/ /g, "")
            .toUpperCase()
            .includes(searchvalue.value.replace(/ /g, "").toUpperCase());
        });
      }
      return attacheddocuments.value;
    });

    onMounted(() => {
      InitAttachments();
    });

    const updateDocumentQuestionSet = (newStatus: any) => {
      saved.value = false;
      data.value.documentToAttachTo[newStatus.did] = {
        status: newStatus.status
      };
    };

    const save = () => {
      saved.value = true;
      for (const docid in data.value.documentToAttachTo) {
        if (
          Object.prototype.hasOwnProperty.call(
            data.value.documentToAttachTo,
            docid
          )
        ) {
          const ele = data.value.documentToAttachTo[docid];
          if (ele.status === true) {
            store.dispatch("SetDocumentQSID", {
              documentid: Number(docid),
              QSID: props.QSID
            });
            store.dispatch("AttachDocumentToQuestionSet", {
              documentid: Number(docid),
              QSID: props.QSID
            });
          } else if (ele.status === false) {
            store.dispatch("DeleteQuestionSetFromDocument", {
              documentid: Number(docid),
              QSID: props.QSID
            });
            store.dispatch("RemoveDocumentFromQuestionSet", {
              documentid: Number(docid),
              QSID: props.QSID
            });
          }
        }
      }
    };

    return {
      documents,
      updateDocumentQuestionSet,
      searcheddocuments,
      save,
      saved,
      searchvalue,
      attacheddocuments,
      InitAttachments
    };
  }
});
</script>
<style scoped>
.attachdocument {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.searchbar-container {
  width: 36%;
}

.searchbar {
  width: 100%;
  border-radius: 15px;
  border-color: transparent;
  padding: 5px 5px 5px 15px;
  outline: none;
}

.searchbar:focus {
  border-color: transparent;
  outline: none;
}

.savebtn {
  position: absolute;
  top: 0.28rem;
  right: 2.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  color: green;
  border-radius: 50%;
  padding: 1%;
  z-index: 2;
  transition: all 0.3s;
}

.saved {
  background: #3faf7b;
  color: white;
}

.documentlist {
  display: flex;
  flex-wrap: wrap;
  padding-left: 1px;
  margin-top: 1%;
  flex-direction: unset;
  padding: 1%;
  border-radius: 15px;
  width: 96%;
  padding-bottom: 3%;
}

.documentlist li {
  margin-right: 1rem;
}

.savebtn:hover,
.savebtn:focus {
  cursor: pointer;
  background: whitesmoke;
}
.saved:hover {
  background: green;
  color: white;
}
</style>
