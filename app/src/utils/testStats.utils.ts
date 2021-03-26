import store from "@/store";
import {
  Question,
  QuestionSet,
  QuestionTypeEnum
} from "@/store/interfaces/question.type";
import {
  TestData,
  SingleTestStat,
  TestStat,
  TestQuestionAndAnswer,
  TestStatAnswerCorrect
} from "../store/interfaces/QuestionTest.types";

export function SingeTestStatResult(
  QSID: number,
  TestQuestionAndAnswer: TestQuestionAndAnswer
): number {
  const qs: QuestionSet = store.getters.getQuestionSetById(QSID);
  let result = -1;

  if (qs) {
    qs.QuestionSet.find((question: Question) => {
      if (question.QuestionID === TestQuestionAndAnswer.QuestionID) {
        if (
          question.QuestionType === QuestionTypeEnum.ShortText ||
          question.QuestionType === QuestionTypeEnum.LongText
        ) {
          result =
            (question.Question.Answer as string).trim().toLowerCase() ===
            (TestQuestionAndAnswer.Answer as string).trim().toLowerCase()
              ? TestStatAnswerCorrect.CORRECT
              : TestStatAnswerCorrect.WRONG;
          return;
        }
        if (
          question.QuestionType === QuestionTypeEnum.TrueFalse ||
          question.QuestionType === QuestionTypeEnum.MultipleChoice
        ) {
          if (question.Question.CorrectAnswer !== undefined) {
            result =
              question.Question.CorrectAnswer ===
              (TestQuestionAndAnswer.Answer as number)
                ? TestStatAnswerCorrect.CORRECT
                : TestStatAnswerCorrect.WRONG;
          }
          return;
        }
      }
    });
    if (result && typeof result === "number") {
      return result;
    }
  }
  return result;
}

export function CreateSingleTestStat(
  QSID: number,
  TestQuestionAndAnswer: TestQuestionAndAnswer
): SingleTestStat {
  const SingleTestStat: SingleTestStat = {
    SingleTestStatID: store.getters.getSingleTestStatID,
    QuestionID: TestQuestionAndAnswer.QuestionID,
    Correct: TestStatAnswerCorrect.CORRECT
  };
  store.dispatch("IncrementSingleTestStatID");

  const correct = SingeTestStatResult(QSID, TestQuestionAndAnswer);
  if (correct !== -1) {
    SingleTestStat.Correct = correct;
  }

  return SingleTestStat;
}

export function CreateTestStat(
  TestStatID: number,
  TestData: TestData
): TestStat {
  const TestStat: TestStat = {
    TestStatID: TestStatID,
    TestID: TestData.TestID,
    TestStats: []
  };

  TestData.TestData.forEach((test: TestQuestionAndAnswer) => {
    const SingleTestStat: SingleTestStat = CreateSingleTestStat(
      TestData.QSID,
      test
    );
    TestStat.TestStats.push(SingleTestStat);
  });

  return TestStat;
}
