//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

//Save attempts
const save_attempt = async (request, response) => {
    const TestData = request.body.TestData;

    if (TestData) {
        let createdTestData = await models.Attempts.create({
            userId: TestData.userID,
            Name: TestData.name,
            questionset_id: TestData.QSID,
            Time: TestData.Time,
            Score: TestData.Score,
        });

        TestData.TestID = createdTestData.AttemptId;

        // add to courseQsAttemptJunction table
        if (TestData.courseID !== -1) {
            await models.CourseQuestionSetAttemps.create({
                CourseID: TestData.courseID,
                QuestionSetID: TestData.QSID,
                AttemptId: createdTestData.AttemptId
            })
        }

        await Promise.all(TestData.TestData.map( async (testanswer) => {
            let createTestAnswerData;
            if (testanswer.QuestionType === 0 || testanswer.QuestionType === 1) {
                createTestAnswerData = await models.AttemptData.create({
                    AttemptId: createdTestData.AttemptId,
                    QuestionId: testanswer.QuestionID,
                    QuestionType: testanswer.QuestionType,
                    TextAnswer: testanswer.Answer
                })
            } else {
                createTestAnswerData = await models.AttemptData.create({
                    AttemptId: createdTestData.AttemptId,
                    QuestionId: testanswer.QuestionID,
                    QuestionType: testanswer.QuestionType,
                    ChoiceAnswer: testanswer.Answer
                })
            }
            testanswer.TQAID = createTestAnswerData.id;
        }));
        console.log(createdTestData) 
    }

    return response.sendStatus(200);
}

module.exports = {
    save_attempt
}