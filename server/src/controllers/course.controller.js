
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

const questionset_helpers = require("./helpers/questionsets.helper");
const course_helpers = require("./helpers/course.helper");

const JoinCourse = (request, response) => {
        let token = request.headers.token;
        let allCourseDocuments = [];
        let allCourseQuestionSets = [];
        let allCourseDocumentQuestionSets = [];
        let allCourseDocumentTopicStats = [];
        let allTeachers = [];
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
                }
        
                let alreadyJoined = await models.StudentCourseJunction.findOne({
                    where: {userId: decoded.id, courseId: course.id }
                });
        
                if (!alreadyJoined) {
                    if (request.body.coursePassword === course.coursePassword) {
                        models.StudentCourseJunction.create({
                            userId: decoded.id,
                            courseId: course.id
                        });

                        let course_right_format = [{
                            courseId: course.id,
                            courseName: course.courseName,
                            courseShorthand: course.shorthand,
                            Teacher: course.userId,
                            documents: [],
                            courseModules: [],
                            AssignmentModules: [],
                            QuestionSets: []
                        }];

                        console.log(course_right_format)


                        await Promise.all(course_right_format.map(async (joinedcourse) => {
                            // fetch all course modules, sections and sectionitems
                            let courseModules = await course_helpers.getCourseModules(joinedcourse.courseId, 1)
                            joinedcourse.courseModules = [...courseModules];

                            // fetch all course assignments
                            let assignmentModules = await course_helpers.getCourseAssignments(joinedcourse.courseId);
                            joinedcourse.AssignmentModules = [...assignmentModules];

                            // fetch all course documents and their question sets
                            await course_helpers.getCourseDocumentsAndData(joinedcourse, allCourseDocumentQuestionSets, allCourseDocumentTopicStats, allCourseDocuments, false);


                            // fetch all course questionSets
                            await course_helpers.getCourseQuestionSets(joinedcourse, allCourseQuestionSets);

                            // fetch course teacher and add it to our list
                            let teacher = await models.users.findOne({where: {
                              id: joinedcourse.Teacher,
                            }});

                            if (teacher) {
                                const teacher_right_format = {
                                    UserID: teacher.id,
                                    UserName: teacher.username,
                                    Role: teacher.Role
                                };
                                allTeachers.push(teacher_right_format);
                            }
                        }));

        
                        return response.status(200).json({
                            title: "Joined Course",
                            course: course_right_format,
                            allCourseDocument: allCourseDocuments,
                            allCourseDocumentQuestionSets: allCourseDocumentQuestionSets,
                            allCourseQuestionSets: allCourseQuestionSets,
                            allTeachers: allTeachers
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
        });
};

const create_course = (request, response) => {
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

        return response.status(200).json({course: course_right_format});
    });
    return response.status(400);
};

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
};


