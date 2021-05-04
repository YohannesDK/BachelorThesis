//Create functions here
const models = require("../models/index.js");
const questionset_helpers = require("./helpers/questionsets.helper");

const jwt = require("jsonwebtoken");

//Creates a questionset
const createQuestionSet = (request, response) => {
    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });
    });

    // define QuestionSet, which we will manipulate
    const QuestionSet = request.body.newquestionSet;

    if (QuestionSet === undefined) {
        return response.sendStatus(400);
    }

    models.QuestionSet.create({
        title: QuestionSet.Tittle,
        description: QuestionSet.Description,
        createdBy: QuestionSet.CreateBy
    }).then(async (createdQuestionSet) => {
        // assign questionset_id
        QuestionSet.QSID = createdQuestionSet.questionset_id;

        // create questions
        await Promise.all(QuestionSet.QuestionSet.map(async (question, index) => {

            // TODO - everyting below should be extracted to a single function
            //        so that we can reuse it in other functions, single responsibility principle as well
            // correct answer is -1 for short and long text questions
            let correct_answer = -1;

            // if question is type of true/false or multiple choice, get correct_answer
            if (question.QuestionType === 2 || question.QuestionType === 3) {
                correct_answer = question.Question.CorrectAnswer;
            }


            // create Question
            let createdQuestion = await models.Question.create({
                questionset_id: createdQuestionSet.questionset_id,
                question: question.Question.Question,
                question_type: question.QuestionType,
                correct_answer: correct_answer
            });

            // set question id
            QuestionSet.QuestionSet[index].QuestionID = createdQuestion.question_id;

            // if question is type of short answer, or long answer, no need to loop through answers
            if (question.QuestionType === 0 || question.QuestionType === 1 ) {
                let createdAnswer = await models.Answers.create({
                    question_id: createdQuestion.question_id,
                    answer_option: question.Question.Answer.Answer
                });

                // set newly created answer and question id
                QuestionSet.QuestionSet[index].Question.Answer.id = createdAnswer.answer_id;
                QuestionSet.QuestionSet[index].Question.Answer.QuestionID = createdAnswer.question_id;
            }

            // if question is type of true/false, or multiple choice, need to loop through answers
            if (question.QuestionType === 2 || question.QuestionType === 3 ) {
                let Options = Object.keys(question.Question.Answer);
                await Promise.all(Options.map(async (option) => {

                    // create answer for each option
                    let createdAnswer = await models.Answers.create({
                        question_id: createdQuestion.question_id,
                        answer_option: question.Question.Answer[option].Answer
                    });

                    // set newly created answer and question id
                    QuestionSet.QuestionSet[index].Question.Answer[option].id = createdAnswer.answer_id;
                    QuestionSet.QuestionSet[index].Question.Answer[option].QuestionID = createdAnswer.question_id;
                }));

            }


        }));

        return response.status(200).json({
            QuestionSet: QuestionSet
        });

    });
};

