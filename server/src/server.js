var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({
    path: ".env"
});


// const MainRouter = require("./routes/router.js");
const attemptRoutes = require("./routes/attempts.routes.js")
const questionSetsRoutes = require("./routes/questionSets.routes.js")
const attemptDataRoutes = require("./routes/attemptData.routes")
const questionsRoutes = require("./routes/questions.routes")
const documentRoutes = require("./routes/document.routes")
const courseRoutes = require("./routes/course.routes.js")
const userRoutes = require("./routes/user.routes")



var cors = require("cors");

const { response, json, request } = require("express");

app.use(cors());

// session handling
//Cookie length abit lengthy, need to change
app.use(session({
    secret:"user_handling",
    resave: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, "../../app/dist/")));

app.get("/", (request, response) => {
    console.log("her")
    response.sendFile(path.join(__dirname, "../../app/dist/index.html"));
})


app.use(attemptRoutes)
app.use(questionSetsRoutes)
app.use(attemptDataRoutes)
app.use(questionsRoutes)
app.use(documentRoutes)
app.use(courseRoutes)
app.use(userRoutes)

// main router will delegate request to correct route handlers
// having problems with sequelize. 
// app.use("/api", MainRouter);


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
