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
    }
  },
  actions: {
    AddDocumentTopicStat: (context: any, documentTopicStat: DocumentTopicStat) => {
      context.commit("AddDocumentTopicStat", documentTopicStat);
    }
  },
  getters: {
    getTopicStats: (state: any) => (documentId: number) => {
      const DocumentTopicStat: DocumentTopicStat | undefined = (state.DocumentTopicStats as DocumentTopicStat[])
        .find((DTS: DocumentTopicStat) => DTS.Documentid === documentId);

      const TopicHeaders: string[] = [];
      const TimeUsed: number[] = [];
      const TimeExpected: number[] = [];

      const UserStatsSorted: GroupedTopicData[] = [];

      if (DocumentTopicStat) {
        DocumentTopicStat.TopicStats.forEach((TopicStat: TopicTimeStat, index: number) => {
          TopicHeaders.push(TopicStat.Topic);
          TimeUsed.push(TopicStat.Time);
          TimeExpected.push(TopicStat.ExpectedTime || 0);

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

        return {
          TopicHeaders,
          TimeUsed,
          TimeExpected,
          StudentGroupsResult
        } 
      }
      return -1
    }
  }
}