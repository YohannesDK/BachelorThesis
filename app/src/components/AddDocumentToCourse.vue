<template>

  <div class="add-document-container">
    <div class="searchbar-container">
      <input
        type="text"
        class="searchbar shadow"
        placeholder="Search..."
        v-model="searchvalue"
      />
    </div>

    <ul
      class="list-unstyled documentlist"
    >
      <li
        v-for="doc in searcheddocuments"
        :key="doc"
      >
        <toogle-switch-attach-document
          :documentId="doc.DocumentId"
          :documentName="doc.documentName"
          :attached="doc.status"
          @update="UpdateCourseDocuments"
        />
      </li>
      <p class="m-auto" v-if="searcheddocuments.length === 0">
        No documents...
      </p>
    </ul>
    <div class="savebtn" :class="{ saved: saved }" @click="save">
      <fa icon="check" />
    </div>
  </div>
</template>
<script lang="ts">
import store from '@/store'
import { documentType } from '@/store/interfaces/document'
import ToogleSwitchAttachDocument from "@/components/ToogleSwitchAttachDocument.vue";
import { computed, defineComponent, onMounted, PropType, ref, Ref } from 'vue'
export default defineComponent({
  name: "AddDocumentToCourse",
  props: {
    courseID: {
      type: Number,
      default: -1
    },
    courseDocuments: {
      type: Array as PropType<Array<number>>,
      default: () => []
    }
  },
  emits: ["documentsUpdated"],
  components: { ToogleSwitchAttachDocument },
  setup(props, {emit}){
    const saved = ref<boolean>(false);
    const searchvalue = ref<string>("");

    const data = ref<any>({
      courseID: props.courseID,
      documents: {}
    })

    const documents: Ref<documentType[]> = ref(store.getters.getDocuments);
    const attacheddocuments = ref<Array<any>>([]);


    const InitAttachments = () => {
      documents.value.forEach((doc: documentType) => {
        const index = props.courseDocuments.map((docID: number) => docID).indexOf(
          doc.Documentid
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


    const UpdateCourseDocuments = (newStatus: any) => {
      saved.value = false;
      data.value.documents[newStatus.did] = {
        status: newStatus.status
      }
    }

    const save = () => {
      saved.value = true;

      for (const docID in data.value.documents) {
        if (Object.prototype.hasOwnProperty.call(data.value.documents, docID)) {
          const status = data.value.documents[docID].status;
          if (status === true) {
            const doc: documentType | undefined = documents.value.find((doc: documentType) => doc.Documentid === Number(docID));
            if (doc) {
              store.dispatch("AddCourseDocuments", doc);
              store.dispatch("LinkDocumentToCourse", {courseID: props.courseID, did: Number(docID)});

            }
          } 
          else if (status === false) {
            store.dispatch("RemoveDocumentFromCourse", {courseID: props.courseID, did: Number(docID)});
          }
        }
      }
      emit("documentsUpdated");
    }


    onMounted(() => {
      InitAttachments();
    })
    return {
      documents,
      searchvalue,
      searcheddocuments,
      save,
      saved,
      UpdateCourseDocuments
    }
  }
})
</script>

<style scoped>
.add-document-container {
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