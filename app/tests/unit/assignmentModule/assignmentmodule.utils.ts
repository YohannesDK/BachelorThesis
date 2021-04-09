import { AssignmentModule, AssignmentReading, AssignmentTest } from "@/store/interfaces/assignments.types";

const Test: AssignmentTest = {
  TestID: 0,
  TestDesc: "Vue Test - lifecycle"
};
const Test1: AssignmentTest = {
  TestID: 1,
  TestDesc: "Vue Test - Reactivity"
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

export const dummyAssignmentModule: AssignmentModule = {
  AssignmentID: 0,
  courseID: 0,
  AssignmentName: "HomeWork ",
  Date: "11 May 2021",
  ReadingList: [Reading, Reading2],
  TestList: [Test, Test1]
};