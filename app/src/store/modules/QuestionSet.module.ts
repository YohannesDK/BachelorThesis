import { QuestionSet } from "../interfaces/question.type";

export default {
  state: {
    QuestionId: 0,
    QuestionSets: [] as QuestionSet[]
  },
  mutations: {
    UpdateQuestionSets: (state: any, newQuestionSet: QuestionSet) => {
      const QsIndex: number = state.QuestionSets
        .map((QS: QuestionSet) => QS.QSID)
        .indexOf(newQuestionSet.QSID);

      if (QsIndex === -1) {
        state.QuestionSets.push(newQuestionSet);
      } else {
        (state.QuestionSets[QsIndex] as QuestionSet) = newQuestionSet;
      }
    },
    IncrementQuestionId: (state: any) => {
      state.QuestionId++;
    },
    DeleteQuestionSet: (state: any, QSID: number) => {
      const index = state.QuestionSets.map(
        (item: QuestionSet) => item.QSID
      ).indexOf(QSID);
      if (index > -1) {
        state.QuestionSets.splice(index, 1);
      }
    },
    AttachDocumentToQuestionSet: (state: any, data: any) => {
      const index = state.QuestionSets.map(
        (item: QuestionSet) => item.QSID
      ).indexOf(data.QSID);
      if (index > -1) {
        const questionset: QuestionSet = state.QuestionSets[index];
        const existsAtIndex = questionset.DocumentID.map(
          (docid: number) => docid
        ).indexOf(data.documentid);

        if (existsAtIndex === -1) {
          state.QuestionSets[index].DocumentID.push(data.documentid);
        }
      }
    },
    RemoveDocumentFromQuestionSet: (state: any, data: any) => {
      const index = state.QuestionSets.map(
        (item: QuestionSet) => item.QSID
      ).indexOf(data.QSID);
      if (index > -1) {
        const questionset: QuestionSet = state.QuestionSets[index];
        const docindex = questionset.DocumentID.map(
          (docid: number) => docid
        ).indexOf(data.documentid);
        if (docindex > -1) {
          questionset.DocumentID.splice(docindex, 1);
        }
      }
    }
  },
  actions: {
    UpdateQuestionSets: (context: any, QuestionSet: QuestionSet) => {
      context.commit("UpdateQuestionSets", QuestionSet);
    },
    IncrementQuestionId: (context: any) => {
      context.commit("IncrementQuestionId");
    },
    DeleteQuestionSet: (context: any, QSID: number) => {
      context.commit("DeleteQuestionSet", QSID);
    },
    AttachDocumentToQuestionSet: (context: any, data: any) => {
      context.commit("AttachDocumentToQuestionSet", data);
    },
    RemoveDocumentFromQuestionSet: (context: any, data: any) => {
      context.commit("RemoveDocumentFromQuestionSet", data);
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
