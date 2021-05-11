
const models = require("../../models/index.js");
const questionset_helpers = require("./questionsets.helper");


const getCourseModules = async (courseid, public=-1) => {

  // fetch all course modules, sections and sectionitems
  let courseModules;
  
  if (public === -1) {
    courseModules = await models.CourseModule.findAll({where: {
        courseId: courseid,
    }});
  } else {
    courseModules = await models.CourseModule.findAll({where: {
        courseId: courseid,
        public: public
    }});
  }

  let course_modules_right_format = courseModules.map(courseModule => {
      return {
          courseModuleID: courseModule.courseModuleID,
          courseId: courseModule.courseId,
          moduleOrderIndex: courseModule.moduleOrderIndex,
          public: courseModule.public,
          moduleName: courseModule.moduleName,
          moduleSections: []
      };
  });

  await Promise.all(course_modules_right_format.map(async (coursemodule) => {
      let courseModuleSections = await models.CourseModuleSection.findAll({where: {
          courseModuleID: coursemodule.courseModuleID 
      }});

      let course_module_section_right_format = courseModuleSections.map(section => {
          return {
              SectionID: section.SectionID,
              courseModuleID: section.courseModuleID,
              SectionName: section.SectionName,
              SectionItems: [] 
          };
      });

      await Promise.all(course_module_section_right_format.map(async (section) => {
          let coursemodulesectionitems = await models.CourseModuleSectionItem.findAll({where: {
              SectionID: section.SectionID 
          }});
          section.SectionItems = [...coursemodulesectionitems];
      }));

      coursemodule.moduleSections = [...course_module_section_right_format];
  }));

  return course_modules_right_format
}


const getCourseAssignments = async (courseId) => {
  // fetch all assignment modules
  let assignmentModules = await models.AssignmentModule.findAll({where: {
      courseID: courseId
  }});

  let assingment_modules_right_format = assignmentModules.map(assingmentModule => {
      return {
          AssignmentID: assingmentModule.AssignmentID,
          courseID: assingmentModule.courseID,
          AssignmentName: assingmentModule.AssignmentName,
          Date: assingmentModule.Date,
          ReadingList: [],
          TestList: []
      };
  });

  await Promise.all(assingment_modules_right_format.map(async (assingmentModule) => {
      let assignmentReadings = await models.AssignmentReading.findAll({where: {
          AssignmentID: assingmentModule.AssignmentID
      }});
      assingmentModule.ReadingList = [...assignmentReadings];
  }));

  await Promise.all(assingment_modules_right_format.map(async (assingmentModule) => {
      let assingmentTests = await models.AssignmentTest.findAll({where: {
          AssignmentID: assingmentModule.AssignmentID
      }});
      assingmentModule.TestList = [...assingmentTests];
  }));

  return assingment_modules_right_format
}


