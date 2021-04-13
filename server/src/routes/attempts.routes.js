//This file contains endpoints related to an attempt of a test
const express = require("express");
const router = express.Router();

const attemptController = require('../controllers/attempts.controller')

//This api call saves an attempt
router.post("/api/saveAttempt", attemptController.save_attempt)

module.exports = router;