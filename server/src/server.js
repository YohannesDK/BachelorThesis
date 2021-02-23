var express = require("express");
const session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var cors = require("cors");

const models = require("./models/index.js");
const { response } = require("express");

app.use(cors());

// session handling
app.use(session({
    secret:"user_handling",
    resave: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

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

app.get("/api/courseInfo", (request, response) => {

    console.log(request.query.coursePass);
    
    models.courses.findOne({where: {coursePassword: request.query.coursePass}}).then(function(course){
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


//Get user info
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

var port = 3000;

app.listen(port, () => {
    console.log("listening on port 3000");
});