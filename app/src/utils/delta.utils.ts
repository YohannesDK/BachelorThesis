import { DeltaOperation } from "quill";

export const DeltaToPlainText = (delta: Array<DeltaOperation>): string => {
  return delta
    .reduce((acc, op) => {
      if (typeof op.insert === "string") {
        return acc + op.insert;
      }
      return acc;
    }, "")
    .trim();
};
