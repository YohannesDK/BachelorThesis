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

// #region dummy data
const SectionItem1: CourseModuleSectionItems = {
  ItemID: 0,
  Item: "Section Item Test 1",
  ItemResourceID: 0,
  ItemType: CourseModuleItemEnum.Link
};
const SectionItem2: CourseModuleSectionItems = {
  ItemID: 1,
  Item: "Section Item Test 2",
  ItemResourceID: 0,
  ItemType: CourseModuleItemEnum.Link
};

const CourseModuleSection: CourseModuleSection = {
  SectionID: 0,
  SectionName: "Section Test",
  SectionItems: [SectionItem1, SectionItem2]
};

const dummycourseModule: CourseModule = {
  courseModuleID: 0,
  courseId: 0,
  moduleOrderIndex: 0,
  public: false,
  moduleName: "Module Test",
  moduleSections: [CourseModuleSection]
};

const Test: AssignmentTest = {
  TestID: 0,
  QSID: 0
};
const Test1: AssignmentTest = {
  TestID: 1,
  QSID: 0
};

const Reading: AssignmentReading = {
  ReadingID: 0,
  ReadingDesc: "Read Chapter 1 of Narnia",
  documentID: 2
};
const Reading2: AssignmentReading = {
  ReadingID: 1,
  ReadingDesc: "Read Chapter 1 of Harry Potter",
  documentID: 2
};

const dummyAssignmentModule: AssignmentModule = {
  AssignmentID: 0,
  courseID: 0,
  AssignmentName: "HomeWork ",
  Date: "11 May 2021",
  ReadingList: [Reading, Reading2],
  TestList: [Test, Test1]
};

// #endregion

export default {
  state: {
    courses: [
      {
        courseId: 0,
        courseName: "Web Programming",
        courseShorthand: "DAT310",
        Teacher: 0,
        documents: [],
        courseModules: [dummycourseModule],
        AssignmentModules: [dummyAssignmentModule],
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
  mutations: {},
  actions: {},
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
