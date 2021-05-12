import Quill from "quill";
import { TopicAttributeName } from "../constants";

export default class TopicWordCounter {
  private quill: Quill;
  private options: any;

  constructor(quill: Quill, options: any) {
    this.quill = quill;
    this.options = options;

    quill.on("editor-change", this.UpdateTopicWordCount.bind(this));
  }

  /**
   * UpdateTopicWordCount
   */
  public UpdateTopicWordCount() {
    const selection = this.quill.getSelection();
    if (selection) {
      const line = this.quill.getLine(selection.index);
      const paragraphBlot = line[0];

      console.log("her");
      
      this.quill.on("text-change", () => {
        console.log(paragraphBlot.statics.name);
      })
    } 

  }
}