import store from "@/store";
import {
  Question,
  QuestionSet,
  QuestionTypeEnum,
  ShortTextQuestionType
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
  TestQuestionAndAnswer: TestQuestionAndAnswer,
  courseQS = false
): number {
  let qs!: QuestionSet;
  let result = -1;

  if (courseQS) {
    qs = store.getters.getCourseQuestionSetById(QSID);
    if (!qs) {
      qs = store.getters.getCourseDocumentQuestionSetById(QSID);
    }
  } else {
    qs = store.getters.getQuestionSetById(QSID)
  }

  if (qs) {
    qs.QuestionSet.find((question: Question) => {
      if (question.QuestionID === TestQuestionAndAnswer.QuestionID) {
        if (
          question.QuestionType === QuestionTypeEnum.ShortText ||
          question.QuestionType === QuestionTypeEnum.LongText
        ) {
          result =
            (question.Question as ShortTextQuestionType).Answer.Answer.trim().toLowerCase() ===
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
  TestQuestionAndAnswer: TestQuestionAndAnswer,
  courseQS = false
): SingleTestStat {
  const SingleTestStat: SingleTestStat = {
    SingleTestStatID: -1,
    QuestionID: TestQuestionAndAnswer.QuestionID,
    Correct: TestStatAnswerCorrect.CORRECT
  };

  const correct = SingeTestStatResult(QSID, TestQuestionAndAnswer, courseQS);
  if (correct !== -1) {
    SingleTestStat.Correct = correct;
  }

  return SingleTestStat;
}

export function CreateTestStat(
  TestData: TestData,
): [TestStat, number] {
  let score = 0;
  const TestStat: TestStat = {
    TestStatID: -1,
    TestID: TestData.TestID,
    TestStats: []
  };

  TestData.TestData.forEach((test: TestQuestionAndAnswer) => {
    const SingleTestStat: SingleTestStat = CreateSingleTestStat(
      TestData.QSID,
      test,
      TestData.courseID !== -1
    );
    score += SingleTestStat.Correct;
    TestStat.TestStats.push(SingleTestStat);
  });

  return [TestStat, score];
}
