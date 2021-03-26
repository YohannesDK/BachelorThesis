import {
  TestQuestionAndAnswer,
  TestData,
  TestStat,
  SingleTestStat
} from "../interfaces/QuestionTest.types";
import { CreateTestStat } from "@/utils/testStats.utils";

export default {
  state: {
    TestStatID: 0,
    SingleTestStatID: 0,
    TestStats: [] as TestStat[]
  },
  mutations: {
    IncrementTestStatID: (state: any) => {
      state.TestStatID++;
    },
    IncrementSingleTestStatID: (state: any) => {
      state.SingleTestStatID++;
    },
    AddNewTestStat: (state: any, TestData: TestData) => {
      const TestStat: TestStat = CreateTestStat(state.TestStatID, TestData);
      (state.TestStats as TestStat[]).push(TestStat);
    }
  },
  actions: {
    IncrementTestStatID: (context: any) => {
      context.commit("IncrementTestStatID");
    },
    IncrementSingleTestStatID: (context: any) => {
      context.commit("IncrementSingleTestStatID");
    },
    AddNewTestStat: (context: any, TestData: TestData) => {
      context.commit("IncrementTestStatID");
      context.commit("AddNewTestStat", TestData);
    }
  },
  getters: {
    getSingleTestStatID: (state: any) => {
      return state.SingleTestStatID;
    },
    getAllTestStats: (state: any) => {
      return state.TestStats;
    },
    getTestStatsByTestID: (state: any, TestID: number) => {
      return (
        (state.TestStats as TestStat[]).find(
          (TestStat: TestStat) => TestStat.TestID === TestID
        ) || -1
      );
    }
  }
};
