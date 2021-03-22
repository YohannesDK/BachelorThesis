<template>
  <div class="dv">
    <h1>take test</h1>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import store from '@/store'
import { QuestionSet } from "@/store/interfaces/question.type";
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: "TakeTest",
  setup(){

    const QuestionSet =  ref<QuestionSet>({
      QSID: -1,
      Tittle: "",
      Description: "",
      QuestionSet: [],
      CreateBy: "",
      LastEdited: "",
      DocumentID: [],
      CourseId: []
    })

    const InitilizeTest = () => {
      if (router.currentRoute.value.query.QSID) {
        const qs: QuestionSet = store.getters.getQuestionSetById(Number(router.currentRoute.value.query.QSID))
        console.log(qs);
      }
    }

    onMounted(() => {
      store.dispatch("loading", true)
      setTimeout(() => {
        // while fetching all data
        store.dispatch("loading", false)
        InitilizeTest()
        
      }, 1000);
    })

    return {
      QuestionSet
    }
  }
})
</script>