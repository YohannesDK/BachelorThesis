import { QuestionSet } from "../interfaces/question.type";

export default {
  state: {
    QuestionId: 0,
    QuestionSets: [] as QuestionSet[]
  },
  mutations: {
    AddNewQuestionSet: (state: any, QuestionSet: QuestionSet) => {
      let found = false;
      state.QuestionSets.forEach((QS: QuestionSet) => {
        if (QS.QSID === QuestionSet.QSID) {
          found = true;
          QS.Description = QuestionSet.Description;
          QS.Tittle = QuestionSet.Tittle;
          QS.QuestionSet = QuestionSet.QuestionSet;
        }
      });
      if (!found) {
        state.QuestionSets.push(QuestionSet);
      }
    },
    IncrementQuestionId: (state: any) => {
      state.QuestionId++;
    },
    DeleteQuestionSet: (state: any, QSID: number) => {
      const index = state.QuestionSets.map((item: QuestionSet) => item.QSID).indexOf(QSID)
      if (index > -1) {
        state.QuestionSets.splice(index, 1)
      }
    }
  },
  actions: {
    AddNewQuestionSet: (context: any, QuestionSet: QuestionSet) => {
      context.commit("AddNewQuestionSet", QuestionSet);
    },
    IncrementQuestionId: (context: any) => {
      context.commit("IncrementQuestionId");
    },
    DeleteQuestionSet: (context: any, QSID: number) => {
      context.commit("DeleteQuestionSet", QSID)
    }
    
  },
  getters: {
    getAllQuestionSets: (state: any) => {
      return state.QuestionSets;
    },
    getQuestionSetById: (state: any) => (QSID: number) => {
      return state.QuestionSets.find(
        (questionSet: QuestionSet) => questionSet.QSID === QSID
      );
    },
    getQuestionSetLength: (state: any) => {
      return state.QuestionSets.length;
    },
    getQuestionId: (state: any) => {
      return state.QuestionId;
    }
  }
};
