export enum QuestionTypeEnum {
  ShortText = 0,
  LongText,
  TrueFalse,
  MultipleChoice
}

export enum AnswerOptions {
  Option1 = 0,
  Option2,
  Option3,
  Option4
}

export type ShortTextQuestionType = {
  Question: string;
  Answer: string;
  CorrectAnswer?: number;
};

export type LongTextQuestionType = {
  Question: string;
  Answer: string;
  CorrectAnswer?: number;
};

export type TrueFalseQuestionType = {
  Question: string;
  Answer: {
    TrueOption: string;
    FalseOption: string;
  };
  CorrectAnswer: number;
};

export type MultipleChoiceQuestionType = {
  Question: string;
  Answer: {
    Option1: string;
    Option2: string;
    Option3: string;
    Option4: string;
  };
  CorrectAnswer: number;
};

export type Question = {
  QuestionID: number;
  QuestionType:
    | QuestionTypeEnum.ShortText
    | QuestionTypeEnum.LongText
    | QuestionTypeEnum.TrueFalse
    | QuestionTypeEnum.MultipleChoice;
  Question:
    | ShortTextQuestionType
    | LongTextQuestionType
    | TrueFalseQuestionType
    | MultipleChoiceQuestionType;
};

export type QuestionSet = {
  QSID: number;
  Tittle: string;
  Description: string;
  QuestionSet: Array<Question>;
  LastEdited?: string;
  DocumentID: number[];
  CourseId: number[];
};
