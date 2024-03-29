import { Round } from "@/utils/math.utils";
import { DocumentTopicStat, GroupedTopicData, GroupedTopicUserStats, TopicTimeStat, TopicTimeUserStat } from "../interfaces/topic.stats.types";

export default {
  state: {
    DocumentTopicStats: [] as DocumentTopicStat[]
  },
  mutations: {
    AddDocumentTopicStat: (state: any, documentTopicStat: DocumentTopicStat) => {
      const DTSIndex: number = (state.DocumentTopicStats as DocumentTopicStat[])
        .map((DTS: DocumentTopicStat) => DTS.Documentid)
        .indexOf(documentTopicStat.Documentid);
      
      if (DTSIndex === -1) {
        state.DocumentTopicStats.push(documentTopicStat);
      } else {
        state.DocumentTopicStats[DTSIndex] = documentTopicStat;
      }
    },
    UnLoadStatsModule: (state: any) => {
      state.DocumentTopicStats.length = 0;
    }
  },
  actions: {
    AddDocumentTopicStat: (context: any, documentTopicStat: DocumentTopicStat) => {
      context.commit("AddDocumentTopicStat", documentTopicStat);
    },
    UnLoadStatsModule: (context: any) => {
      context.commit("UnLoadStatsModule");
    }
  },
  getters: {
    getTopicStats: (state: any) => (documentId: number) => {
      const DocumentTopicStat: DocumentTopicStat | undefined = (state.DocumentTopicStats as DocumentTopicStat[])
        .find((DTS: DocumentTopicStat) => DTS.Documentid === documentId);

      const TopicHeaders: string[] = [];
      let TimeUsed: number[] = [];
      let TimeExpected: number[] = [];

      let TotalDocumentTime = 0;
      let TotalExpectedDocumentTime = 0;
      
      const UserStatsSorted: GroupedTopicData[] = [];

      if (DocumentTopicStat) {


        DocumentTopicStat.TopicStats.forEach((TopicStat: TopicTimeStat, index: number) => {
          TopicHeaders.push(TopicStat.Topic);

          TimeUsed.push(TopicStat.Time);
          TotalDocumentTime += TopicStat.Time;

          TimeExpected.push(TopicStat.ExpectedTime || 0);
          TotalExpectedDocumentTime += TopicStat.ExpectedTime || 0

          TopicStat.UserStats.forEach((userStat: TopicTimeUserStat) => {
            UserStatsSorted.push({
              headerIndex: index,
              UserStat: userStat
            })
          });

        });
        UserStatsSorted.sort((a, b) => a.UserStat.Time - b.UserStat.Time);

        const StudentGroupsResult: GroupedTopicData[][] = [];
        const size = Math.ceil(UserStatsSorted.length / 4);

        while (UserStatsSorted.length > 0) {
          StudentGroupsResult.push(UserStatsSorted.splice(0, size))
        }

        TimeUsed = TimeUsed.map((time: number) => { return Math.round((time/TotalDocumentTime) * 100)})
        TimeExpected = TimeExpected.map((time: number) => {return Math.round((time/TotalExpectedDocumentTime) * 100)} )
        return {
          TopicHeaders,
          TimeUsed,
          TimeExpected,
          StudentGroupsResult
        } 
      }
      return -1
    },

    getCourseDocumentUserStats: (state: any) => (documentId: number) => {
      const DocumentTopicStat: DocumentTopicStat | undefined = (state.DocumentTopicStats as DocumentTopicStat[])
        .find((DTS: DocumentTopicStat) => DTS.Documentid === documentId);
      
      const TopicHeaders: string[] = [];

      const UserStats: {[UserId: number] : any}= {}

      if (DocumentTopicStat) {
        DocumentTopicStat.TopicStats.forEach((TopicStat: TopicTimeStat, index: number) => {
          TopicHeaders.push(TopicStat.Topic);

          TopicStat.UserStats.forEach((userStat: TopicTimeUserStat) => {
            const TimeInMinutes = Round(userStat.Time / 60, 2);

            if (!(userStat.UserId in UserStats)) {
              UserStats[userStat.UserId] = {
                name: userStat.Name,
                data: [TimeInMinutes]
              } 
            } else {
              UserStats[userStat.UserId].data.push(TimeInMinutes);
            }
          })
        }) 


        return {
          TopicHeaders,
          UserStats
        }
      }
      return -1
    }
  }
}