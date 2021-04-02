export type courseType = {
  courseId: number;
  courseName: string;
  courseShorthand: string;
  Teacher: number;
  documents: number[];
};

export enum CourseModuleItemEnum {
  DOCUMENT = 0,
  TEST,
  Link
}

export type CourseModuleSectionItems = {
  Item: string; // this will either be document name, test name or a link other resources
  ItemType: CourseModuleItemEnum.DOCUMENT | CourseModuleItemEnum.TEST | CourseModuleItemEnum.Link;
}

export type CourseModuleSection = {
  SectionName: string;
  SectionItems: CourseModuleSectionItems[];
}

export type CourseModule = {
  courseId: number;
  moduleName: string;
  moduleSections: CourseModuleSection[];
}
