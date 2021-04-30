const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

const updateTopicMonitoring = async (request, response) => {
  const courseID = request.body.courseID;
  const DocumentTopicData = request.body.DocumentTopicData;

  await Promise.all(DocumentTopicData.TopicTimes.map(async (TopicTimeData) => {
    const TopicExists = await models.TopicMonitoring.findOne({where: {
      TopicID: TopicTimeData.TopicID
    }});

    if (!TopicExists) {
      await models.TopicMonitoring.create({
        TopicID: TopicTimeData.TopicID,
        TopicName: TopicTimeData.TopicName,
        Time: TopicTimeData.Time,
        DocumentID: DocumentTopicData.DocumentID,
        CourseID: courseID
      }) 
    } else {
      await models.TopicMonitoring.increment("Time", {by: TopicTimeData.Time, where: {
        TopicID: TopicTimeData.TopicID
      }});
    }  
  }))
  return response.sendStatus(200);
}

module.exports = {
  updateTopicMonitoring
}
