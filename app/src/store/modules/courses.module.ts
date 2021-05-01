import {
  courseType,
  CourseModule,
  CourseModuleSectionItems,
  CourseModuleItemEnum,
  CourseModuleSection
} from "../interfaces/course";

import {
  AssignmentModule,
  AssignmentReading,
  AssignmentTest
} from "../interfaces/assignments.types";
import { documentType } from "../interfaces/document";
import { LinkDocumentToCourse, RemoveDocumentFromCourse } from "@/services/api/document.service";
import { QuestionSet } from "../interfaces/question.type";
import { UserType } from "../interfaces/user.types";

export default {
  state: {
    courses: [] as courseType[],
    courseDocuments: [] as documentType[],
    courseQuestionSets: [] as QuestionSet[],
    courseTeachers: [] as UserType[]
  },
  mutations: {
    AddCourse: (state: any, course: courseType) => {
      const courseIndex: number = (state.courses as courseType[])
        .map((c: courseType) => c.courseId)
        .indexOf(course.courseId);

      if (courseIndex === -1) {
        state.courses.push(course);
      } else {
        state.courses[courseIndex] = course;
      }
    },
    AddNewCourseModule: (state: any, courseModule: CourseModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(courseModule.courseId);

      if (courseIndex !== -1) {
        const course = (state.courses as courseType[])[courseIndex];
        courseModule.courseModuleID = course.courseModules.length;

        courseModule.moduleSections.forEach((ms: CourseModuleSection) => {
          ms.courseModuleID = courseModule.courseModuleID;
        });
        course.courseModules.push(courseModule);
      }
    },
    UpdateCourseModule: (state: any, courseModule: CourseModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(courseModule.courseId);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).courseModules
          .map((cm: CourseModule) => cm.courseModuleID)
          .indexOf(courseModule.courseModuleID);

        if (moduleindex === -1) {
          courseModule.courseModuleID = (state.courses[
            courseIndex
          ] as courseType).courseModules.length;
          courseModule.moduleSections.forEach((ms: CourseModuleSection) => {
            ms.courseModuleID = courseModule.courseModuleID;
          });
          (state.courses[courseIndex] as courseType).courseModules.push(
            courseModule
          );
        } else {
          courseModule.moduleSections.forEach((ms: CourseModuleSection) => {
            if (
              ms.courseModuleID !==
              (state.courses[courseIndex] as courseType).courseModules[
                moduleindex
              ].courseModuleID
            ) {
              ms.courseModuleID = (state.courses[
                courseIndex
              ] as courseType).courseModules[moduleindex].courseModuleID;
            }
          });
          (state.courses[courseIndex] as courseType).courseModules[
            moduleindex
          ] = courseModule;
        }
      }
    },
    publishCourseModule: (state: any, courseModule: CourseModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(courseModule.courseId);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).courseModules
          .map((cm: CourseModule) => cm.courseModuleID)
          .indexOf(courseModule.courseModuleID);

        if (moduleindex !== -1) {
          (state.courses[courseIndex] as courseType).courseModules[
            moduleindex
          ].public = true;
        }
      }
    },

    deleteCourseModule: (state: any, courseModule: CourseModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(courseModule.courseId);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).courseModules
          .map((cm: CourseModule) => cm.courseModuleID)
          .indexOf(courseModule.courseModuleID);
        if (moduleindex !== -1) {
          (state.courses[courseIndex] as courseType).courseModules.splice(
            moduleindex,
            1
          );
        }
      }
    },

    AddNewAssignmentModule: (
      state: any,
      assingmentModule: AssignmentModule
    ) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(assingmentModule.courseID);

      if (courseIndex !== -1) {
        const course = (state.courses as courseType[])[courseIndex];
        assingmentModule.AssignmentID = course.AssignmentModules.length;

        assingmentModule.ReadingList.forEach((reading: AssignmentReading) => {
          reading.AssignmentID = assingmentModule.AssignmentID;
        });

        assingmentModule.TestList.forEach((test: AssignmentTest) => {
          test.AssignmentID = assingmentModule.AssignmentID;
        });

        course.AssignmentModules.push(assingmentModule);
      }
    },
    updateAssignmentModule: (
      state: any,
      assignmentmodule: AssignmentModule
    ) => {
      console.log(assignmentmodule);

      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(assignmentmodule.courseID);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).AssignmentModules.map(
          (am: AssignmentModule) => am.AssignmentID
        ).indexOf(assignmentmodule.AssignmentID);

        if (moduleindex === -1) {
          (state.courses[courseIndex] as courseType).AssignmentModules.push(
            assignmentmodule
          );
        } else {
          (state.courses[courseIndex] as courseType).AssignmentModules[
            moduleindex
          ] = assignmentmodule;
        }
      }
    },

    deleteAssignmentModule: (
      state: any,
      assignmentmodule: AssignmentModule
    ) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(assignmentmodule.courseID);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).AssignmentModules.map(
          (am: AssignmentModule) => am.AssignmentID
        ).indexOf(assignmentmodule.AssignmentID);
        if (moduleindex !== -1) {
          (state.courses[courseIndex] as courseType).AssignmentModules.splice(
            moduleindex,
            1
          );
        }
      }
    },

    AddCourseDocuments: (state: any, document: documentType) => {
      const docIndex = (state.courseDocuments as documentType[])
        .map((doc: documentType) => doc.Documentid)
        .indexOf(document.Documentid)
      
      if (docIndex === -1) {
        state.courseDocuments.push(document);
      } else {
        state.courseDocuments[docIndex] = document;
      }
    },

    LinkDocumentToCourse: (state: any, data: any) => {
      const courseID = data.courseID;
      const documentID = data.did;

      const course = (state.courses as courseType[]).find((course: courseType) => course.courseId === courseID)

      if (course) {
        const courseDocIndex  = course.documents.map((docID: number) => docID).indexOf(documentID);
        if (courseDocIndex === -1) {
          course.documents.push(documentID); 
          LinkDocumentToCourse(courseID, documentID);
        }
      }

    },

    RemoveDocumentFromCourse: (state: any, data: any) => {
      const courseID = data.courseID;
      const documentID = data.did;

      const course = (state.courses as courseType[]).find((course: courseType) => course.courseId === courseID)

      if (course) {
        const courseDocIndex  = course.documents.map((docID: number) => docID).indexOf(documentID);
        if (courseDocIndex !== -1) {
          course.documents.splice(courseDocIndex, 1);
          RemoveDocumentFromCourse(courseID, documentID);
        }
      }
            
    },
    AddCourseTeacher: (state: any, teacher: UserType) => {
      const teacherIndex = (state.courseTeachers as UserType[])
        .map((teach: UserType) => teach.UserID)
        .indexOf(teacher.UserID)

      if (teacherIndex === -1) {
        state.courseTeachers.push(teacher);
      } else {
        state.courseTeachers[teacherIndex] = teacher;
      }
    }
  },
  actions: {
    AddCourse: (context: any, course: courseType) => {
      context.commit("AddCourse", course);
    },
    AddNewCourseModule: (context: any, courseModule: CourseModule) => {
      context.commit("AddNewCourseModule", courseModule);
    },
    UpdateCourseModule: (context: any, courseModule: CourseModule) => {
      context.commit("UpdateCourseModule", courseModule);
    },
    publishCourseModule: (context: any, courseModuleID: number) => {
      context.commit("publishCourseModule", courseModuleID);
    },
    deleteCourseModule: (context: any, courseModule: CourseModule) => {
      context.commit("deleteCourseModule", courseModule);
    },

    AddNewAssignmentModule: (
      context: any,
      assingmentModule: AssignmentModule
    ) => {
      context.commit("AddNewAssignmentModule", assingmentModule);
    },

    updateAssignmentModule: (
      context: any,
      assignmentmodule: AssignmentModule
    ) => {
      context.commit("updateAssignmentModule", assignmentmodule);
    },
    deleteAssignmentModule: (
      context: any,
      assignmentmodule: AssignmentModule
    ) => {
      context.commit("deleteAssignmentModule", assignmentmodule);
    },

    AddCourseDocuments: (context: any, document: documentType) => {
      context.commit("AddCourseDocuments", document);
    },
    LinkDocumentToCourse: (context: any, data: any) => {
      context.commit("LinkDocumentToCourse", data)
    },
    RemoveDocumentFromCourse: (context: any, data: any) => {
      context.commit("RemoveDocumentFromCourse", data);
    },
    AddCourseTeacher: (context: any, teacher: UserType) => {
      context.commit("AddCourseTeacher", teacher) 
    }
  },
  getters: {
    getCourses: (state: any) => {
      return state.courses;
    },
    getCourseDocuments: (state: any) => (documentIDs: number[]) => {
      const courseDocuments: documentType[] = [];
      documentIDs.forEach((did: number) => {
        (state.courseDocuments as documentType[]).forEach(
          (doc: documentType) => {
            if (did === doc.Documentid) {
              courseDocuments.push(doc);
            }
          }
        );
      });
      return courseDocuments;
    },

    getCourseDocumentById: (state: any) => (documentID: number) => {
      console.log(state.courseDocuments, documentID)
      return state.courseDocuments.find(
        (doc: documentType) => doc.Documentid === documentID
      );
    },

    getCoursebyId: (state: any) => (CourseId: number) => {
      return state.courses.find(
        (course: courseType) => course.courseId === CourseId
      );
    },

    getCourseTeacher: (state: any) => (teacherID: number) => {
      return state.courseTeachers.find((teacher: UserType) => teacher.UserID === teacherID);
    }
  }
};
