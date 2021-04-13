//This file contains all user related routes
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
const cache = require("../routes/routeCache.js");


const userController = require("../controllers/user.controller")





//This api call is called when users log in.
router.post("/api/user", userController.user )

//This api call gets user info

//This api call registers users
router.get("/api/register", userController.register )

//This api call creates a user, probably swapped out for the api above.
router.post("/api/users", userController.users)

router.get("/api/userinfo", cache(300), userController.user_info)


//This api call retrieves all the courses that belong to one user.
//It is abit messy but it works
router.get("/api/studentCourse", cache(300), userController.student_course)

module.exports = router;