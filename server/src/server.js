var express = require("express");
const session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const axios = require("axios");
// const MainRouter = require("./routes/router.js");

dotenv.config({
    path: ".env"
});

var cors = require("cors");

const models = require("./models/index.js");
const { response, json, request } = require("express");

app.use(cors());

// session handling
//Cookie length abit lengthy, need to change
app.use(session({
    secret:"user_handling",
    resave: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


// main router will delegate request to correct route handlers
// having problems with sequelize. 
// app.use("/api", MainRouter);

// //This api call registers users
// app.get("/api/register", (request, response) => {
//     axios.get("https://api.typeform.com/forms/vRs8ZOsa/responses?page_size=1", {
//         headers: {
//             "Authorization": "Bearer " + process.env.TYPEFORM_ACCESS_TOKEN,
//         }
//     }).then((res) => {
//         const register_info = res.data.items[0].answers;

//         const firstname = register_info[0].text;
//         const lastname = register_info[1].text;
//         const email = register_info[2].email;
//         const role = register_info[3].choice.label;
//         const username = register_info[4].text;
//         const password = register_info[5].text;
        

//         models.users.findOne({where: {username: username} }).then(function (users){
            
//             if(!users){
//                 models.users.create({
//                     username: username,
//                     fullname: firstname + " " + lastname,
//                     password: bcrypt.hashSync(password, 10),
//                     role: role
//                 });
//             }

//             if(users){
//                 return response.json({
//                     title: "Fail",
//                     error: "Username is taken"
//                 });
//             }

//         });
//         response.send(200);
//     }).catch((error) => {
//         console.error(error);
//     });
// });

// //This api call creates a user, probably swapped out for the api above.
// app.post("/api/users", (request, response) => {

//     // User enters desired username, we look that username up in the database
//     models.users.findOne({where: {username: request.body.username} }).then(function (users){

//         // If that username does not exist, go ahead and create the user
//         if(!users){
//             models.users.create({
//                 username: request.body.username,
//                 fullname: request.body.fullname,
//                 password: bcrypt.hashSync(request.body.password, 10),
//                 role: request.body.role
//             });
//         }

//         // If the user does exist, dont create the user
//         if(users){
//             return response.json({
//                 title: "Fail",
//                 error: "Username is taken"
//             });
//         }

//     });
// });

// //This api call creates a course
// app.post("/api/createCourse", (request, response) => {

//     models.users.findOne({where: {id: request.body.userId}}).then(function (users){
//         models.courses.create({
//             body: request.body.course,
//             coursePassword: request.body.coursePassword,
//             userId: users.id,
//             shorthand: request.body.shorthand
//         });
//     });

// });


// app.get("/api/fetchCourseDoc", (request, response) => {

//     let documentList = []

//     models.CourseDocumentRelation.findAll({where: {course_id: request.query.cid} }).then(function (docs){
//         for(let i = 0; i < docs.length; i++) {
//             models.document.findOne({where: {id: docs[i].document_id}}).then(function (courses){
//                 documentList.push(courses.dataValues.body)
//             });
//         }

//         const delayReturn = function() {
//             return response.json({
//                 title: "Fetch course documents",
//                 documentList
//             });
//         }

//         setTimeout(delayReturn, 100)

//         })


//     // models.document.findAll({where: {course_id: request.query.docId}}).then(function(document){
//     //     return response.json({
//     //         title: "fetch course",
//     //         document: document,

//     //     })
//     // })


// });

//This API fetches all questionsets linked to a document
require("./routes/questionSets.routes.js")(app);

// app.get("/api/getQuestionSets", (request, response) => {

//     let questionSetList = []


//     models.QuestionsetDocumentRelation.findAll({ where: {document_id: request.query.did}}).then(function (QuestionSets){
//         for(let i = 0; i < QuestionSets.length; i++) {
//             models.QuestionSet.findOne({where: {questionset_id: QuestionSets[i].dataValues.questionset_id}}).then(function (QS){
//                 questionSetList.push(QS.dataValues)
//             });
//         }

//         const delayReturn = function() {
//             return response.json({
//                 title: "Fetch Questionsets",
//                 questionSetList
//             });
//         }

//         setTimeout(delayReturn, 100)

//     })

// })

// //This api call creates a true or false question
// app.post("/api/createTFQ", (request, response) => {


//     //Here we create a question of type 2, which is a true or false question
//     models.Question.create({
//         questionset_id: parseInt(request.body.questionsetId),
//         question: request.body.question,
//         question_type: 2
//     }).then(function(question){
//         //True or false questions have two answer options; true or false.
//         // We then have to create two different answers in the answer table
//         for(let i = 0; i < Object.keys(request.body.Answers).length; i++){
//             //i can either be 0 or 1, because the length of request.body.Answers is 2.
//             //if it is 0, we create a new answer and give it the value True
//             //Then we update the question we just created, and set its answerset_id equal to the answer_id of the answer
//             if(i == 0){
//                 models.Answers.create({
//                     answerset_id: question.question_id,
//                     answer_option: request.body.Answers.TrueOption
//                 }).then(function(answer){
//                     models.Question.update({
//                         answerset_id: answer.answer_id
//                     }, {where: {question_id: question.question_id }})
//                 })
//             }
//             //if i is 1, we create an answer and give it the value False
//             //Same process as explained above
//             if(i == 1){
//                 models.Answers.create({
//                     answerset_id: question.question_id,
//                     answer_option: request.body.Answers.FalseOption
//                 }).then(function(answer){
//                     models.Question.update({
//                         answerset_id: answer.answer_id
//                     }, {where: {question_id: question.question_id }})
//                 })
//             }
//     }

//         return response.json({
//             title: "Created True False Question",
//             question: question,
//                 });
//             });


// });


// //This api call creates a question 
require("./routes/questions.routes.js")(app);

// app.post("/api/createQuestion", (request, response) => {


//     //Create a question
//     models.Question.create({
//         questionset_id: parseInt(request.body.questionsetId),
//         question: request.body.question,
//         question_type: request.body.questionType
//     }).then(function(question){
//         //Create an empty answer for that question
//         models.Answers.create({
//             answerset_id: question.question_id
//         }).then(function(answer){
//             models.Question.update({
//                 //The answerset_id is by default 0 when a question is first created
//                 //When we create a new answer, we update the answerset_id and set it to the id of the answer
//                 answerset_id: answer.answer_id
//             }, {where: {question_id: question.question_id }})
//         })
        
//         return response.json({
//             title: "Created Question",
//             question: question,

//         });
//     });


// });


//This api call creates a question set and relation between document and the question set
// app.post("/api/createQS", (request, response) => {

//         //Create a question set with default title and description
//         models.QuestionSet.create({
//             title: "Edit Title",
//             description: "Edit Description"
//         });
        
//         //Here we find the questionset we just created
//         models.QuestionSet.findOne({ attributes: ['questionset_id'], order: [['questionset_id', 'DESC']]}).then(function(qsID){

//             //Then we create a relation between the document and the questionset
//             models.QuestionsetDocumentRelation.create({
//                 questionset_id: qsID.questionset_id,
//                 document_id: request.body.documentId
//             })


//         })

// });



// //This api call fetches a question set
// app.get("/api/fetchQS", (request, response) => {

//     //We will insert answers into this list
//     let answerList = []

//     //First find the questionset based on question set id
//     models.QuestionSet.findOne({where: {questionset_id: request.query.QSID}}).then(function(questionset){

//         //Then find all the questions in that question set
//         models.Question.findAll({where: {questionset_id: request.query.QSID}}).then(function(questions){

//             //Then, for every question, find all the answers related to that question
//             for(let i = 0; i < questions.length; i++) {
//                 models.Answers.findAll({where: {answerset_id: questions[i].question_id}}).then(function (answer){

//                     //Push the answers in a list, and later return the list
//                     for(let i = 0; i < answer.length; i++){
//                         answerList.push(answer[i].dataValues)
//                     }

//                 });
//             }


//             //Need to delay the return by a small amount, orelse it will return answerList as an empty list
//             const delayReturn = function() {
//                 return response.json({
//                     title: "Fetch Questionset Info",
//                     questionset: questionset,
//                     questions: questions,
//                     answer: answerList
//                 });
//             }
    
//             setTimeout(delayReturn, 100)

//         })
        

//     })

// })

// //This API saves question info
// app.post("/api/saveQuestion", (request, response) => {
//     //Here we update the title and description of the question set
//     models.QuestionSet.update({
//         title: request.body.title,
//         description: request.body.description
//     }, {where: {questionset_id: request.body.QSID}})

//     //Here we update the question
//     models.Question.update({
//         question: request.body.question, 
//         question_type: request.body.questionType}, 
//         {where: 
//             {questionset_id: request.body.QSID, 
//             question_id: request.body.questionId}})

//     //Here we check if the answer is not empty, and update it if it isnt
//     console.log(request.body.questionType)
//     if(request.body.answerOption != "" && request.body.questionType == 0) {
//         models.Answers.update({
//             answer_option: request.body.answerOption
//         }, 
//         {where: 
//             {answerset_id: request.body.questionId}})
//     }

//     if(request.body.answerOption != "" && request.body.questionType == 2) {
//         for(let i = 0; i < Object.keys(request.body.answerOption).length; i++)
//         models.Answers.update({
//             answer_option: request.body.answerOption[i]
//         }, 
//         {where: 
//             {answerset_id: request.body.questionId}})
//     }


// });



//This api call creates a document relation
app.post("/api/linkDocument", (request, response) => {

        models.CourseDocumentRelation.create({
            course_id: request.body.courseId,
            document_id: request.body.documentId,
        });

});


//This api call creates a document
app.post("/api/createDocument", async (request, response) => {

    const newDocument = await models.document.create({
        body: request.body.body,
        userId: request.body.userId,
        title: request.body.title
    });

    let document_right_format = {
        "Documentid": newDocument.id,
        "body": newDocument.body,
        "tags": [],
        "name": newDocument.title,
        "lastEdited": `${newDocument.createdAt}`,
        "QuestionSetID": []
    }
    
    return response.status(200).json({document: document_right_format});
});


//This api call saves / updates document content
app.post("/api/alterDocument", async (request, response) => {
    let updated = await models.document.update({body: request.body.body, title: request.body.title}, {where: {id: request.body.docID}});

    if (updated[0] === 1) {
        return response.send(200);
    }
    return response.send(400);
});


//This api call retrieves all documents that belong to one user
app.get("/api/documentInfo", (request, response) => {

    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded )=> {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });
        const documents = await models.document.findAll({where: {userId: decoded.id}});
        let document_right_format = documents.map(doc => {
             return {
                "Documentid": doc.id,
                "body": doc.body,
                "tags": [],
                "name": doc.title,
                "lastEdited": `${doc.updatedAt}`,
                "QuestionSetID": []
             }
         });
    
        if (documents) {
            return response.status(200).json({
                title: "fetch course",
                documents: document_right_format,
                userId: decoded.id
            });
        }
        return response.json({
            tittle: "no documents"
        });
    });


});

