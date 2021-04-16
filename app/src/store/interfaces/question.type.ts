export enum QuestionTypeEnum {
  ShortText = 0,
  LongText,
  TrueFalse,
  MultipleChoice
}

// choice of option name, is because when we get the data in the backend, we will have them 
// in order, Option1, Option2, ...
// exp. earlier FalseOption came before TrueOption because of alphabetic order, and when user choose
// 0 as correct answer, i.e. first Option, but the correct answer was true option the indexing became wrong
export enum AnswerOptions {
  Option1 = 0,
  Option2,
  Option3,
  Option4
}

export type AnswerOption = {
  id: number;
  QuestionID: number;
  Answer: string;
}

export type ShortTextQuestionType = {
  Question: string;
  Answer: AnswerOption;
  CorrectAnswer?: number;
};

export type LongTextQuestionType = {
  Question: string;
  Answer: AnswerOption;
  CorrectAnswer?: number;
};

export type TrueFalseQuestionType = {
  Question: string;
  Answer: {
    Option1: AnswerOption;
    Option2: AnswerOption;
  };
  CorrectAnswer: number;
};

export type MultipleChoiceQuestionType = {
  Question: string;
  Answer: {
    Option1: AnswerOption;
    Option2: AnswerOption;
    Option3: AnswerOption;
    Option4: AnswerOption;
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

export enum QuestionSetFlag {
  CREATE = 0,
  UPDATE
}

export type QuestionSet = {
  QSID: number;
  Tittle: string;
  Description: string;
  QuestionSet: Array<Question>;
  CreateBy: number;
  LastEdited?: string;
  DocumentID: number[];
  CourseId: number[];
};
