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
        v-for="qs in searchedQuestionSets"
        :key="qs"
      >
        <toogle-switch-attach-document
          :QSID="qs.QSID"
          :QuestionSetName="qs.questionsetName"
          :attached="qs.status"
          :toogleSwitchType="1"
          @update="UpdateCourseQuestionSets"
        />
      </li>
      <p class="m-auto" v-if="searchedQuestionSets.length === 0">
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
import { Question, QuestionSet } from '@/store/interfaces/question.type';
export default defineComponent({
  name: "AddQuestionSetToCourse",
  props: {
    courseID: {
      type: Number,
      default: -1
    },
    courseQuestionSets: {
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
      questionsets: {}
    })

    const QuestionSet: Ref<QuestionSet[]> = ref(store.getters.getAllQuestionSets);
    const attachedQuestionSets = ref<Array<any>>([]);


    const InitAttachments = () => {
      QuestionSet.value.forEach((qs: QuestionSet) => {
        const index = props.courseQuestionSets.map((qsid: number) => qsid).indexOf(
          qs.QSID
        );
        console.log(qs.Tittle)

        attachedQuestionSets.value.push({
          QSID: qs.QSID,
          questionsetName: qs.Tittle,
          status: true
        });

        if (index === -1) {
          attachedQuestionSets.value[
            attachedQuestionSets.value.length - 1
          ].status = false;
        }
      });
    };

    const searchedQuestionSets = computed(() => {
      if (searchvalue.value !== "") {
        return attachedQuestionSets.value.filter((ele: any) => {
          return ele.questionsetName
            .replace(/ /g, "")
            .toUpperCase()
            .includes(searchvalue.value.replace(/ /g, "").toUpperCase());
        });
      }
      return attachedQuestionSets.value;
    });


    const UpdateCourseQuestionSets = (newStatus: any) => {
      saved.value = false;
      data.value.questionsets[newStatus.QSID] = {
        status: newStatus.status
      }
    }

    const save = () => {
      saved.value = true;
      console.log(data.value)

      for (const QSID in data.value.questionsets) {
        if (Object.prototype.hasOwnProperty.call(data.value.questionsets, QSID)) {
          const status = data.value.questionsets[QSID].status;
          if (status === true) {
            const QS: QuestionSet | undefined = QuestionSet.value.find((qs: QuestionSet) => qs.QSID === Number(QSID));
            if (QS) {
              store.dispatch("AddCourseQuestionSets", QS);
              store.dispatch("LinkQuestionSetToCourse", {courseID: props.courseID, QSID: Number(QSID)});

            }
          } 
          else if (status === false) {
            store.dispatch("RemoveQuestionSetFromCourse", {courseID: props.courseID, QSID: Number(QSID)});
          }
        }
      }
      // emit("documentsUpdated");
    }


    onMounted(() => {
      InitAttachments();
    })
    return {
      QuestionSet,
      searchvalue,
      searchedQuestionSets,
      save,
      saved,
      UpdateCourseQuestionSets
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
