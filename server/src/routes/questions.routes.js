//This file contains api calls that are related to questions
const models = require("../models/index.js");

const express = require("express");
const router = express.Router();

const questionsController = require('../controllers/questions.controller')

//This api call creates a question 
router.post("/api/createQuestion", questionsController.create_question )

//This api call creates a true or false question
router.post("/api/createTFQ", questionsController.create_true_false_question)


//This API saves question info
router.post("/api/saveQuestion", questionsController.save_question )

module.exports = router;