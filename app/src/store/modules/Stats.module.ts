import { DocumentTopicStat, GroupedTopicData, GroupedTopicUserStats, TopicTimeStat, TopicTimeUserStat } from "../interfaces/topic.stats.types";

export default {
  state: {
    DocumentTopicStats: [
      {
        Documentid: 3,
        name: "123223",
        TopicStats: [
          {
            TopicID: "0",
            Topic: "Header 1",
            Time: 20,
            ExpectedTime: 10,
            UserStats: [
              {
                UserId: 0,
                Name: "Yohannes",
                Time: 20,
              },
              {
                UserId: 1,
                Name: "Osama",
                Time: 60,
              },
              {
                UserId: 2,
                Name: "Mamma",
                Time: 20,
              },
            ]
          },
          {
            TopicID: "1",
            Topic: "Header 2",
            Time: 80,
            ExpectedTime: 50,
            UserStats: [
              {
                UserId: 0,
                Name: "Yohannes",
                Time: 50,
              },
              {
                UserId: 1,
                Name: "Osama",
                Time: 20,
              },
              {
                UserId: 2,
                Name: "Mamma",
                Time: 80,
              },
            ]
          },
          {
            TopicID: "2",
            Topic: "Header 3",
            Time: 30,
            ExpectedTime: 40,
            UserStats: [
              {
                UserId: 0,
                Name: "Yohannes 1",
                Time: 10,
              },
              {
                UserId: 1,
                Name: "Osama 2",
                Time: 60,
              },
              {
                UserId: 2,
                Name: "Mamma 1",
                Time: 20,
              },
              {
                UserId: 3,
                Name: "Osama 2",
                Time: 50,
              },
              {
                UserId: 4,
                Name: "Mamma 2",
                Time: 0,
              },
              {
                UserId: 5,
                Name: "Osama 3",
                Time: 350,
              },
              {
                UserId: 6,
                Name: "Mamma 3",
                Time: 19,
              },
              {
                UserId: 7,
                Name: "Osama 4",
                Time: 10,
              },
              {
                UserId: 8,
                Name: "Mamma 4",
                Time: 2,
              },
              {
                UserId: 9,
                Name: "Osama 5",
                Time: 20,
              },
              {
                UserId: 10,
                Name: "Mamma 5",
                Time: 20,
              },
            ]
          },
        ]
      },
      {
        Documentid: 2,
        name: "Some Document",
        TopicStats: [
          {
            TopicID: "4",
            Topic: "Header some doc 1",
            Time: 20,
            ExpectedTime: 0,
            UserStats: [
              {
                UserId: 0,
                Name: "Yohannes",
                Time: 20,
              },
              {
                UserId: 1,
                Name: "Osama",
                Time: 60,
              },
              {
                UserId: 2,
                Name: "Mamma",
                Time: 20,
              },
            ]
          },
          {
            
            TopicID: "5",
            Topic: "Header some doc 2",
            Time: 80,
            ExpectedTime: 0,
            UserStats: [
              {
                UserId: 0,
                Name: "Yohannes",
                Time: 50,
              },
              {
                UserId: 1,
                Name: "Osama",
                Time: 20,
              },
              {
                UserId: 2,
                Name: "Mamma",
                Time: 80,
              },
            ]
          },
          {
            
            TopicID: "6",
            Topic: "Header some doc 3",
            Time: 30,
            ExpectedTime: 0,
            UserStats: [
              {
                UserId: 0,
                Name: "Yohannes",
                Time: 10,
              },
              {
                UserId: 1,
                Name: "Osama",
                Time: 60,
              },
              {
                UserId: 2,
                Name: "Mamma",
                Time: 20,
              },
            ]
          },
        ]
      },
    ] as DocumentTopicStat[]
  },
  mutations: {},
  actions: {},
  getters: {
    getTopicStats: (state: any) => (documentId: number) => {
      const DocumentTopicStat: DocumentTopicStat | undefined = (state.DocumentTopicStats as DocumentTopicStat[])
        .find((DTS: DocumentTopicStat) => DTS.Documentid === documentId);

      const TopicHeaders: string[] = [];
      const TimeUsed: number[] = [];
      const TimeExpected: number[] = [];

      const UserStatsSorted: GroupedTopicData[] = [];

      const StudentGroups = {
        "Student Group 1" : [] as GroupedTopicData[],
        "Student Group 2" : [] as GroupedTopicData[],
        "Student Group 3" : [] as GroupedTopicData[],
        "Student Group 4" : [] as GroupedTopicData[]
      };

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