import { QuestionTypeEnum } from "./question.type";

export type TestQuestionAndAnswer = {
  QuestionType: QuestionTypeEnum.ShortText | QuestionTypeEnum.LongText | QuestionTypeEnum.TrueFalse | QuestionTypeEnum.MultipleChoice;
  QuestionID: number;
  Answer: string | number;
};

export type TestData = {
  TestID: number;
  QSID: number;
  userName: string;
  date: Date;
  TestData: TestQuestionAndAnswer[];
}; 