const getCourseDocumentsAndData = async (course, allCourseDocumentQuestionSets, allCourseDocumentTopicStats, allCourseDocuments) => {
// fetch all course documents and their question sets, and also fetch all topic stats related to each document
  let courseDocRelations = await models.CourseDocumentRelation.findAll({where: {course_id: course.courseId} });

  await Promise.all(courseDocRelations.map( async (courseDoc) => {
      let doc = await models.document.findOne({where: {id: courseDoc.document_id}});

      if (doc) {
          course.documents.push(doc.id);

          let document_right_format = {
              "Documentid": doc.id,
              "body": doc.body,
              "tags": [],
              "name": doc.title,
              "lastEdited": `${doc.updatedAt}`,
              "QuestionSetID": []
          };

          const documentQuestionSetRelations = await models.QuestionsetDocumentRelation.findAll({where: {
              document_id: doc.id
          }});
          

          if (documentQuestionSetRelations) {
              await Promise.all(documentQuestionSetRelations.map(async (DocQSRelation) => {
                  document_right_format.QuestionSetID.push(DocQSRelation.questionset_id);

                  const questionset = await questionset_helpers.select_questionsets_helper({questionset_id: DocQSRelation.questionset_id })
                  if (questionset !== null) {
                      const questionsetExists = allCourseDocumentQuestionSets.map((qs) => qs.QSID).indexOf(DocQSRelation.questionset_id)
                      if (questionsetExists === -1) {
                          allCourseDocumentQuestionSets.push(questionset[0]);
                      }
                  } 
              }));

          }


          // fetch Topic Data
          const DocumentTopics = await models.TopicMonitoring.findAll({ where : {DocumentID: doc.id }});
          const document_topic_stat = {
              Documentid: doc.id,
              name: doc.title,
              TopicStats: []
          };
          if (DocumentTopics) {
              await Promise.all(DocumentTopics.map(async (DTopic) => {
                  let TopicTimeStat = {
                      TopicID: DTopic.TopicID,
                      Topic: DTopic.TopicName,
                      Time: DTopic.Time,
                      ExpectedTime: 0,
                      UserStats: []
                  };

                  let UserTopicStats = await models.SingleUserTopicMonitoring.findAll({where: {TopicID: DTopic.TopicID }});

                  if (UserTopicStats) {
                      UserTopicStats.forEach(UserTopicStat => {
                          let UTS = {
                              UserId: UserTopicStat.UserId,
                              Name: UserTopicStat.UserName,
                              Time: UserTopicStat.Time
                          };
                          TopicTimeStat.UserStats.push(UTS);
                      }); 
                  }
                  document_topic_stat.TopicStats.push(TopicTimeStat);
              }))
          }
          allCourseDocumentTopicStats.push(document_topic_stat);
          allCourseDocuments.push(document_right_format);
      }
  }));
}


const getCourseQuestionSets = async (course, allCourseQuestionSets) => {
  // fetch all course questionSets
  let courseQsRelations = await models.CourseQuestionSetRelation.findAll({where: {CourseID: course.courseId}})

  await Promise.all(courseQsRelations.map(async (courseQS) => {
    const courseQuestionSet = await questionset_helpers.select_questionsets_helper({questionset_id: courseQS.QuestionSetID});
    if (courseQuestionSet !== null) {
        course.QuestionSets.push(courseQS.QuestionSetID);
        allCourseQuestionSets.push(courseQuestionSet[0]);
    }
  }));
}


const getCourseQuestionSetStats = async (course, allTestDataStats) => {
  // fetch all course questionSet stats
  let courseQsTestRelations = await models.CourseQuestionSetAttemps.findAll({where: {
      CourseID: course.courseId
  }});

  await Promise.all(courseQsTestRelations.map( async (courseTestRelation) => {
      let TestData = {
          TestID: -1,
          QSID: courseTestRelation.QuestionSetID,
          userID: -1,
          name: "",
          Time: -1,
          Score: -1,
          courseID: courseTestRelation.CourseID,
          date: -1,
          TestData: []
      }

      let Attempt = await models.Attempts.findOne({where: {
          AttemptId: courseTestRelation.AttemptId
      }});

      if (Attempt) {
          TestData.TestID = Attempt.AttemptId,
          TestData.userID = Attempt.userId,
          TestData.name = Attempt.Name,
          TestData.Time = Attempt.Time,
          TestData.Score = Attempt.Score,
          TestData.date = Attempt.createdAt 
      }

      // get user answers
      let attemptData = await models.AttemptData.findAll({where: {
          AttemptId: courseTestRelation.AttemptId
      }});
      attemptData.forEach(atd => {
          let TestQuestionAnswer = {
              TQAID: atd.id,
              QuestionType: atd.QuestionType,
              QuestionID: atd.QuestionId,
              Answer: -1
          } 
          if (atd.QuestionType === 0 || atd.QuestionType === 1) {
              TestQuestionAnswer.Answer = atd.TextAnswer 
          } else {
              TestQuestionAnswer.Answer = atd.ChoiceAnswer 
          }
          TestData.TestData.push(TestQuestionAnswer);
      });       
      
      allTestDataStats.push(TestData)
  }))
}



module.exports = {
  getCourseModules,
  getCourseAssignments,
  getCourseDocumentsAndData,
  getCourseQuestionSets,
  getCourseQuestionSetStats
}