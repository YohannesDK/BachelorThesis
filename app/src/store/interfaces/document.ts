import { DeltaOperation } from "quill";

export type documentType = {
  Documentid: number;
  name: string;
  body: Array<DeltaOperation> | string;
  tags: string[];
  lastEdited: string;
  QuestionSetID: number[];
};

export type documentsNeedUpdate = {
  [Documentid: number]: [boolean];
};
