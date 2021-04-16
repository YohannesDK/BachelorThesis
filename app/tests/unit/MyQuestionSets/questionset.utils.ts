import { LongTextQuestionType, MultipleChoiceQuestionType, QuestionSet, ShortTextQuestionType, TrueFalseQuestionType } from "@/store/interfaces/question.type";

export const dummyQuestionSet: QuestionSet = {
  QSID: 0,
  Tittle: "Test Question Set",
  Description: "Question set for testing",
  CreateBy: 1,
  QuestionSet: [
    {
      QuestionID: 0,
      QuestionType: 0,
      Question: {
        Question: "1+1",
        Answer: {
          id: -1,
          Answer: "2",
          QuestionID: 0
        }
      } as ShortTextQuestionType
    },
    {
      QuestionID: 1,
      QuestionType: 1,
      Question: {
        Question: "The answer is the question",
        Answer: {
          id: -1,
          Answer: "d",
          QuestionID: 0
        }
      } as LongTextQuestionType
    },
    {
      QuestionID: 2,
      QuestionType: 2,
      Question: {
        Question: "1<0",
        Answer: {
          Option1: {
            id: -1,
            Answer: "True",
            QuestionID: 0
          },
          Option2: {
            id: -1,
            Answer: "False",
            QuestionID: 0
          }
        },
        CorrectAnswer: 1
      } as TrueFalseQuestionType
    },
    {
      QuestionID: 3,
      QuestionType: 3,
      Question: {
        Question: "Choose 200",
        Answer: {
          Option1: {
            id: -1,
            Answer: "200",
            QuestionID: 0
          },
          Option2: {
            id: -1,
            Answer: "300",
            QuestionID: 0
          },
          Option3: {
            id: -1,
            Answer: "400",
            QuestionID: 0
          },
          Option4: {
            id: -1,
            Answer: "500",
            QuestionID: 0
          },
        },
        CorrectAnswer: 0
      } as MultipleChoiceQuestionType
    }
  ],
  LastEdited: "27 March 2021",
  DocumentID: [],
  CourseId: []
};
export const dummyQuestionSet2: QuestionSet = {
  QSID: 1,
  Tittle: "Test Question Set",
  Description: "Question set for testing",
  CreateBy: 1,
  QuestionSet: [
    {
      QuestionID: 0,
      QuestionType: 0,
      Question: {
        Question: "1+1",
        Answer: {
          id: -1,
          Answer: "2",
          QuestionID: 0
        }
      } as ShortTextQuestionType
    },
    {
      QuestionID: 1,
      QuestionType: 1,
      Question: {
        Question: "The answer is the question",
        Answer: {
          id: -1,
          Answer: "d",
          QuestionID: 0
        }
      } as LongTextQuestionType
    },
    {
      QuestionID: 2,
      QuestionType: 2,
      Question: {
        Question: "1<0",
        Answer: {
          Option1: {
            id: -1,
            Answer: "True",
            QuestionID: 0
          },
          Option2: {
            id: -1,
            Answer: "False",
            QuestionID: 0
          }
        },
        CorrectAnswer: 1
      } as TrueFalseQuestionType
    },
    {
      QuestionID: 3,
      QuestionType: 3,
      Question: {
        Question: "Choose 200",
        Answer: {
          Option1: {
            id: -1,
            Answer: "200",
            QuestionID: 0
          },
          Option2: {
            id: -1,
            Answer: "300",
            QuestionID: 0
          },
          Option3: {
            id: -1,
            Answer: "400",
            QuestionID: 0
          },
          Option4: {
            id: -1,
            Answer: "500",
            QuestionID: 0
          },
        },
        CorrectAnswer: 0
      } as MultipleChoiceQuestionType
    }
  ],
  LastEdited: "27 March 2021",
  DocumentID: [],
  CourseId: []
};
