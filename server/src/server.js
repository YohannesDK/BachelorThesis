var express = require("express");
const session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const axios = require("axios");

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

//This api call registers users
app.get("/api/register", (request, response) => {
    axios.get("https://api.typeform.com/forms/vRs8ZOsa/responses?page_size=1", {
        headers: {
            "Authorization": "Bearer W3ycZBuvFezRCoasSpzvQRGD1pijYJPqWZi5CT1pbea",
        }
    }).then((res) => {
        const register_info = res.data.items[0].answers;

        const firstname = register_info[0].text;
        const lastname = register_info[1].text;
        const email = register_info[2].email;
        const role = register_info[3].choice.label;
        const username = register_info[4].text;
        const password = register_info[5].text;
        

        models.users.findOne({where: {username: username} }).then(function (users){
            
            if(!users){
                models.users.create({
                    username: username,
                    fullname: firstname + " " + lastname,
                    password: bcrypt.hashSync(password, 10),
                    role: role
                });
            }

            if(users){
                return response.json({
                    title: "Fail",
                    error: "Username is taken"
                });
            }

        });
        response.send(200);
    }).catch((error) => {
        console.error(error);
    });
});

//This api call creates a user, probably swapped out for the api above.
app.post("/api/users", (request, response) => {

    // User enters desired username, we look that username up in the database
    models.users.findOne({where: {username: request.body.username} }).then(function (users){

        // If that username does not exist, go ahead and create the user
        if(!users){
            models.users.create({
                username: request.body.username,
                fullname: request.body.fullname,
                password: bcrypt.hashSync(request.body.password, 10),
                role: request.body.role
            });
        }

        // If the user does exist, dont create the user
        if(users){
            return response.json({
                title: "Fail",
                error: "Username is taken"
            });
        }

    });
});

//This api call creates a course
app.post("/api/createCourse", (request, response) => {

    console.log(request.body);

    models.users.findOne({where: {id: request.body.userId}}).then(function (users){
        models.courses.create({
            body: request.body.course,
            coursePassword: request.body.coursePassword,
            userId: users.id,
            shorthand: request.body.shorthand
        });
    });

});

//This api call creates a document
app.post("/api/createDocument", (request, response) => {

    console.log(request.body);

        models.document.create({
            body: request.body.body,
            userId: request.body.userId,
            title: request.body.title
        });

});


//This api call saves / updates document content
app.post("/api/alterDocument", (request, response) => {

    models.document.update({body: request.body.body, title: request.body.title}, {where: {id: request.body.docID}})


})


//This api call retrieves all documents that belong to one user
app.get("/api/documentInfo", (request, response) => {

    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {
        

        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        models.document.findAll({where: {userId: decoded.id}}).then(function(document){
            return response.json({
                title: "fetch course",
                document: document,
                userId: decoded.id
            })
        })
    });

})

//This api call retrieves one document based on query ID.
//TODO: authorize this api call
app.get("/api/fetchDoc", (request, response) => {

        console.log(request.query.docId)        

        models.document.findOne({where: {id: request.query.docId}}).then(function(document){
            return response.json({
                title: "fetch course",
                document: document,

            })
        })


})



//This api call is called when a user joins a course.
//We retrieve the course he wants to enter based on the course password
//Then we add an entry to the StudentCourseJunction table that links that student to that course he joined
//So that next time he logs in, we can look up his courses in the StudentCourseJunction table
app.get("/api/courseInfo", (request, response) => {

    
    models.courses.findOne({where: {coursePassword: request.query.coursePass}}).then(function(course){
        models.StudentCourseJunction.create({
            userId: request.query.userId,
            courseId: course.id
        })
        if(!course){
            return response.json({
                title: "Course Not Found",
                error: "No course found"
            });
        }

        return response.json({
            title: "Fetch Course",
            course: course
        });

    });

});




//This api call is called when users log in.
app.post("/api/user", function(request, response) {

    models.users.findOne({where: {username: request.body.username} }).then(function (users){
        
        // If the user does not exist, return error
        if(!users){
            return response.json({
                title: "User not found",
                error: "invalid credentials"
            });
        } 
        
        // If the passwords dont match, return error
        if(!bcrypt.compareSync(request.body.password, users.password)){
            return response.json({
                title: "Login failed",
                error: "invalid credentials"
            });
        } 

        // If the above statements are not executed, the user information is correct. Proceed to create a token
        let token = jwt.sign({ username: users.username, password: users.password, role: users.role, id: users.id}, "secretkey");

        // Return the user data and token to frontend
        return response.status(200).json({
            title: "logged in",
            username: users.username,
            password: users.password,
            id: users.id,
            role: users.role,
            token: token
        });
    }).catch(function(err){
        console.log(err);
    });

});


//This api call gets user info
app.get("/api/userinfo", (request, response, next) =>{
    
    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {
        

        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        models.users.findOne({where: {id: decoded.id} }).then(function (user){
            models.courses.findAll({where: {userId: decoded.id}}).then(function (courses){

                return response.json({
                    title: "Fetch course info",
                    user,
                    courses
                });

            });
        }).catch(function(err){
            console.log(err);
        });
    });
});


//This api call retrieves all the courses that belong to one user.
//It is abit messy but it works
app.get("/api/studentCourse", (request, response) =>{

    let courseList = []
    
    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {


        const id = decoded.id
        const username = decoded.username
        const fullname = decoded.fullname
        const role = decoded.role
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        models.StudentCourseJunction.findAll({where: {userId: decoded.id} }).then(function (stud){
            for(let i = 0; i < stud.length; i++) {

                models.courses.findOne({where: {id: stud[i].courseId}}).then(function (courses){
                    courseList.push(courses.dataValues)
                });
            }
            const greet = function() {
                return response.json({
                    title: "Fetch course info",
                    stud,
                    id,
                    username,
                    fullname,
                    role,
                    courseList
                });
            }

            setTimeout(greet, 100)

        }).catch(function(err){
            console.log(err);
        });
    });
});

var port = 3000;

app.listen(port, () => {
    console.log("listening on port 3000");
});