<template>
  <div @click="OpenQuestionSet()"
  class="qs-item shadow-sm"
  >
    <div class="qs-item-thumbnail">
      <fa icon="question" size="lg" />
    </div>
    <div class="qs-data">
      <div class="qs-data-inner">
        <span class="qs-data-inner-desc">{{questionset.Tittle}}</span>
      </div>
      <div class="qs-data-inner">
        <span class="qs-data-inner-desc">Questions -</span>
        <span class="qs-data-inner-value">{{questionset.QuestionSet.length}}</span>
      </div>
      <div class="qs-data-inner">
        <span class="qs-data-inner-desc">Edited -</span>
        <span class="qs-data-inner-value">{{questionset.LastEdited}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { QuestionSet } from '@/store/interfaces/question.type'
import { defineComponent } from 'vue'

export default defineComponent({
  name: "QsCard",
  props: {
    questionset: Object as () => QuestionSet,
    default: () => ({})
  },
  setup(props) {
    
    const OpenQuestionSet = () => {
      if (props.questionset) {
        router.push({
          name: "AddQuestionSet",
          query: { QSID: props.questionset.QSID }
        });
      }
    }

    return {
      OpenQuestionSet
    }
  },
})
</script>


<style scoped>
.qs-item {
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
  overflow: hidden;
}

.qs-item:hover {
  cursor: pointer;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
}

.qs-item-thumbnail {
  background: linear-gradient(45deg, white, whitesmoke);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 60%;
  width: 176px;
  background-repeat: no-repeat;
  background-size: 208px auto;
  border: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6%;
  font-size: 0.77em;
  padding-top: 13%;
  overflow-x: hidden;
}

.qs-data {
  display: flex;
  width: 100%;
  padding: 0 6%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.qs-data-inner {
  display: flex;
  width: 100%;
  padding: 0 2%;
  font-size: 14px;
}

.qs-data-inner-desc {
  margin-right: 10px;
  font-weight: 500;
}
</style>