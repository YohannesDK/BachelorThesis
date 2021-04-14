//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

//Save attempts
const save_attempt = (request, response) => {
    console.log(request.body.questionsetId)
    let token = request.body.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {    

        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        models.Attempts.create({
            userId: decoded.id,
            Name: decoded.fullname,
            questionset_id: request.body.questionsetId,
            Time: request.body.Time,
            Score: request.body.Score,
        });

    });
}

module.exports = {
    save_attempt
}