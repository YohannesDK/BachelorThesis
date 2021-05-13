
export type TopicData = {
  TopicID: string;
  TopicName: string;
  Time: number;
  ExpectedTime: number;
}

export type DocumentTopicData = {
  DocumentID: number;
  TopicTimes: TopicData[]
}

export type CourseTopicData = {
  CourseID: number;
  DocumentTopicData: DocumentTopicData[]
}

