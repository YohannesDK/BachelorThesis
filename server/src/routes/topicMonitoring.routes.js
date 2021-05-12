
const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth.middleware");

const TopicMonitoringController = require("../controllers/topicMonitoring.controller");

router.post("/api/updateTopicMonitoring", isAuth, TopicMonitoringController.updateTopicMonitoring);


module.exports = router;