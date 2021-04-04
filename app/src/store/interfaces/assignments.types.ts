export type AssignmentTest = {
  TestID: number;
  QSID: number;
};

export type AssignmentReading = {
  ReadingID: number;
  ReadingDesc: string;
  documentID?: number;
  link?: string;
};

export type Assignment = {
  AssignmentID: number;
  courseID: number;
  AssignmentName: string;
  Date: string;
  ReadingList: AssignmentReading[];
  TestList: AssignmentTest[];
};
