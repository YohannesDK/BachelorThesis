import { TestData } from "../interfaces/QuestionTest.types";

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
      state.TestData.push(TestData);
    }
  },
  actions: {
    IncrementTestID: (context: any) => {
      context.commit("IncrementTestID");
    },
    AddTestData: (context: any, TestData: TestData) => {
      context.commit("AddTestData", TestData);
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
    getTestDataByUserName: (state: any, userName: string) => {
      const testData: TestData[] = [];
      (state.TestData as TestData[]).forEach((test: TestData) => {
        if (test.userName === userName) {
          testData.push(test);
        }
      });
      return testData;
    }
  }
};
