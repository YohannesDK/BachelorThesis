import { TestData } from "../interfaces/QuestionTest.types";

export default {
  state: {
    TestID: 0,
    TestData: [] as TestData[]
  },
  mutations: {
    AddTestData: (state: any, TestData: TestData) => {
      const TestDataIndex = (state.TestData as TestData[]).map((td: TestData) => td.TestID)
        .indexOf(TestData.TestID);

      if (TestDataIndex === -1) {
        state.TestData.push(TestData);
      } else{
        state.TestData[TestDataIndex] = TestData
      }
    },
    unLoadQuestionTestModule: (state: any) => {
      state.TestID = 0;
      state.TestData.length = 0;
    }
  },
  actions: {
    AddTestData: (context: any, TestData: TestData) => {
      context.commit("AddTestData", TestData);
    },
    unLoadQuestionTestModule: (context: any) => {
      context.commit("unLoadQuestionTestModule");
    }
  },
  getters: {
    getTestID: (state: any) => {
      return state.TestID;
    },
    getAllTestData: (state: any) => {
      return state.TestData;
    },
    getTestDataById: (state: any, testID: number) => {
      const testData: TestData[] = [];
      (state.TestData as TestData[]).forEach((test: TestData) => {
        if (test.TestID === testID) {
          testData.push(test);
        }
      });
      return testData;
    },
    getTestDataByUserName: (state: any, userID: number) => {
      const testData: TestData[] = [];
      (state.TestData as TestData[]).forEach((test: TestData) => {
        if (test.userID === userID) {
          testData.push(test);
        }
      });
      return testData;
    }
  }
};
