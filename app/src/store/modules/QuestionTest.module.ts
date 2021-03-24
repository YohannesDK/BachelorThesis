import { TestQuestionAndAnswer, TestData } from "../interfaces/QuestionTest.types";

export default {
  state: {
    TestID: 0,
    TestData: [] as TestData[]
  },
  mutations: {
    IncrementTestID: (state: any) => {
      state.TestID++;
    },
    AddTestData: (state: any, TestData: TestData) => {
      state.TestData.push(TestData)
    }
  },
  actions: {
    IncrementTestID: (context: any) => {
      context.commit("IncrementTestID");
    },
    AddTestData: (context: any, TestData: TestData) => {
      context.commit("AddTestData", TestData)
    }
  },
  getters: {
    getTestID: (state: any) => {
      return state.TestID
    }
  }
}