const getCourses = (request, response) => {
    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded) => {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        let { role } = decoded;
        let allCourseDocuments = [];
        let allCourseQuestionSets = [];
        let allCourseDocumentQuestionSets = [];
        let allCourseDocumentTopicStats = [];
        let allTeachers = [];
        let allTestDataStats = [];

        if (role.toLowerCase() === "teacher") {
            const courses = await models.courses.findAll({where: {userId: decoded.id}}); 

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
                    }; 
                });

                
                await Promise.all(courses_right_format.map(async (course) => {
                    let courseModules = await course_helpers.getCourseModules(course.courseId)
                    course.courseModules = [...courseModules];

                    let assignmentModules = await course_helpers.getCourseAssignments(course.courseId);
                    course.AssignmentModules = [...assignmentModules];

                    await course_helpers.getCourseDocumentsAndData(course, allCourseDocumentQuestionSets, allCourseDocumentTopicStats, allCourseDocuments);

                    await course_helpers.getCourseQuestionSets(course, allCourseQuestionSets);

                    await course_helpers.getCourseQuestionSetStats(course, allTestDataStats);
                }));

                
                return response.status(200).json({
                    courses: courses_right_format,
                    allCourseDocument: allCourseDocuments,
                    allCourseDocumentQuestionSets: allCourseDocumentQuestionSets,
                    allCourseQuestionSets: allCourseQuestionSets,
                    allCourseDocumentTopicStats: allCourseDocumentTopicStats,
                    allTestDataStats: allTestDataStats,
                    allTeachers: allTeachers
                }); }
            else {
                return response.send(400);
            }
        }
        
        if (role.toLowerCase() === "student") {
            let studentCourses = await models.StudentCourseJunction.findAll({where: {userId: decoded.id}});
            if (!studentCourses) { 
                return response.status(204).json({
                    tittle: "No Courses"
                });
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
                        Teacher: course.userId,
                        documents: [],
                        courseModules: [],
                        AssignmentModules: [],
                        QuestionSets: []
                    }; 
                }); 

                await Promise.all(courses_right_format.map(async (course) => {
                    // fetch all course modules, sections and sectionitems
                    let courseModules = await course_helpers.getCourseModules(course.courseId, 1)
                    course.courseModules = [...courseModules];

                    // fetch all course assignments
                    let assignmentModules = await course_helpers.getCourseAssignments(course.courseId);
                    course.AssignmentModules = [...assignmentModules];

                    // fetch all course documents and their question sets
                    await course_helpers.getCourseDocumentsAndData(course, allCourseDocumentQuestionSets, allCourseDocumentTopicStats, allCourseDocuments, false);


                    // fetch all course questionSets
                    await course_helpers.getCourseQuestionSets(course, allCourseQuestionSets);

                    // fetch course teacher and add it to our list
                    let teacher = await models.users.findOne({where: {
                      id: course.Teacher,
                    }});

                    if (teacher) {
                        const teacher_right_format = {
                            UserID: teacher.id,
                            UserName: teacher.username,
                            Role: teacher.Role,
                            FirstName: teacher.firstname, 
                            LastName: teacher.lastname, 
                            Email: teacher.email, 
                        };
                        allTeachers.push(teacher_right_format);
                    }
                }));


                return response.status(200).json({
                    courses: courses_right_format,
                    allCourseDocument: allCourseDocuments,
                    allCourseDocumentQuestionSets: allCourseDocumentQuestionSets,
                    allCourseQuestionSets: allCourseQuestionSets,
                    allTeachers: allTeachers
                });
            } else {
                return response.send(400);
            }

        }
    });
};


const getAvailableCourses = (request, response) => {
        let availableCourses = [];
        let addedCourses = {};

        let token = request.headers.token;
        jwt.verify(token, "secretkey", async (err, decoded )=> {
            if(err) return response.status(401).json({
                title: "unauthorized",
                error: err
            });

            // find all joined courses
            let joinedCourses = await models.StudentCourseJunction.findAll({where: {userId: decoded.id} });
            let courses = await models.courses.findAll();

            // console.log(joinedCourses.map((j) => j))

            if (joinedCourses.length === 0) {
              console.log("her");
                availableCourses = courses;
            } else {
                availableCourses = courses.filter((course) => {
                  if (!joinedCourses.map((jcourse) => jcourse.courseId).includes(course.id)) {
                    return course 
                  }
                })
            }

            return response.status(200).json({
                availableCourses: availableCourses,
            });

        });
};


const CreateCourseModule = (request, response) => {
    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded )=> {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });

        // TODO - check teacher is the owner of the course
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
            }));
            let section_with_sectionItems = {
                SectionID: createdCourseModuleSection.SectionID,
                courseModuleID: createdCourseModule.courseModuleID,
                SectionName: createdCourseModuleSection.SectionName,
                SectionItems: sectionItems
            };
            NewcourseModule.moduleSections.push(section_with_sectionItems);
        }));

        return response.status(200).json({
            newcourseModule: NewcourseModule
        });

    }).catch(() => {
        return response.sendStatus(400);
    });
};


