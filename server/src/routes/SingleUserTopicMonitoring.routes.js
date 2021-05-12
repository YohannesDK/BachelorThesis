
const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth.middleware");

const SingleUserTopicMonitoringController = require("../controllers/SingleUserTopicMonitoring.controller");

router.post("/api/updateSingleUserTopicMonitoring", isAuth, SingleUserTopicMonitoringController.updateSingleUserTopicMonitoring);


module.exports = router;