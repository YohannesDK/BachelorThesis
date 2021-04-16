//This file cointains routes related to questionsets
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const sequelize = require ('sequelize');
const cache = require("../routes/routeCache.js");


const express = require("express");
const router = express.Router();

const questionSetsController = require('../controllers/questionSets.controller')


//This api call creates a question set and relation between document and the question set
router.post("/api/createQSnoLink", questionSetsController.create_QS_noLink)
router.post("/api/createQSdocLink", questionSetsController.create_QS_docLink)
router.get("/api/getDocQuestionSets", questionSetsController.get_doc_questionSets)
router.get("/api/getUserQuestionSets", questionSetsController.get_user_questionSets)
//This api call fetches a question set
router.get("/api/fetchQS", questionSetsController.fetch_QS)

module.exports = router;
