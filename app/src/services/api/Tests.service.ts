import { TestData } from "@/store/interfaces/QuestionTest.types";
import { CreateTestStat } from "@/utils/testStats.utils";
import axios from "@/services/api";
import { AxiosResponse } from "axios";


export function SaveAttempt(testdata: TestData) {
  const testStats = CreateTestStat(testdata);
  testdata.Score = testStats[1];

  axios
    .post("/saveAttempt", 
      {
        TestData: testdata,
      }
  ).then((response: AxiosResponse) => {
    if (response.status && response.status === 200) {
      console.log("saved") 
    }
  })
}