//This api call retrieves one document based on query ID.
//TODO: authorize this api call
app.get("/api/fetchDoc", async (request, response) => {

        let document = await models.document.findOne({where: {id: request.query.docId}})

        if (document) {
            return response.status(200).json({
                title: "fetch course",
                document: document,
            });            
        }
        return response.send(404);
});

app.post("/api/deleteDocument", async (request, response) => {
    const DeletedDocument = await models.document.destroy({
        where: {id: request.body.docID}
    }) 
    console.log(DeletedDocument)
    return response.send(200);
})


//This api call is called when a user joins a course.
//We retrieve the course he wants to enter based on the course password
//Then we add an entry to the StudentCourseJunction table that links that student to that course he joined
//So that next time he logs in, we can look up his courses in the StudentCourseJunction table
require("./routes/course.routes.js")(app);

// app.get("/api/courseInfo", (request, response) => {

    
//     models.courses.findOne({where: {coursePassword: request.query.coursePass}}).then(function(course){
//         models.StudentCourseJunction.create({
//             userId: request.query.userId,
//             courseId: course.id
//         })
//         if(!course){
//             return response.json({
//                 title: "Course Not Found",
//                 error: "No course found"
//             });
//         }

//         return response.json({
//             title: "Fetch Course",
//             course: course
//         });

