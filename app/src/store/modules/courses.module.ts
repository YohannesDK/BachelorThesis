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



export default {
  state: {
    courses: [
      {
        courseId: 0,
        courseName: "Web Programming",
        courseShorthand: "DAT310",
        Teacher: 0,
        documents: [],
        courseModules: [],
        AssignmentModules: [],
        QuestionSets: []
      },
      {
        courseId: 1,
        courseName: "Operating Systems",
        courseShorthand: "DAT320",
        documents: [],
        courseModules: [],
        AssignmentModules: [],
        QuestionSets: []
      }
    ] as courseType[]
  },
  mutations: {
    AddNewCourseModule: (state: any, courseModule: CourseModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(courseModule.courseId);

      if (courseIndex !== -1) {
        const course = (state.courses as courseType[])[courseIndex];
        courseModule.courseModuleID = course.courseModules.length;
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
          (state.courses[courseIndex] as courseType).courseModules.push(
            courseModule
          );
        } else {
          (state.courses[courseIndex] as courseType).courseModules[
            moduleindex
          ] = courseModule;
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

    AddNewAssignmentModule: (state: any, assingmentModule: AssignmentModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(assingmentModule.courseID);

      if (courseIndex !== -1) {
        const course = (state.courses as courseType[])[courseIndex] 
        assingmentModule.AssignmentID = course.AssignmentModules.length
        course.AssignmentModules.push(assingmentModule);
      }
    },
    updateAssignmentModule: (state: any, assignmentmodule: AssignmentModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(assignmentmodule.courseID);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).AssignmentModules
          .map((am: AssignmentModule) => am.AssignmentID)
          .indexOf(assignmentmodule.AssignmentID);

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

    deleteAssignmentModule: (state: any, assignmentmodule: AssignmentModule) => {
      const courseIndex = (state.courses as courseType[])
        .map((course: courseType) => course.courseId)
        .indexOf(assignmentmodule.courseID);

      if (courseIndex !== -1) {
        const moduleindex = (state.courses[
          courseIndex
        ] as courseType).AssignmentModules
          .map((am: AssignmentModule) => am.AssignmentID)
          .indexOf(assignmentmodule.AssignmentID);
        if (moduleindex !== -1) {
          (state.courses[courseIndex] as courseType).AssignmentModules.splice(
            moduleindex,
            1
          );
        }
      }
    }
  },
  actions: {
    AddNewCourseModule: (context: any, courseModule: CourseModule) => {
      context.commit("AddNewCourseModule", courseModule);
    },
    UpdateCourseModule: (context: any, courseModule: CourseModule) => {
      context.commit("UpdateCourseModule", courseModule);
    },
    deleteCourseModule: (context: any, courseModule: CourseModule) => {
      context.commit("deleteCourseModule", courseModule);
    },

    AddNewAssignmentModule: (context: any, assingmentModule: AssignmentModule) => {
      context.commit("AddNewAssignmentModule", assingmentModule)
    },
    
    updateAssignmentModule: (context: any, assignmentmodule: AssignmentModule) => {
      context.commit("updateAssignmentModule", assignmentmodule)
    },
    deleteAssignmentModule: (context: any, assignmentmodule: AssignmentModule) => {
      context.commit("deleteAssignmentModule", assignmentmodule)
    },
    
  },
  getters: {
    getCourses: (state: any) => {
      return state.courses;
    },
    getCoursebyId: (state: any) => (CourseId: number) => {
      return state.courses.find(
        (course: courseType) => course.courseId === CourseId
      );
    }
  }
};
