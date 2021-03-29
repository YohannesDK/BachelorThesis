//This file contains endpoints related to courses
const models = require("../models/index.js");


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

    models.users.findOne({where: {id: request.body.userId}}).then(function (users){
        models.courses.create({
            body: request.body.course,
            coursePassword: request.body.coursePassword,
            userId: users.id,
            shorthand: request.body.shorthand
        });
    });

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

};