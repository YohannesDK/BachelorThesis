//This file contains endpoints related to the data associated with an attempt
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const cache = require("../routes/routeCache.js");
const express = require("express");
const router = express.Router();

const attemptDataController = require('../controllers/attemptData.contoller')


//This api call creates a record in the Attempts table to save the data for the attempt
router.post("/api/storeAttemptData", attemptDataController.store_Attempt_data)


//This api call fetches data of an attempt
router.get("/api/getAttemptData", cache(300), attemptDataController.get_Attempt_data)


module.exports = router;