import { QuestionSet } from "@/store/interfaces/question.type";

export const dummyQuestionSet: QuestionSet = {
  QSID: 0,
  Tittle: "Test Question Set",
  Description: "Question set for testing",
  CreateBy: "Yoha123",
  QuestionSet: [
    {
      QuestionID: 0,
      QuestionType: 0,
      Question: {
        Question: "1+1",
        Answer: "2"
      }
    },
    {
      QuestionID: 1,
      QuestionType: 1,
      Question: {
        Question: "The answer is the question",
        Answer: "The answer is the question"
      }
    },
    {
      QuestionID: 2,
      QuestionType: 2,
      Question: {
        Question: "1<0",
        Answer: {
          TrueOption: "True",
          FalseOption: "False"
        },
        CorrectAnswer: 1
      }
    },
    {
      QuestionID: 3,
      QuestionType: 3,
      Question: {
        Question: "Choose 200",
        Answer: {
          Option1: "200",
          Option2: "500",
          Option3: "400",
          Option4: "300"
        },
        CorrectAnswer: 0
      }
    }
  ],
  LastEdited: "27 March 2021",
  DocumentID: [],
  CourseId: []
};
