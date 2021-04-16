import store from "@/store";
import { QuestionSet, QuestionSetFlag } from "@/store/interfaces/question.type";
import { datify } from "@/utils/calender.utils";
import { AxiosResponse } from "axios";
import axios from "../api";



// creates a new Question Set
export function createQuestionSet(newquestionSet: QuestionSet) {
  console.log(newquestionSet)
  axios
    .post("/createQuestionSet", {
      newquestionSet: newquestionSet
    }).then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        const QuestionSet = response.data.QuestionSet;
        if (QuestionSet) {
          store.dispatch("UpdateQuestionSets", QuestionSet);
        }
      }
    })
}


// updates a question set
export function UpdateQuestionSet(EditedData: any) {
  axios
    .post("/updateQuestionSet", {
      EditedData: EditedData
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        const updatedQuestionSet = response.data.updatedQuestionSet;
        if (updatedQuestionSet) {
          store.dispatch("UpdateQuestionSets", updatedQuestionSet);
        }
      }
    })
}

// deletes a entire Question Set
export function DeleteQuestionSet(questionset: QuestionSet) {
  return "Not Implemented"
}


// gets all questions sets
export function GetAllQuestionSets() {
  axios
  .get("/getAllQuestionSets", {
    headers: {
      token: localStorage.getItem("token")
    }
  }).then((response: AxiosResponse) => {
    if (response.status && response.status === 200) {
      const QuestionSets = response.data.QuestionSets;
      if (QuestionSets) {
        QuestionSets.forEach((questionset: QuestionSet) => {
          questionset.LastEdited = datify(questionset.LastEdited as string);
          store.dispatch("UpdateQuestionSets", questionset) 
        });
      }
    }
  })

}


export function FetchQS(QSID: number) {
  //  axios
  //     .get("/api/fetchQS", {
  //       params: { QSID: router.currentRoute.value.query.QSID }
  //     })
  //     .then(response => {
  //       // questionSetInfo.title = response.data.questionset.title;
  //       // questionSetInfo.description = response.data.questionset.description;
  //       //if this questionset has pre-existing questions, fetch them
  //       if (response.data.questions.length !== 0) {
  //         const QuestionSet: QuestionSet = store.getters.getQuestionSetById(
  //           QSID
  //         );
  //         for (let i = 0; i < response.data.questions.length; i++) {
  //           if (response.data.questions[i].question_type == 2) {
  //             Data.value.QuestionSet.push({
  //               QuestionID: response.data.questions[i].question_id,
  //               QuestionType: response.data.questions[i].question_type,
  //               Question: {
  //                 Question: response.data.questions[i].question,
  //                 Answer: {
  //                   TrueOption: "True",
  //                   FalseOption: "False"
  //                 },
  //                 CorrectAnswer: 2
  //               }
  //             });
  //           } else {
  //             console.log("was popin");
  //             console.log(response.data);
  //             Data.value.QuestionSet.push({
  //               QuestionID: response.data.questions[i].question_id,
  //               QuestionType: response.data.questions[i].question_type,
  //               Question: {
  //                 Question: response.data.questions[i].question,
  //                 Answer: ""
  //               }
  //             });
  //           }
  //         }
  //         //Here we set the answer for shortanswer questions (Can also be used to set for longanswer)
  //         //But it does not work for multiple choice / true false, therefore we have to check for it
  //         for (let i = 0; i < response.data.questions.length; i++) {
  //           for (let j = 0; j < response.data.answer.length; j++) {
  //             if (
  //               response.data.questions[i].question_id ==
  //                 response.data.answer[j].answerset_id &&
  //               response.data.questions[i].question_type == 0
  //             ) {
  //               console.log(response.data.answer[j].answer_option);
  //               Data.value.QuestionSet[i].Question.Answer =
  //                 response.data.answer[j].answer_option;
  //             }
  //           }
  //         }
  //         return;
  //       } else {
  //         //if the questionset is empty, initialize it with an empty question
  //         console.log("hmm");
  //         Data.value.QSID = store.getters.getQuestionSetLength;
  //         Data.value.CreateBy = User.value.UserName;
  //         OnAddNew();
  //       }
  //     });
}

export function SaveQS(QuestionSet: QuestionSet, questionSetFlag: number) {
  console.log(QuestionSet);
  console.log(questionSetFlag);
  // Send entire QuestionSet to backend and process it there instead
  // Depending on flag we send different save / update requests

  //Post request to save the document info
  // axios
  //   .post("/api/saveQuestion", {
  //     question: questionData.Question.Question,
  //     answer: questionData.Question.Answer,
  //     title: questionSetInfo.title,
  //     description: questionSetInfo.description,
  //     questionId: questionData.QuestionID,
  //     questionType: questionData.QuestionType,
  //     answerOption: questionData.Question.Answer,
  //     QSID: router.currentRoute.value.query.QSID
  //   })
  //   .then(response => {
  //     console.log("updated");
  //   });
}
