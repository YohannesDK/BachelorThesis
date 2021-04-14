//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

const store_Attempt_data = (request, response) => {
    
    //Here we find the questionset we just created
    models.Attempts.findOne({ attributes: ["AttemptId"], order: [["AttemptId", "DESC"]]}).then(function(Attempt){

        models.AttemptData.create({
            AttemptId: Attempt.AttemptId,
            QuestionId: request.body.QuestionId,
            Answer: request.body.Answer,
            CorrectAnswer: request.body.CorrectAnswer,
        });

    });
}

const get_Attempt_data = (request, response) => {
    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {    

    //Here we find the questionset we just created
    models.Attempts.findAll({where: {userId: decoded.id}}).then(function(attemptData){
        return response.json({
            title: "Fetch Attempt Data",
            dataList: attemptData
        });

    });

});
}

module.exports = {
    store_Attempt_data,
    get_Attempt_data
}