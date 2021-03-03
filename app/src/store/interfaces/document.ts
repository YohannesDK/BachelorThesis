import { DeltaOperation } from "quill";
export type documentType = {
  Documentid: number;
  name: string;
  delta: Array<DeltaOperation>;
  tags: string[];
  lastEdited: string;
  QuestionSetID: number,
};
