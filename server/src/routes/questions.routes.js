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


// This api call deletes a questionSet and all its related information
router.delete("/deleteQuestionSet", questionsController.deleteQuestionSet)

// This api call links a questionSet to a document
router.post("/api/AssignQSToDocument", questionsController.AssignQuestionSetToDocument)

// This api call un-links a questionSet from a document
router.post("/api/RemoveQSFromDocument", questionsController.RemoveQuestionSetFromDocument)


// This api call links a questionSet to a course
router.post("/api/AssignQSToCourse", questionsController.AssignQuestionSetToCourse)

// This api call un-links a questionSet from a course
router.post("/api/RemoveQSFromCourse", questionsController.RemoveQuestionSetFromCourse)

module.exports = router;
