import { QuestionTypeEnum } from "./question.type";

export enum TestStatAnswerCorrect {
  WRONG = 0,
  CORRECT
}

export type SingleTestStat = {
  SingleTestStatID: number;
  QuestionID: number;
  Correct: TestStatAnswerCorrect.CORRECT | TestStatAnswerCorrect.WRONG;
};

export type TestStat = {
  TestStatID: number;
  TestID: number;
  TestStats: SingleTestStat[];
};

export type TestQuestionAndAnswer = {
  QuestionType:
    | QuestionTypeEnum.ShortText
    | QuestionTypeEnum.LongText
    | QuestionTypeEnum.TrueFalse
    | QuestionTypeEnum.MultipleChoice;
  QuestionID: number;
  Answer: string | number;
};

export type TestData = {
  TestID: number;
  QSID: number;
  userID: number;
  date: Date;
  TestData: TestQuestionAndAnswer[];
};
