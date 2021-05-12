import Quill from "quill";
import { TopicAttributeName } from "../constants";


export default class TopicSelectModule {
  private quill: Quill;
  private options: any;
  private PrevTopicSelected: Element | null;

  constructor(quill: Quill, options: any) {
    this.quill = quill
    this.options = options 
    this.PrevTopicSelected = null

    quill.on("editor-change", this.updateTopicSelected.bind(this));
  }


  /**
   * Updates topic selected on quill instance
   */
  public updateTopicSelected() {
    const selection = this.quill.getSelection()
    if (selection) {
      const line = this.quill.getLine(selection.index);
      const headerBlot = line[0];

      if (headerBlot.statics.name === "HeaderBlot") {

        if (this.PrevTopicSelected !== null) {
          this.PrevTopicSelected.classList.remove("header-active") 
        }

        this.PrevTopicSelected = headerBlot.domNode;
        headerBlot.domNode.classList.add("header-active");

        // assign selected topic id
        // this.quill.scroll.domNode.dispatchEvent(new customeve)
        (this.quill as any).UpdateSelectedTopic(headerBlot.domNode.getAttribute(TopicAttributeName));
      } else {
        if (this.PrevTopicSelected !== null) {
          this.PrevTopicSelected.classList.remove("header-active");
          (this.quill as any).UpdateSelectedTopic("null");
        }

        // remove selected topic id
      }
    }
  }
}