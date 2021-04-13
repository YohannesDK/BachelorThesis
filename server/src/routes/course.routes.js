//This file contains endpoints related to courses
const express = require("express");
const router = express.Router();
const models = require("../models/index.js");
const cache = require("../routes/routeCache.js");


const courseController = require("../controllers/course.controller")

router.get("/api/courseInfo", cache(300), courseController.course_info )

//This api call creates a course
router.post("/api/createCourse", courseController.create_course )

//This api call fetches documents related to a course
router.get("/api/fetchCourseDoc", cache(300), courseController.fetch_course_doc)

module.exports = router;