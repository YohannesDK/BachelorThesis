<template>
  <div class="attachdocument">
    <ul class="list-unstyled">
      <li v-for="doc in documents" :key="doc">
        <toogle-switch-attach-document :documentId="doc.Documentid" :documentName="doc.name" @update="updateDocumentQuestionSet" />
      </li>
    </ul>
  </div>
  <button @click="save">save</button>
</template>

<script lang="ts">
import store from '@/store';
import { documentType } from '@/store/interfaces/document';
import {defineComponent, ref} from 'vue'
import ToogleSwitchAttachDocument from '@/components/ToogleSwitchAttachDocument.vue';
export default defineComponent({
  components: { ToogleSwitchAttachDocument },
  name: "AttachDocument",
  props: {
    QSID: {
      type: Number,
      default: -1
    }
  },
  setup(props) {
    const data = ref<any>({
      QSID: props.QSID,
      documentToAttachTo: {}
    });
    const documents = ref<Array<documentType>>(store.getters.getDocuments)

  
    const updateDocumentQuestionSet = (newStatus: any) => {
      data.value.documentToAttachTo[newStatus.did] = {
        status: newStatus.status
      }
    };

    const save = () => {
      console.log(data.value);
    }

    return {
      documents,
      updateDocumentQuestionSet,
      save
    }
  }
})
</script>
<style scoped>
.attachdocument {
  width: 100%;
  display: flex;
}
</style>