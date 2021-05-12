import Quill from "quill";
import uuid from "uuid";
import { TopicAttributeName, TopicHeaderClassName } from "../constants";

const Block = Quill.import("blots/block");


// This object will keep IDs to prevent duplicates, maps topicID to header level
export const TopicIDContext: {[topicID: string] : number} = {}


type IHeaderValue = {
  level: 1,
  ref: string // reference topic id
}


export default class HeaderBlot extends Block {

  private domNode: Element;


  constructor(domNode: Element) {
    super(domNode);
    this.domNode = domNode;
  }

  /**
   * Extending the built in static create method, so that we can add some custom data.
   * 
   * @param value - Either the basic header blot format, or an expanded one with a topic-id reference
   */
  public static create(value: IHeaderValue | number) : Element {

    let level = 1; 
    if (typeof value === "number") {
      level = value 
    } else if (typeof value === "string") { // sometimes quill passes the header level as a string
      try {
        level = Number(value);
      } catch (e) {
        console.error(e) 
      }
    } else {
      level = value.level
    }

    const header = super.create(level) as Element; // create header node

    if (typeof value === "object") { // has a ref - topic id (typically when loading from db)
      header.setAttribute(TopicAttributeName, value.ref);
      TopicIDContext[value.ref] = value.level
    } else {
      this.AssignTopicId(header, level); // assign topic id
    }

    return header
  }

  /**
   * Extending the built in static formats method to return a assigned topic id in addition to the heading level.
   * @param domNode - The element to pull out our values from
   */
  public static formats(domNode: Element): IHeaderValue {
    return {
      level: super.formats(domNode),
      ref: domNode.getAttribute(TopicAttributeName) || "document"
    }
  }

  /**
   * Assigns a uuid, to given domNode and adds it to our TopicIDContext to prevent duplicate IDs
   * @param domNode - The element we assign uuid to
   * @param level - Header blot level, [H1, H2, ...] -> [1, 2, ...]
   */
  private static AssignTopicId(domNode: Element, level: number) {

    let newTopicID = uuid.v1();
    while ((newTopicID in TopicIDContext)) {
      newTopicID = uuid.v1(); 
    }

    domNode.setAttribute(TopicAttributeName, newTopicID);
    TopicIDContext[newTopicID] = level
  }

  /**
   * Extending the build in attach method to add the created headerBlot's TopicID to global state
   */
  public attach() {
    super.attach();
    this.DispatchAddedEvent();
  }

  /**
   * Dispatches created event to quill instance, so it can be added in global state
   */
  private DispatchAddedEvent() {
    if (this.quill) {
      const TopicID = this.domNode.getAttribute(TopicAttributeName);
      if (TopicID && this.domNode.innerHTML != "<BR>") {
        this.quill.container.dispatchEvent(new CustomEvent("header-added", {
          detail: {
            TopicID: TopicID,
            Topic: (this.domNode as any).innerText
          }
        }))
      }
    } 
  }

  /**
   * Returns quill instance or null if doesn't exist
   */
  public get quill() {
    if (!this.scroll || !this.scroll.domNode.parentNode) {
      return null 
    }
    return Quill.find(this.scroll.domNode.parentNode!);
  }
  
}


HeaderBlot.blotName = "header";
HeaderBlot.tagName = ["H1", "H2", "H3"]; // allowed header levels
HeaderBlot.className = TopicHeaderClassName;

