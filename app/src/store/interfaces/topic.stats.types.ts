
export type CourseDocuments = {
  Documentid: number;
  name: string;
}

export type TopicTimeUserStat = {
  UserId: number;
  Name: string;
  Time: number;
}

export type TopicTimeStat = {
  TopicID: number;
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


export type GroupedTopicUserStats = {
  Group: string;
  percentage: number; 
  UserStats: TopicTimeUserStat[]
}