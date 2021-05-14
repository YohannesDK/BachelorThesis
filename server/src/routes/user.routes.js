//This file contains all user related routes
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
const cache = require("../routes/routeCache.js");


const userController = require("../controllers/user.controller")





//This api call is called when users log in.
router.post("/api/user", userController.login )

//This api call gets user info

//This api call registers users
router.post("/api/register", userController.register )


router.get("/api/userinfo", userController.user_info)


//This api call retrieves all the courses that belong to one user.
//It is abit messy but it works
router.get("/api/studentCourse", userController.student_course)

module.exports = router;
