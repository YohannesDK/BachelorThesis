import {
  CourseModule,
  CourseModuleSection,
  CourseModuleSectionItems,
  CourseModuleItemEnum
} from "@/store/interfaces/course";

export const SectionItem1: CourseModuleSectionItems = {
  ItemID: 0,
  SectionID: 0,
  Item: "Youtube Link",
  ItemLink: "https://www.youtube.com/",
  ItemResourceID: 0,
  ItemType: CourseModuleItemEnum.Link
};

export const SectionItem2: CourseModuleSectionItems = {
  ItemID: 1,
  SectionID: 0,
  Item: "Test Document",
  ItemResourceID: 0,
  ItemType: CourseModuleItemEnum.DOCUMENT
};

export const courseModuleSection: CourseModuleSection = {
  SectionID: 0,
  courseModuleID: 0,
  SectionName: "Section Test",
  SectionItems: [SectionItem1, SectionItem2]
};

export const dummycourseModule: CourseModule = {
  courseModuleID: 0,
  courseId: 0,
  moduleOrderIndex: 0,
  public: false,
  moduleName: "Module Test",
  moduleSections: [courseModuleSection]
};
