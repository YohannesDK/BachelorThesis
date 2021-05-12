import axios from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { DocumentTopicData } from "@/store/interfaces/topic.types";
import store from "@/store";
import { UserType } from "@/store/interfaces/user.types";

export function UpdateSingleUserTopicMonitoring(DocumentTopicData: DocumentTopicData) {
  const User: UserType = store.getters.getActiveUser;

  if (User && User.UserID !== -1) {
    axios
      .post("/updateSingleUserTopicMonitoring", {
        UserID: User.UserID,
        UserName: User.UserName,
        DocumentTopicData: DocumentTopicData 
      }).then((response: AxiosResponse) => {
        if (response.status && response.status === 200) {
          console.log("topic updated saved");
        }
      })
  }
}