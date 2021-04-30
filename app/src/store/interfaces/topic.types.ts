
export type TopicData = {
  TopicID: string;
  TopicName: string;
  Time: number;
}

export type DocumentTopicData = {
  DocumentID: number;
  TopicTimes: TopicData[]
}

export type CourseTopicData = {
  CourseID: number;
  DocumentTopicData: DocumentTopicData[]
}

