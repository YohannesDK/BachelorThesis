
const models = require("../models/index.js");


const updateSingleUserTopicMonitoring = async (request, response) => {
  const UserID = request.body.UserID;
  const DocumentTopicData = request.body.DocumentTopicData;

  await Promise.all(DocumentTopicData.TopicTimes.map(async (TopicTimeData) => {
    const TopicExists = await models.SingleUserTopicMonitoring.findOne({where: {
      TopicID: TopicTimeData.TopicID,
      UserId: UserID
    }});

    if (!TopicExists) {
      await models.SingleUserTopicMonitoring.create({
        TopicID: TopicTimeData.TopicID,
        Time: TopicTimeData.Time,
        UserId: UserID
      }) 
    } else {
      await models.SingleUserTopicMonitoring.increment("Time", {by: TopicTimeData.Time, where: {
        TopicID: TopicTimeData.TopicID,
        UserId: UserID
      }});
    }  
  }))
  return response.sendStatus(200);
}


module.exports = {
  updateSingleUserTopicMonitoring
}