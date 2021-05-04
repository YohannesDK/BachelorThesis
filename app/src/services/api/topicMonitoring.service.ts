import axios from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { DocumentTopicData } from "@/store/interfaces/topic.types";

export function UpdateTopicMonitoring(DocumentTopicData: DocumentTopicData, courseID: number) {
  axios
    .post("/updateTopicMonitoring", {
      courseID: courseID,
      DocumentTopicData: DocumentTopicData 
    }).then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        console.log("topic updated saved");
      }
    })
}