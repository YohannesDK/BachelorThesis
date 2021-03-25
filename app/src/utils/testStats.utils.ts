import store from "@/store";
import { TestData, SingleTestStat, TestStat, TestQuestionAndAnswer, TestStatAnswerCorrect } from "../store/interfaces/QuestionTest.types";


export function SingeTestStatResult(QSID: number) {
  
}

export function CreateSingleTestStat(QSID: number, TestQuestionAndAnswer: TestQuestionAndAnswer): SingleTestStat {
  store.dispatch("IncrementSingleTestStatID");
  const SingleTestStat: SingleTestStat = {
    SingleTestStatID: store.getters.getSingleTestStatID,
    QuestionID: TestQuestionAndAnswer.QuestionID,
    Correct: TestStatAnswerCorrect.CORRECT 
  }

  return SingleTestStat;
}

export function CreateTestStat(TestStatID: number, TestData: TestData) : TestStat {
  const TestStat: TestStat = {
    TestStatID: TestStatID,
    TestID: TestData.TestID,
    TestStats: []
  };

  TestData.TestData.forEach((test: TestQuestionAndAnswer) => {
    const SingleTestStat: SingleTestStat = CreateSingleTestStat(TestData.QSID, test);
    TestStat.TestStats.push(SingleTestStat);
  })

  return TestStat;
}