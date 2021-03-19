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
          QS.DocumentID = QuestionSet.DocumentID;
          QS.CourseId = QuestionSet.CourseId;
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
      const index = state.QuestionSets.map(
        (item: QuestionSet) => item.QSID
      ).indexOf(QSID);
      if (index > -1) {
        state.QuestionSets.splice(index, 1);
      }
    },
    AttachDocumentToQuestionSet: (state: any, data: any) => {
      console.log(data);
      const index = state.QuestionSets.map(
        (item: QuestionSet) => item.QSID
      ).indexOf(data.QSID);
      if (index > -1) {
        const questionset: QuestionSet = state.QuestionSets[index];
        const existsAtIndex = questionset.DocumentID.map(
          (docid: number) => docid
        ).indexOf(data.documentid);

        if (existsAtIndex === -1) {
          console.log("her");
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
    AddNewQuestionSet: (context: any, QuestionSet: QuestionSet) => {
      context.commit("AddNewQuestionSet", QuestionSet);
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
