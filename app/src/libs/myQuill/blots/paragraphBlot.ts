import { TopicAttributeName, TopicParagraphClassName } from "../constants";
import Quill from "quill";

const Block = Quill.import("blots/block");

type IParagraphValue = {
  block: "p",
  ref: string // reference topic id
}

export default class ParagraphBlot extends Block {
  private mounted: boolean;


  /**
   * Extending the built in static create method, so that we can add some custom data.
   * 
   * @param value - Either the basic paragraph blot format, or an expanded one with a topic-id reference
   */
  public static create(value: IParagraphValue | string) : Element {
    let paragraph: Element;
    if (typeof value === "object") {
      paragraph = super.create(value.block) 
      paragraph.setAttribute(TopicAttributeName, value.ref)
    } else {
      paragraph = super.create(value);
    }

    return paragraph
  }
  
  /**
   * Extending the built in static formats method to return a assigned topic id in addition to paragraph format.
   * @param domNode - The element to pull out our values from
   */
  public static formats(domNode: Element) : IParagraphValue  {
    return {
      block: super.formats(domNode),
      ref: domNode.getAttribute(TopicAttributeName) || "document"
    } 
  }


  constructor(domNode: Element) {
    super(domNode);
    this.mounted = false
  }


  /**
   * Extending the build in attach method to assign topic id and add scroll events, 
   * after it is added to both quills dom tree, and in the dom
   */
  private attach() { 
    super.attach()
    this.mounted = true
    this.AssignTopicId()
    this.AddEventListeners()
  }

  /**
   * Assigns the same id as the previous domNode
   */
  private AssignTopicId() {
    const prevNode = this.Prev;
    if (prevNode) {
      const prevNodeTopicID = prevNode.domNode.getAttribute(TopicAttributeName);
      if (!prevNodeTopicID) return

      // assign same topic id as previous node
      this.domNode.setAttribute(TopicAttributeName, prevNodeTopicID);
    }
  }

  /**
   * Adds scroll-stopped event listener
   */
  private AddEventListeners() {
    if (this.quill && this.mounted) {
      this.quill.root.addEventListener("scroll-stopped", this.ParagraphInReadZone.bind(this))  
    } 
  }

  /**
   * scroll-stopped event callback, checks if paragraph is within readZone and notifies quill to,
   * add seconds to given topic id
   */
  private ParagraphInReadZone() {
    const ParagraphRect = this.domNode.getBoundingClientRect();
    if (this.quill) {
      if (this.quill.BlotInReadZone(ParagraphRect)) { // check if paragraph is within defined ReadZone
        const TopicID = this.domNode.getAttribute(TopicAttributeName);
        this.quill.EnableTopicUpdating(TopicID);
        
        (this.domNode as Element).classList.add("in-readzone") // to visualize paragraphs inside ReadZone
      } else {
        (this.domNode as Element).classList.remove("in-readzone")
      }
    } 
  }


  /**
   * Returns previous node or null if doesn't exists
   */
  public get Prev() {
    if (!this.mounted) return null
    if (this.domNode.__blot) return this.domNode.__blot.blot.prev
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

ParagraphBlot.blotName = "block";
ParagraphBlot.tagName = ["P"];