// updates a questionset
const updateQuestionSet = async (request, response) => {
    const QuestionSet = request.body.EditedData.QuestionSetData;
    const updatedQuestions = request.body.EditedData.updatedQuestions;
    const deletedQuestions = request.body.EditedData.deletedQuestions;

    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded) => {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });
    });

    // update tittle and description
    await models.QuestionSet.update({description: QuestionSet.Description, title: QuestionSet.Tittle},
        {where: {questionset_id: QuestionSet.QSID}});

    
    await Promise.all(QuestionSet.QuestionSet.map(async(question, question_index) => {

        // user has added new question
        if (question.QuestionID === -1) {
            
            // TODO - everyting below should be extracted to a single function
            //        so that we can reuse it in other functions, single responsibility principle as well
            // correct answer is -1 for short and long text questions
            let correct_answer = -1;

            // if question is type of true/false or multiple choice, get correct_answer
            if (question.QuestionType === 2 || question.QuestionType === 3) {
                correct_answer = question.Question.CorrectAnswer;
            }

            // create Question
            let createdQuestion = await models.Question.create({
                questionset_id: QuestionSet.QSID,
                question: question.Question.Question,
                question_type: question.QuestionType,
                correct_answer: correct_answer
            });

            // set question id
            QuestionSet.QuestionSet[question_index].QuestionID = createdQuestion.question_id;

            
            // if question is type of short answer, or long answer, no need to loop through answers
            if (question.QuestionType === 0 || question.QuestionType === 1 ) {
                let createdAnswer = await models.Answers.create({
                    question_id: createdQuestion.question_id,
                    answer_option: question.Question.Answer.Answer
                });

                // set newly created answer and question id
                QuestionSet.QuestionSet[question_index].Question.Answer.id = createdAnswer.answer_id;
                QuestionSet.QuestionSet[question_index].Question.Answer.QuestionID = createdAnswer.question_id;
            }

            if (question.QuestionType === 2 || question.QuestionType === 3 ) {
                let Options = Object.keys(question.Question.Answer);
                await Promise.all(Options.map(async (option) => {

                    // create answer for each option
                    let createdAnswer = await models.Answers.create({
                        question_id: createdQuestion.question_id,
                        answer_option: question.Question.Answer[option].Answer
                    });

                    // set newly created answer and question id
                    QuestionSet.QuestionSet[question_index].Question.Answer[option].id = createdAnswer.answer_id;
                    QuestionSet.QuestionSet[question_index].Question.Answer[option].QuestionID = createdAnswer.question_id;
                }));

            }
        }

        // user has updated something about this question
        if (String(question.QuestionID) in updatedQuestions) {
            let correct_answer = -1;

            // if question is type of true/false or multiple choice, get correct_answer
            if (question.QuestionType === 2 || question.QuestionType === 3) {
                correct_answer = question.Question.CorrectAnswer;
            }


            // update question data
            await models.Question.update({
                question: question.Question.Question,
                question_type: question.QuestionType,
                correct_answer: correct_answer
            }, {
                where: {
                    question_id: question.QuestionID
                }
            });

            if (question.QuestionType === 0 || question.QuestionType === 1) {
                await models.Answers.update({
                    answer_option: question.Question.Answer.Answer
                }, {
                    where: {
                        answer_id: question.Question.Answer.id
                    }
                });
            }

            if (question.QuestionType === 2 || question.QuestionType === 3) {
                await Promise.all(Object.keys(question.Question.Answer).map(async (option) => {
                    let answer = question.Question.Answer[option];
                    await models.Answers.update({
                        answer_option: answer.Answer
                    }, {
                        where: {
                            answer_id: answer.id
                        }
                    });
                }));
            }
        }

        // user has deleted this question
        if (String(question.QuestionID) in deletedQuestions) {
            // delete all answers that belong to a question 
            await models.Answer.destroy({where: {question_id: question.QuestionID}});
            // await Promise.all(Object.keys(deletedsections).map(async (sectionID) => {
            // }));
        }

    }));

    return response.status(200).json({
        updatedQuestionSet: QuestionSet
    });
};

// Gets a users QuestionSets
const getQuestionSets = (request, response) => {
    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded )=> {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        const questiosets = await questionset_helpers.select_questionsets_helper({createdBy: decoded.id})

        if (questiosets !== null) {
            return response.status(200).json({
                QuestionSets: questiosets
            });
        } else {
            return response.sendStatus(400);
        }
    });
};

// TODO -fix this
// deletes questionset
const deleteQuestionSet = (request, response) => {
    return "not implemented";
};

const AssignQuestionSetToDocument = async (request, response) => {
    const QSID = request.body.QSID;
    const DocumentID = request.body.did;

    await models.QuestionsetDocumentRelation.findOrCreate({
      where:{
        questionset_id: QSID,
        document_id: DocumentID
      },
      defaults: {
        questionset_id: QSID,
        document_id: DocumentID
      }
    }).then(() => {
      return response.sendStatus(200);
    }).catch((e) => {
      console.error(e);
      return response.sendStatus(400);
    });
};

const RemoveQuestionSetFromDocument = async (request, response) => {
    const QSID = request.body.QSID;
    const DocumentID = request.body.did;

    await models.QuestionsetDocumentRelation.destroy({
      where: {
        questionset_id: QSID,
        document_id: DocumentID
      }
    }).then((result) => {
      console.log(result);
      return response.sendStatus(200);
    }).catch((e) => {
      console.error(e);
      return response.sendStatus(400);
    });
};


const AssignQuestionSetToCourse = async (request, response) => {
    const QSID = request.body.QSID;
    const CourseID = request.body.CourseID;

    await models.CourseQuestionSetRelation.findOrCreate({
        where: {
            CourseID: CourseID,
            QuestionSetID: QSID
        },
        defaults: {
            CourseID: CourseID,
            QuestionSetID: QSID
        }
    }).then(() => {
        return response.sendStatus(200);
    }).catch((e) => {
        console.error(e);
        return response.sendStatus(400);
    })
}

const RemoveQuestionSetFromCourse = async (request, response) => {
    const QSID = request.body.QSID;
    const CourseID = request.body.CourseID;

    await models.CourseQuestionSetRelation.destroy({
        where: {
            CourseID: CourseID,
            QuestionSetID: QSID
        },
    }).then(() => {
        return response.sendStatus(200);
    }).catch((e) => {
        console.error(e);
        return response.sendStatus(400);
    })
}


module.exports = {
    createQuestionSet,
    updateQuestionSet,
    getQuestionSets,
    deleteQuestionSet,
    AssignQuestionSetToDocument,
    RemoveQuestionSetFromDocument,
    AssignQuestionSetToCourse,
    RemoveQuestionSetFromCourse
};