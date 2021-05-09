import { TestData } from "@/store/interfaces/QuestionTest.types";
import { CreateTestStat } from "@/utils/testStats.utils";


export function SaveAttempt(testdata: TestData) {
  const testStats = CreateTestStat(testdata);
  testdata.Score = testStats[1];

  console.log(testdata);
}