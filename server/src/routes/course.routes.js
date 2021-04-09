//This file contains endpoints related to courses
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");


module.exports = (app) => {

app.get("/api/courseInfo", (request, response) => {

    
    models.courses.findOne({where: {coursePassword: request.query.coursePass}}).then(function(course){
        models.StudentCourseJunction.create({
            userId: request.query.userId,
            courseId: course.id
        });
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

//This api call creates a course
app.post("/api/createCourse", (request, response) => {
    console.log(request.headers)

    models.users.findOne({where: {id: request.body.userId}}).then( async (users) => {
        let course = await models.courses.create({
            courseName: request.body.courseName,
            coursePassword: request.body.coursePassword,
            userId: users.id,
            shorthand: request.body.shorthand
        });

        let course_right_format = {
            courseId: course.id,
            courseName: course.courseName,
            courseShorthand: course.shorthand,
            documents: [],
            courseModules: [],
            AssignmentModules: [],
            QuestionSets: []
        };

        return response.status(200).json({course: course_right_format})
    });
    return response.status(400);
});

//This api call fetches documents related to a course
app.get("/api/fetchCourseDoc", (request, response) => {

    let documentList = [];

    models.CourseDocumentRelation.findAll({where: {course_id: request.query.cid} }).then(function (docs){
        for(let i = 0; i < docs.length; i++) {
            models.document.findOne({where: {id: docs[i].document_id}}).then(function (courses){
                documentList.push(courses.dataValues.body);
            });
        }

        const delayReturn = function() {
            return response.json({
                title: "Fetch course documents",
                documentList
            });
        };

        setTimeout(delayReturn, 100);
        });


});

app.get("/api/getCourses", (request, response) => {
    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded) => {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        let { role } = decoded;
        if (role.toLowerCase() === "teacher") {
            const courses = await models.courses.findAll({where: {userId: decoded.id}}) 

            if (courses) {
                let courses_right_format = courses.map(course => {
                    return {
                        courseId: course.id,
                        courseName: course.courseName,
                        courseShorthand: course.shorthand,
                        documents: [],
                        courseModules: [],
                        AssignmentModules: [],
                        QuestionSets: []
                    } 
                });
                return response.status(200).json({
                    courses: courses_right_format
                })
            }
            else {
                return response.send(400);
            }
        }
    })
});


app.get("/api/getAvailableCourses", (request, response) => {
    let availableCourses = [];


    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded )=> {
        // if(err) return response.status(401).json({
        //     title: "unauthorized",
        //     error: err
        // });

        // find all joined courses
        let joinedCourses = await models.StudentCourseJunction.findAll({where: {userId: 4} });
        availableCourses = await models.courses.findAll()


        if (joinedCourses.length === 0) {
            availableCourses = allCourses
        } else {

        }
        return response.status(200).json({
            a: availableCourses,
            j: joinedCourses
        })

    });
})

};

