//This file contains api calls that are related to questions
const models = require("../models/index.js");

const express = require("express");
const router = express.Router();

const questionsController = require('../controllers/questions.controller')

//This api call creates a questionSet
router.post("/api/createQuestionSet", questionsController.createQuestionSet)

// this api call updates a questionset
router.post("/api/updateQuestionSet", questionsController.updateQuestionSet)

// This api call gets all questionSets
router.get("/api/getAllQuestionSets", questionsController.getQuestionSets)

router.delete("/deleteQuestionSet", questionsController.deleteQuestionSet)

module.exports = router;
