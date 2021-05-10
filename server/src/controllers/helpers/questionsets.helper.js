
const models = require("../../models/index.js");

/*
** Helper function for querying question sets
** @param - conditions - object with query values
*/
const select_questionsets_helper = async (conditions) => {
    
    // find all questionSets
    const QuestionSets = await models.QuestionSet.findAll({where: conditions});

    if (QuestionSets) { 
        let questionSets_right_format = QuestionSets.map(questionset => {
            return {
                QSID: questionset.questionset_id,
                Tittle: questionset.title,
                Description: questionset.description || "",
                QuestionSet: [],
                CreateBy: questionset.createdBy,
                LastEdited: `${questionset.updatedAt}`,
                DocumentID: [],
                CourseId: []
            }
        })


        await Promise.all(questionSets_right_format.map(async (questionset, question_set_index) => {
            // find all questions
            let questions = await models.Question.findAll({
                where: { questionset_id: questionset.QSID },
                order: [["createdAt", "ASC"]], 
            });

            await Promise.all(questions.map(async (question) => {
                let question_right_format = {
                    QuestionID: question.question_id,
                    QuestionType: question.question_type,
                    Question: {
                        Question: question.question,
                        Answer: {}
                    }
                };

                // find all answers
                let answers = await models.Answers.findAll({ 
                    where: { question_id: question.question_id },
                    order: [["answer_id", "ASC"]], // order by id to keep track of correct answer index
                });

                // add answers to question
                answers.forEach((answer, index) => {
                    // short or long text question
                    if (question.question_type === 0 || question.question_type === 1) {
                        question_right_format.Question.Answer = {
                            id: answer.answer_id,
                            QuestionID: question.question_id,
                            Answer: answer.answer_option
                        };
                    } else if (question.question_type === 2 || question.question_type === 3) { // true/false or multiple choice
                        let optionName = `Option${index+1}`;
                        question_right_format.Question.Answer[optionName] = {
                            id: answer.answer_id,
                            QuestionID: question.question_id,
                            Answer: answer.answer_option
                        };
                        question_right_format.Question.CorrectAnswer = question.correct_answer; 
                    }
                    
                });

                // add question to questionset list
                questionSets_right_format[question_set_index].QuestionSet.push(question_right_format);
            }));

        }));

        return questionSets_right_format
      } else {
        return null 
      }
}


module.exports = {
  select_questionsets_helper
}