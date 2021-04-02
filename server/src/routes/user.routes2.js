const express = require("express");
let router = express.Router();

const user_controller = require("../controllers/user.controller")


router.post("/login", user_controller.login);

router.get("/register", user_controller.register);

router.get("/userinfo", user_controller.getUserInfo);

router.get("/studentCourses", user_controller.studentCourses);


module.exports = router;
