import Quill, { DeltaOperation, Sources } from "quill";
import { Delta, Op } from "types-quill-delta";
import HeaderBlot from "./blots/headerBlot";
import ParagraphBlot from "./blots/paragraphBlot";
import { WordPerSecond } from "./constants";
import TopicSelectionModule from "./modules/topicSelection.module";

type ITopic = {
  Topic: string;
  Time: number;
  InReadZone: boolean;
}

// Our Quill implementation
class MyQuill extends Quill {
  public container: any;
  public options: any;

  public SelectedTopicID: string | null;
  public TopicData: {[topicID: string]: ITopic};
  public ExpectedTopicTime: {[topicID: string]: number};

  // public ScrollThrottle = false
  public ScrollTimeout: any = -1;
  public Timer: any;
  public Time: number;

  public Monitor: boolean;
  public readZone: Element | null;
  public readZoneClientRect: DOMRect;

  constructor(container: any, options: any = {}) {
    super(container, options)
    this.container = container
    this.options = options

    this.SelectedTopicID = options.SelectedTopicID || null
    this.TopicData = options.TopicData || {}
    this.ExpectedTopicTime = options.ExpectedTopicTime || {}
    this.Time = options.Time || 0

    this.Monitor = options.Monitor || false
    this.readZone = document.getElementById("topic-readzone");
    this.readZoneClientRect = this.readZone!.getBoundingClientRect();

    this.AddEventListeners()
  }

  /**
   * Override the built setContents method, so we can start the timer, once the content is loaded
   */
  public setContents(delta: Delta, source: Sources | undefined ) {
    const editorContent = super.setContents(delta, source);

    // start timer at once, even before first scroll event is captured
    if (this.Monitor) {
      this.CalculateExpectedTopicTime(delta);

      this.StartTimer();
      this.root.dispatchEvent(new CustomEvent("scroll-stopped"));
    }
    return editorContent;
  }

  //#region Events

  private AddEventListeners() {
    if (this.Monitor) {
      window.addEventListener("scroll", this.ScrollEventHandler.bind(this))
    }
    this.HeaderAddedEventHandler();
  }


  private ScrollEventHandler() {
    if (this.ScrollTimeout !== -1) clearTimeout(this.ScrollTimeout); 

    this.StopTimer()
    this.ScrollTimeout = window.setTimeout(() => {
      this.StartTimer()
    }, 500)
  }

  private HeaderAddedEventHandler() {
    this.container.addEventListener("header-added", (e: CustomEvent) => {
      const { TopicID, Topic } = e.detail;

      if (TopicID && typeof TopicID === "string") {

        if (!(TopicID in this.TopicData)) {
          this.TopicData[TopicID] = {
            Topic: Topic,
            Time: 0,
            InReadZone: false
          } 
        } 
      }
    })
  }

  //#endregion 

  //#region Time
  public StartTimer() {

    this.root.dispatchEvent(new CustomEvent("scroll-started"));

    this.Time = 0
    this.Timer = setInterval(() => {
      ++this.Time;
      for (const TopicID in this.TopicData) {
        if (Object.prototype.hasOwnProperty.call(this.TopicData, TopicID)) {

          if (this.TopicData[TopicID].InReadZone) {
            ++this.TopicData[TopicID].Time;
          }
          
        }
      }

      // TODO
      // here we would interrupt the timer if it exceeds some amount, say 4-5 min
      if (this.Time > 300) {
        clearInterval(this.Timer);
        this.StopTimer() 
      }
    }, 1000) // 1 second
  }

  public StopTimer() {
    if (this.Timer) {
      this.ResetTopics()
      this.root.dispatchEvent(new CustomEvent("scroll-stopped"));
      clearTimeout(this.Timer);
    }  
  }
  //#endregion

  //#region Topic Handling
  public BlotInReadZone(blotRect: DOMRect) : boolean { 
    return (
      blotRect.top >= this.readZoneClientRect.top &&
      blotRect.bottom <= this.readZoneClientRect.bottom
    )
  }

  public UpdateTopicIds(delta: Delta) {
    let HeaderTopicID = "document";
    delta.map((op: Op, index: number) => {
      if (("attributes" in op) && ("header" in op["attributes"]!)) {
        HeaderTopicID = op["attributes"]!["header"]["ref"];
      }
      if (("attributes" in op) && !("header" in op["attributes"]!) ) {
        // console.log(op);
        if ("block" in op["attributes"]!) {
          if (
              (op["attributes"]!["block"]["ref"] === null) || 
              (op["attributes"]!["block"]["ref"] !== HeaderTopicID && HeaderTopicID !== "document")
          ) {
            console.log(index)
            op["attributes"]!["block"]["ref"] = HeaderTopicID
          }
        } 
      }
      return op
    });

    return delta
  }

  /**
   * calculates expected topic time by finding number of words in a topic and dividing it by WordPerSecond
   */
  public CalculateExpectedTopicTime(delta: Delta) {
    let TopicID = "document";


    delta.map((op: Op, index: number) => {
      if (("attributes" in op) && ("header" in op["attributes"]!)) {
        TopicID = op["attributes"]!["header"]["ref"];
      }
      if (("insert" in op) && (typeof op["insert"] === "string") && (op["insert"]!.match(/\n/g)||[]).length === 0) {
      
        const text = op["insert"]!.trim();
        const length = text.length > 0 ? text.split(/\s+/).length : 0;

        if (!(TopicID in this.ExpectedTopicTime)) {
          this.ExpectedTopicTime[TopicID] = length 
        } else {
          this.ExpectedTopicTime[TopicID] += length 
        }
      }
    })
    const topicids = Object.keys(this.ExpectedTopicTime);
    topicids.map((tid: string) => {
      this.ExpectedTopicTime[tid] = Math.round(this.ExpectedTopicTime[tid]/WordPerSecond)
    })
  }

  public EnableTopicUpdating(topicID: string) {
    if (topicID in this.TopicData) {
      this.TopicData[topicID].InReadZone = true;
    }
  }

  // reset all InReadZone, ot false
  public ResetTopics() {
    for (const TopicID in this.TopicData) {
      if (Object.prototype.hasOwnProperty.call(this.TopicData, TopicID)) {
        this.TopicData[TopicID].InReadZone = false;
      }
    }  
  }

  public UpdateSelectedTopic(topicID: string) {
    this.SelectedTopicID = topicID
  }

  //#endregion

}



// register custom blots, themes and modules
MyQuill.register(HeaderBlot, true);
MyQuill.register(ParagraphBlot, true);

MyQuill.register("modules/TopicSelectionModule", TopicSelectionModule, true)
export default MyQuill;
