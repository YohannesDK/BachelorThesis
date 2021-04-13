//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

//Save attempts
const create_question = (request, response) => {
    //Create a question
    models.Question.create({
        questionset_id: parseInt(request.body.questionsetId),
        question: request.body.question,
        question_type: request.body.questionType
    }).then(function(question){
        //Create an empty answer for that question
        models.Answers.create({
        answerset_id: question.question_id
        }).then(function(answer){
        models.Question.update({
            //The answerset_id is by default 0 when a question is first created
            //When we create a new answer, we update the answerset_id and set it to the id of the answer
            answerset_id: answer.answer_id
        }, {where: {question_id: question.question_id }})
        })
        
        return response.json({
        title: "Created Question",
        question: question,

        });
    });

}


const create_true_false_question = (request, response) => {
        //Here we create a question of type 2, which is a true or false question
        models.Question.create({
            questionset_id: parseInt(request.body.questionsetId),
            question: request.body.question,
            question_type: 2
        }).then(function(question){
            //True or false questions have two answer options; true or false.
            // We then have to create two different answers in the answer table
            for(let i = 0; i < Object.keys(request.body.Answers).length; i++){
                //i can either be 0 or 1, because the length of request.body.Answers is 2.
                //if it is 0, we create a new answer and give it the value True
                //Then we update the question we just created, and set its answerset_id equal to the answer_id of the answer
                if(i == 0){
                    models.Answers.create({
                        answerset_id: question.question_id,
                        answer_option: request.body.Answers.TrueOption
                    }).then(function(answer){
                        models.Question.update({
                            answerset_id: answer.answer_id
                        }, {where: {question_id: question.question_id }})
                    })
                }
                //if i is 1, we create an answer and give it the value False
                //Same process as explained above
                if(i == 1){
                    models.Answers.create({
                        answerset_id: question.question_id,
                        answer_option: request.body.Answers.FalseOption
                    }).then(function(answer){
                        models.Question.update({
                            answerset_id: answer.answer_id
                        }, {where: {question_id: question.question_id }})
                    })
                }
        }
    
    
        models.Question.findOne({ attributes: ["question_id"], order: [["question_id", "DESC"]]}).then(function(QSet) {
            console.log(QSet.question_id)
    
            models.AnswerSet.create({
                question_id: QSet.question_id,
                correct_answer: 2
            })
    
        })
    
            return response.json({
                title: "Created True False Question",
                question: question,
                    });
                });
}

const save_question = (request, response) => {

    console.log(request.body.correctAnswer)

    models.AnswerSet.update({
        correct_answer: request.body.correctAnswer
    }, {where: {question_id: request.body.questionId }})

    //Here we update the title and description of the question set
    models.QuestionSet.update({
        title: request.body.title,
        description: request.body.description
    }, {where: {questionset_id: request.body.QSID}})

    //Here we update the question
    models.Question.update({
        question: request.body.question, 
        question_type: request.body.questionType}, 
        {where: 
            {questionset_id: request.body.QSID, 
            question_id: request.body.questionId}})

    //Here we check if the answer is not empty, and update it if it isnt
    if(request.body.answerOption != "" && request.body.questionType == 0) {
        models.Answers.update({
            answer_option: request.body.answerOption
        }, 
        {where: 
            {answerset_id: request.body.questionId}})
    }

    if(request.body.answerOption != "" && request.body.questionType == 2) {
        for(let i = 0; i < Object.keys(request.body.answerOption).length; i++)
        models.Answers.update({
            answer_option: request.body.answerOption[i]
        }, 
        {where: 
            {answerset_id: request.body.questionId}})
    }
}

module.exports = {
    create_question,
    create_true_false_question,
    save_question
}