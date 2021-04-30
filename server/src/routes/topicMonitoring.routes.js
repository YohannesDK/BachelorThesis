
const express = require("express");
const router = express.Router();

const TopicMonitoringController = require("../controllers/topicMonitoring.controller");

router.post("/api/updateTopicMonitoring", TopicMonitoringController.updateTopicMonitoring);


module.exports = router;