//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const course_info = (request, response) => {

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
}

const create_course = (request, response) => {

    models.users.findOne({where: {id: request.body.userId}}).then(function (users){
        models.courses.create({
            body: request.body.course,
            coursePassword: request.body.coursePassword,
            userId: users.id,
            shorthand: request.body.shorthand
        });
    });
}

const fetch_course_doc = (request, response) => {

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
}

module.exports = {
    course_info,
    create_course,
    fetch_course_doc
}