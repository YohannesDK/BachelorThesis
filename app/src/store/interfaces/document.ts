import { DeltaOperation } from "quill";
export type doucmentType = {
  Documentid: number;
  name: string;
  delta: Array<DeltaOperation>;
  tags: string[];
  lastEdited: string;
};
