export type AssignmentTest = {
  TestID: number;
  AssignmentID: number;
  TestDesc: string;
};

export type AssignmentReading = {
  ReadingID: number;
  AssignmentID: number;
  ReadingDesc: string;
  documentID?: number;
  link?: string;
};

export type AssignmentModule = {
  AssignmentID: number;
  courseID: number;
  AssignmentName: string;
  Date: string;
  ReadingList: AssignmentReading[];
  TestList: AssignmentTest[];
};
