//This file contains endpoints related to courses
const express = require("express");
const router = express.Router();
const models = require("../models/index.js");
const cache = require("../routes/routeCache.js");
const courseController = require("../controllers/course.controller")


// enrols a student
router.post("/api/JoinCourse", courseController.JoinCourse )

//This api call creates a course
router.post("/api/createCourse", courseController.create_course )

//This api call fetches documents related to a course
router.get("/api/fetchCourseDoc", courseController.fetch_course_doc)

// get all courses using user id
router.get("/api/getCourses", courseController.getCourses)

// gets all available course for a student to join
router.get("/api/getAvailableCourses", courseController.getAvailableCourses)

// creates a courseModule
router.post("/api/createCourseModule", courseController.CreateCourseModule)

// updates a courseModule
router.post("/api/updateCourseModule", courseController.updateCourseModule)

// publishes a coursemodule
router.post("/api/publishCourseModule", courseController.publishCourseModule)

// creates a assignmentmodule
router.post("/api/createAssignmentModule", courseController.createAssignmentModule)

// creates a assignmentmodule
router.post("/api/updateAssignmentModule", courseController.updateAssignmentModule)


module.exports = router;
