//This file cointains routes related to questionsets
const models = require("../models/index.js");

module.exports = (app) => {

//This api call creates a question set and relation between document and the question set
app.post("/api/createQS", (request, response) => {

    //Create a question set with default title and description
    models.QuestionSet.create({
        title: "Edit Title",
        description: "Edit Description"
    });
    
    //Here we find the questionset we just created
    models.QuestionSet.findOne({ attributes: ["questionset_id"], order: [["questionset_id", "DESC"]]}).then(function(qsID){

        //Then we create a relation between the document and the questionset
        models.QuestionsetDocumentRelation.create({
            questionset_id: qsID.questionset_id,
            document_id: request.body.documentId
        });


    });

});

app.get("/api/getQuestionSets", (request, response) => {

    let questionSetList = [];


    models.QuestionsetDocumentRelation.findAll({ where: {document_id: request.query.did}}).then(function (QuestionSets){
        for(let i = 0; i < QuestionSets.length; i++) {
            models.QuestionSet.findOne({where: {questionset_id: QuestionSets[i].dataValues.questionset_id}}).then(function (QS){
                questionSetList.push(QS.dataValues);
            });
        }

        const delayReturn = function() {
            return response.json({
                title: "Fetch Questionsets",
                questionSetList
            });
        };

        setTimeout(delayReturn, 100);

    });

});

//This api call fetches a question set
app.get("/api/fetchQS", (request, response) => {

    //We will insert answers into this list
    let answerList = [];

    //First find the questionset based on question set id
    models.QuestionSet.findOne({where: {questionset_id: request.query.QSID}}).then(function(questionset){

        //Then find all the questions in that question set
        models.Question.findAll({where: {questionset_id: request.query.QSID}}).then(function(questions){

            //Then, for every question, find all the answers related to that question
            for(let i = 0; i < questions.length; i++) {
                models.Answers.findAll({where: {answerset_id: questions[i].question_id}}).then(function (answer){

                    //Push the answers in a list, and later return the list
                    for(let i = 0; i < answer.length; i++){
                        answerList.push(answer[i].dataValues);
                    }

                });
            }
            
            //Need to delay the return by a small amount, orelse it will return answerList as an empty list
            const delayReturn = function() {
                return response.json({
                    title: "Fetch Questionset Info",
                    questionset: questionset,
                    questions: questions,
                    answer: answerList
                });
            };
            setTimeout(delayReturn, 100);
        });
    });
});
};