const updateCourseModule = async (request, response) => {

    const courseModule = request.body.EditData.courseModule;
    const updatedsections = request.body.EditData.updatedsections;
    const updatedsectionitems = request.body.EditData.updatedsectionitems;
    const deletedsections = request.body.EditData.deletedsections;
    const deletedsectionitems = request.body.EditData.deletedsectionitems;

    
    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded) => {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });
        // TODO - check teacher is the owner of the course
        if (decoded.role.toLowerCase() !== "teacher") {
            return response.status(401).json({
                title: "unauthorized",
                error: err
            });
        }
    });
        
    // update tittle
    await models.CourseModule.update({moduleName: courseModule.moduleName},
        {where: {courseModuleID: courseModule.courseModuleID}});

    // create new sections and update old sections
    await Promise.all( courseModule.moduleSections.map(async(section, section_index) => {
        // add new section if id is -1
        if (section.SectionID === -1) {
            // create section
            let createdCourseModuleSection = await models.CourseModuleSection.create({
                courseModuleID: courseModule.courseModuleID,
                SectionName: section.SectionName
            });
            // assingn created section id
            courseModule.moduleSections[section_index].SectionID = createdCourseModuleSection.SectionID;

            // create each item in section
            await Promise.all( section.SectionItems.map(async(sectionitem, section_item_index) => {
                let createdCourseModuleSectionItem;
                if (sectionitem.ItemType === 2) {
                    createdCourseModuleSectionItem = await models.CourseModuleSectionItem.create({
                        SectionID: createdCourseModuleSection.SectionID,
                        Item: sectionitem.Item,
                        ItemLink: sectionitem.ItemLink,
                        ItemType: sectionitem.ItemType
                    });
                } else {
                    createdCourseModuleSectionItem = await models.CourseModuleSectionItem.create({
                        SectionID: createdCourseModuleSection.SectionID,
                        Item: sectionitem.Item,
                        ItemResourceID: sectionitem.ItemResourceID,
                        ItemType: sectionitem.ItemType
                    });
                }

                // assign created sectionitem id
                courseModule.moduleSections[section_index].SectionItems[section_item_index] = {
                    ItemID: createdCourseModuleSectionItem.ItemID,
                    SectionID: createdCourseModuleSectionItem.SectionID,
                };
            }));

        }

        // update section name
        if (String(section.SectionID) in updatedsections) {
            await models.CourseModuleSection.update({SectionName: section.SectionName}, {where: {SectionID: section.SectionID}});
        }
    }));

    // delete entire sections
    await Promise.all(Object.keys(deletedsections).map(async (sectionID) => {
        await models.CourseModuleSection.destroy({where: {SectionID: Number(sectionID)}});

        // TODO - this should be done automatically using foreign keys
        await Promise.all( deletedsections[sectionID].SectionItems.map(async(sectionItem) => {
            await models.CourseModuleSectionItem.destroy({where: {ItemID: sectionItem.ItemID}});
        }));
    }));

    // delete single sectionitem
    await Promise.all(Object.keys(deletedsectionitems).map(async (itemID) => {
        await models.CourseModuleSectionItem.destroy({where: {ItemID: itemID}});
    }));


    // update every section item
    await Promise.all(Object.keys(updatedsectionitems).map(async (itemID) => {
        const Sectionitem = updatedsectionitems[itemID];

        await models.CourseModuleSectionItem.update({
                Item: Sectionitem.Item, 
                ItemLink: Sectionitem.ItemLink, 
                ItemResourceID: Sectionitem.ItemResourceID,
                ItemType: Sectionitem.ItemType
            }, 
            {where: {ItemID: Number(itemID)}});
    }));

    return response.status(200).json({
        courseModule: courseModule
    });
};


const publishCourseModule = async (request, response)  => {
    const courseModule = request.body.courseModule;

    await models.CourseModule.update({public: 1},
        {where: {courseModuleID: courseModule.courseModuleID}});
    return response.sendStatus(200);
};

// TODO - need to fix this
const deleteCourseModule = (request, response) => {
    return response.sendStatus(200);
};


