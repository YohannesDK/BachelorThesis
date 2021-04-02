const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");


//This api call is called when users log in.
exports.login = (request, response) => {
  console.log("loginnnn")
  models.users.findOne({where: {username: request.body.username} }).then(function (users){
    // If the user does not exist, return error
    if(!users){
        return response.json({
            title: "User not found",
            error: "invalid credentials"
        });
    } 
    
    // If the passwords dont match, return error
    if(!bcrypt.compareSync(request.body.password, users.password)){
        return response.json({
            title: "Login failed",
            error: "invalid credentials"
        });
    } 

    // let token = jwt.sign({ username: users.username, password: users.password, role: users.role, id: users.id}, "secretkey", {
    //     expiresIn: "10s" // set token expiation time, so we can check if token is valid by just decoding it
    // });

    // If the above statements are not executed, the user information is correct. Proceed to create a token
    let token = jwt.sign({ username: users.username, password: users.password, role: users.role, id: users.id}, "secretkey");

    // Return the user data and token to frontend
    return response.status(200).json({
        title: "logged in",
        username: users.username,
        password: users.password,
        id: users.id,
        role: users.role,
        token: token
    });
  }).catch(function(err){
      console.log(err);
  });

}


exports.register = (req, res) => {
  res.send("Not IMplemented")
}


//This api call creates a user, probably swapped out for the api above.
exports.users = (req, res) => {
  res.send("Not IMplemented")
}


exports.getUserInfo = (req, res) => {
  res.send("Not IMplemented")
}


//This api call retrieves all the courses that belong to one user.
//It is abit messy but it works
exports.studentCourses = (req, res) => {
  res.send("Not IMplemented")
}
