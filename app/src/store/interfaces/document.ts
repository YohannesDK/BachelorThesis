import { DeltaOperation } from "quill";
export type documentType = {
  Documentid: number;
  name: string;
  body: Array<DeltaOperation>;
  tags: string[];
  lastEdited: string;
  QuestionSetID: number[];
};