//     });

// });




// //This api call is called when users log in.
require("./routes/user.routes.js")(app);
// app.post("/api/user", function(request, response) {

//     models.users.findOne({where: {username: request.body.username} }).then(function (users){
        
//         // If the user does not exist, return error
//         if(!users){
//             return response.json({
//                 title: "User not found",
//                 error: "invalid credentials"
//             });
//         } 
        
//         // If the passwords dont match, return error
//         if(!bcrypt.compareSync(request.body.password, users.password)){
//             return response.json({
//                 title: "Login failed",
//                 error: "invalid credentials"
//             });
//         } 

//         // If the above statements are not executed, the user information is correct. Proceed to create a token
//         let token = jwt.sign({ username: users.username, password: users.password, role: users.role, id: users.id}, "secretkey");

//         // Return the user data and token to frontend
//         return response.status(200).json({
//             title: "logged in",
//             username: users.username,
//             password: users.password,
//             id: users.id,
//             role: users.role,
//             token: token
//         });
//     }).catch(function(err){
//         console.log(err);
//     });

// });





//This api call retrieves all the courses that belong to one user.
//It is abit messy but it works
// app.get("/api/studentCourse", (request, response) =>{

//     let courseList = []
    
//     let token = request.headers.token;
//     jwt.verify(token, "secretkey", (err, decoded )=> {


//         const id = decoded.id
//         const username = decoded.username
//         const fullname = decoded.fullname
//         const role = decoded.role
//         if(err) return response.status(401).json({
//             title: "unauthorized",
//             error: err
//         });

//         models.StudentCourseJunction.findAll({where: {userId: decoded.id} }).then(function (stud){
//             for(let i = 0; i < stud.length; i++) {

//                 models.courses.findOne({where: {id: stud[i].courseId}}).then(function (courses){
//                     courseList.push(courses.dataValues)
//                 });
//             }
//             const greet = function() {
//                 return response.json({
//                     title: "Fetch course info",
//                     stud,
//                     id,
//                     username,
//                     fullname,
//                     role,
//                     courseList
//                 });
//             }

//             setTimeout(greet, 100)

//         }).catch(function(err){
//             console.log(err);
//         });
//     });
// });

var port = 3000;

app.listen(port, () => {
    console.log("listening on port 3000");
});