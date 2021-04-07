const express = require("express");
const MainRouter = express.Router();

// separated routers
const documentsRouter = require("./document.routes.js");
const userRouter = require("./user.routes2.js");

MainRouter.use("/documents", documentsRouter);
MainRouter.use("/user", userRouter);



module.exports = MainRouter;

