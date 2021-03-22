<template>
  <div class="container">
    <question-set-card v-for="(question, index) in QuestionSet.QuestionSet"
    :key="question"
    :index="index"
    :focus="index === 0"
    :QuestionProp="question"
    :QuestionCardType="1"
    />
    <h1>take test</h1>
  </div>
</template>

<script lang="ts">
import QuestionSetCard from '@/components/QuestionSetCard.vue';
import router from '@/router'
import store from '@/store'
import { QuestionSet } from "@/store/interfaces/question.type";
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  components: { QuestionSetCard },
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
        QuestionSet.value.QSID = qs.QSID
        QuestionSet.value.Tittle = qs.Tittle
        QuestionSet.value.Description = qs.Description
        QuestionSet.value.QuestionSet = qs.QuestionSet
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