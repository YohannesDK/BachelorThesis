import { AssignmentModule } from "./assignments.types";

export enum CourseModuleItemEnum {
  DOCUMENT = 0,
  TEST,
  Link
}

export type CourseModuleSectionItems = {
  ItemID: number;
  Item: string; // this will either be document name, test name or a link to other resources
  ItemLink?: string;
  ItemResourceID: number;
  ItemType:
    | CourseModuleItemEnum.DOCUMENT
    | CourseModuleItemEnum.TEST
    | CourseModuleItemEnum.Link;
};

export type CourseModuleSection = {
  SectionID: number;
  SectionName: string;
  SectionItems: CourseModuleSectionItems[];
};

export type CourseModule = {
  courseModuleID: number;
  courseId: number;
  moduleOrderIndex: number;
  public: boolean;
  moduleName: string;
  moduleSections: CourseModuleSection[];
};

export type courseType = {
  courseId: number;
  courseName: string;
  courseShorthand: string;
  Teacher: number;
  documents: number[];
  courseModules: CourseModule[];
  AssignmentModules: AssignmentModule[];
  QuestionSets: number[];
};