const createAssignmentModule = (request, response) => {
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

    const assingmentModule = request.body.assignmentModule;

    const newAssingmentModule = {
        AssignmentID: -1,
        courseId: -1,
        AssignmentName: "",
        Date: "",
        ReadingList: [],
        TestList: []
    };

    models.AssignmentModule.create({
        courseID: assingmentModule.courseID,
        AssignmentName: assingmentModule.AssignmentName,
        Date: assingmentModule.Date
    }).then(async (createdAssignmentModule) => {
        newAssingmentModule.AssignmentID = createdAssignmentModule.AssignmentID;
        newAssingmentModule.courseID = createdAssignmentModule.courseID;
        newAssingmentModule.AssignmentName = createdAssignmentModule.AssignmentName;
        newAssingmentModule.Date = createdAssignmentModule.Date;

        await Promise.all(assingmentModule.ReadingList.map(async (reading) => {
            // create reading assingment
            let createdReadingAssingment = await models.AssignmentReading.create({
                AssignmentID: createdAssignmentModule.AssignmentID,
                ReadingDesc: reading.ReadingDesc
            });
            newAssingmentModule.ReadingList.push(createdReadingAssingment);
        }));

        await Promise.all(assingmentModule.TestList.map(async (test) => {
            // create reading assingment
            let createdTestAssingment = await models.AssignmentTest.create({
                AssignmentID: createdAssignmentModule.AssignmentID,
                TestDesc: test.TestDesc
            });
            newAssingmentModule.TestList.push(createdTestAssingment);
        }));

        return response.status(200).json({
            newAssingmentModule: newAssingmentModule
        });
    }).catch(() => {
        return response.sendStatus(400);
    });
};


const updateAssignmentModule = async (request, response) => {
    const assignmentModule = request.body.EditData.assignmentModule;
    console.log();
    const deletedReadings = request.body.EditData.deletedAssignmentReadings;
    const deletedTests = request.body.EditData.deletedAssignmentTests;

    let token = request.headers.token;
    jwt.verify(token, "secretkey", (err, decoded) => {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });
        // TODO - check teacher is the owner of the course
        if (decoded.role.toLowerCase() !== "teacher") {
            return response.status(401).json({
                title: "unauthorized",
                error: err
            });
        }
    });


    // update title and date
    await models.AssignmentModule.update({
        AssignmentName: assignmentModule.AssignmentName,
        Date: assignmentModule.Date
    }, {where: {
        AssignmentID: assignmentModule.AssignmentID
    }});

    //update reading assigments
    await Promise.all( assignmentModule.ReadingList.map(async(reading, reading_index) => {
        if (reading.ReadingID === -1) {
            let createdReadingAssingment = await models.AssignmentReading.create({
                AssignmentID: assignmentModule.AssignmentID,
                ReadingDesc: reading.ReadingDesc
            }); 
            assignmentModule.ReadingList[reading_index] = {
                ReadingID: createdReadingAssingment.ReadingID,
                AssignmentID: createdReadingAssingment.AssignmentID,
                ReadingDesc: createdReadingAssingment.ReadingDesc
            };
        }
    }));

    //update test assignments
    await Promise.all( assignmentModule.TestList.map(async(test, test_index) => {
        if (test.TestID === -1) {
            let createdTestAssingment = await models.AssignmentTest.create({
                AssignmentID: assignmentModule.AssignmentID,
                TestDesc: test.TestDesc
            }); 
            assignmentModule.TestList[test_index] = {
                TestID: createdTestAssingment.TestID,
                AssignmentID: createdTestAssingment.AssignmentID,
                TestDesc: createdTestAssingment.TestDesc
            };
        }
    }));

    // delete, deleted reading assignments
    await Promise.all(Object.keys(deletedReadings).map(async (ReadingID) => {
        await models.AssignmentReading.destroy({where: {ReadingID: Number(ReadingID)}});
    }));

    // delete, deleted test assignments
    await Promise.all(Object.keys(deletedTests).map(async (TestID) => {
        await models.AssignmentTest.destroy({where: {TestID: Number(TestID)}});
    }));

    return response.status(200).json({
        updatedAssignmentModule: assignmentModule
    });
};

// TODO - need to fix this
const deleteAssignmentModule = (request, response) => {
    return response.sendStatus(200);
};


module.exports = {
    JoinCourse,
    create_course,
    fetch_course_doc,
    getCourses,
    getAvailableCourses,
    CreateCourseModule,
    updateCourseModule,
    publishCourseModule,
    deleteCourseModule,
    createAssignmentModule,
    updateAssignmentModule,
    deleteAssignmentModule
};
