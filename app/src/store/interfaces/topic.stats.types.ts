
export type TopicStatsDocuments = {
  Documentid: number;
  name: string;
};

export type TopicTimeUserStat = {
  UserId: number;
  Name: string;
  Time: number;
}

export type TopicTimeStat = {
  TopicID: string;
  Topic: string;
  Time: number;
  ExpectedTime?: number;
  UserStats: TopicTimeUserStat[]
}


export type DocumentTopicStat = {
  Documentid: number;
  name: string;
  TopicStats: TopicTimeStat[]
}

export type GroupedTopicData = {
  headerIndex: number;
  UserStat: TopicTimeUserStat
}


export type GroupedTopicUserStats = {
  percentage: number; 
  UserStats: TopicTimeUserStat[]
}