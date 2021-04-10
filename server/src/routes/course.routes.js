//This file contains endpoints related to courses
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");


module.exports = (app) => {

app.post("/api/JoinCourse", (request, response) => {

    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded) => {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        models.courses.findOne({where: {id: request.body.courseId}}).then(async (course) => {
            if(!course){
                return response.status(400).json({
                    title: "Course Not Found",
                    error: "No course found"
                });
            };
    
            let alreadyJoined = await models.StudentCourseJunction.findOne({
                where: {userId: decoded.id, courseId: course.id }
            });
    
            if (!alreadyJoined) {
                if (request.body.coursePassword === course.coursePassword) {
                    models.StudentCourseJunction.create({
                        userId: decoded.id,
                        courseId: course.id
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
    
                    return response.status(200).json({
                        title: "Joined Course",
                        course: course_right_format,
                    });
                }
                return response.status(400).json({
                    title: "Wrong Password",
                });
            }
    
            return response.status(400).json({
                title: "Already Joined",
            });
        });
    })
    
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
        
        if (role.toLowerCase() === "student") {
            let studentCourses = await models.StudentCourseJunction.findAll({where: {userId: decoded.id}});
            if (!studentCourses) { 
                return response.status(204).json({
                    tittle: "No Courses"
                })
            }
            studentCourses = studentCourses.map(scourse => scourse.courseId);

            let courses = await models.courses.findAll({where: {
                id: studentCourses 
            }});

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
            } else {
                return response.send(400)
            }

        }
    })
});


app.get("/api/getAvailableCourses", (request, response) => {
    let availableCourses = [];

    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded )=> {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        // find all joined courses
        let joinedCourses = await models.StudentCourseJunction.findAll({where: {userId: decoded.id} });
        let courses = await models.courses.findAll()

        if (joinedCourses.length === 0) {
            availableCourses = courses
        } else {
            joinedCourses.forEach(junction => {
                courses.forEach(course => {
                    if (course.courseId !== junction.courseId) {
                        availableCourses.push(course);
                    } 
                }); 
            });
        }

        return response.status(200).json({
            availableCourses: availableCourses,
        })

    });
})

};

