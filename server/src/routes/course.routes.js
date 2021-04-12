//This file contains endpoints related to courses
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const updateDifference = require("../controllers/course.controller").updateDifference


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

        let token = request.headers.token;
        jwt.verify(token, "secretkey", (err, decoded )=> {
            if(err) return response.status(401).json({
                title: "unauthorized",
                error: err
            });

            if (decoded.role.toLowerCase() !== "teacher") {
                return response.status(401).json({
                    title: "unauthorized",
                    error: err
                });
            }

        })

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
                    
                    await Promise.all(courses_right_format.map(async (course) => {
                        // fetch all course modules, sections and sectionitems

                        let courseModules = await models.CourseModule.findAll({where: {
                            courseId: course.courseId,
                        }});

                        let course_modules_right_format = courseModules.map(courseModule => {
                            return {
                                courseModuleID: courseModule.courseModuleID,
                                courseId: courseModule.courseId,
                                moduleOrderIndex: courseModule.moduleOrderIndex,
                                public: courseModule.public,
                                moduleName: courseModule.moduleName,
                                moduleSections: []
                            }
                        });

                        await Promise.all(course_modules_right_format.map(async (coursemodule) => {
                            let courseModuleSections = await models.CourseModuleSection.findAll({where: {
                                courseModuleID: coursemodule.courseModuleID 
                            }})

                            let course_module_section_right_format = courseModuleSections.map(section => {
                                return {
                                    SectionID: section.SectionID,
                                    courseModuleID: section.courseModuleID,
                                    SectionName: section.SectionName,
                                    SectionItems: [] 
                                }
                            });

                            await Promise.all(course_module_section_right_format.map(async (section) => {
                                let coursemodulesectionitems = await models.CourseModuleSectionItem.findAll({where: {
                                    SectionID: section.SectionID 
                                }});
                                section.SectionItems = [...coursemodulesectionitems];
                            }))

                            coursemodule.moduleSections = [...course_module_section_right_format];
                        }))
                        course.courseModules = [...course_modules_right_format];
                    }));

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


                    await Promise.all(courses_right_format.map(async (course) => {
                        // fetch all course modules, sections and sectionitems

                        let courseModules = await models.CourseModule.findAll({where: {
                            courseId: course.courseId,
                            public: true
                        }});

                        let course_modules_right_format = courseModules.map(courseModule => {
                            return {
                                courseModuleID: coursemodule.courseModuleID,
                                courseId: courseModule.courseId,
                                moduleOrderIndex: courseModule.moduleOrderIndex,
                                public: courseModule.public,
                                moduleName: courseModule.moduleName,
                                moduleSections: []
                            }
                        });

                        await Promise.all(course_modules_right_format.map(async (coursemodule) => {
                            let courseModuleSections = await models.CourseModuleSection.findAll({where: {
                                courseModuleID: coursemodule.courseModuleID 
                            }})

                            let course_module_section_right_format = courseModuleSections.map(section => {
                                return {
                                    SectionID: section.SectionID,
                                    courseModuleID: section.courseModuleID,
                                    SectionName: section.SectionName,
                                    SectionItems: [] 
                                }
                            });

                            await Promise.all(course_module_section_right_format.map(async (section) => {
                                let coursemodulesectionitems = await models.CourseModuleSectionItem.findAll({where: {
                                    SectionID: section.SectionID 
                                }});
                                section.SectionItems = [...coursemodulesectionitems];
                            }))
                            coursemodule.moduleSections = [...course_module_section_right_format];
                        }))
                        course.courseModules = [...course_modules_right_format];
                    }));

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

    app.post("/api/createCourseModule", (request, response) => {

        let token = request.headers.token;
        jwt.verify(token, "secretkey", (err, decoded )=> {
            if(err) return response.status(401).json({
                title: "unauthorized",
                error: err
            });

            if (decoded.role.toLowerCase() !== "teacher") {
                return response.status(401).json({
                    title: "unauthorized",
                    error: err
                });
            }
        });

        const courseModule = request.body.courseModule;

        const NewcourseModule = {
            courseModuleID: -1,
            courseId: -1,
            moduleOrderIndex: -1,
            public: false,
            moduleName: "",
            moduleSections: []
        };

        // create courseModule
        models.CourseModule.create({
            courseId: courseModule.courseId,
            moduleOrderIndex: courseModule.moduleOrderIndex,
            public: courseModule.public,
            moduleName: courseModule.moduleName
        }).then(async (createdCourseModule) => {
            NewcourseModule.courseModuleID = createdCourseModule.courseModuleID;
            NewcourseModule.courseId = createdCourseModule.courseId;
            NewcourseModule.moduleOrderIndex = createdCourseModule.moduleOrderIndex;
            NewcourseModule.public = createdCourseModule.public;
            NewcourseModule.moduleName = createdCourseModule.moduleName;
            
            await Promise.all(courseModule.moduleSections.map(async (section) => {
                let sectionItems = [];

                //create module section
                let createdCourseModuleSection = await models.CourseModuleSection.create({
                    courseModuleID: createdCourseModule.courseModuleID,
                    SectionName: section.SectionName
                });
    
                // create courseModuleSectionItems
                await Promise.all(section.SectionItems.map(async (sectionItem) => {
                    let createdCourseModuleSectionItem;
                    if (sectionItem.ItemType === 2) {
                        createdCourseModuleSectionItem = await models.CourseModuleSectionItem.create({
                            SectionID: createdCourseModuleSection.SectionID,
                            Item: sectionItem.Item,
                            ItemLink: sectionItem.ItemLink,
                            ItemType: sectionItem.ItemType
                        });
                    } else {
                        createdCourseModuleSectionItem = await models.CourseModuleSectionItem.create({
                            SectionID: createdCourseModuleSection.SectionID,
                            Item: sectionItem.Item,
                            ItemResourceID: sectionItem.ItemResourceID,
                            ItemType: sectionItem.ItemType
                        });
                    }
                    sectionItems.push(createdCourseModuleSectionItem);
                }))
                let section_with_sectionItems = {
                    SectionID: createdCourseModuleSection.SectionID,
                    courseModuleID: createdCourseModule.courseModuleID,
                    SectionName: createdCourseModuleSection.SectionName,
                    SectionItems: sectionItems
                };
                NewcourseModule.moduleSections.push(section_with_sectionItems);
            }))

            return response.status(200).json({
                newcourseModule: NewcourseModule
            });

        }).catch(() => {
            return response.sendStatus(400);
        })

    });

    app.post("/api/updateCourseModule", (request, response) => {
        return response.send(200);
    });

    app.delete("/api/deleteCourseModule", (request, response) => {
        console.log(request.data.courseModule);
    })
};

