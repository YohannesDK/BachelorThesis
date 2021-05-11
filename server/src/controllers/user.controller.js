//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const user = (request, response) => {
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
      let token = jwt.sign({ username: users.username, role: users.role, id: users.id}, "secretkey");


      // Return the user data and token to frontend
      return response.status(200).json({
          title: "logged in",
          id: users.id,
          firstname: users.firstname,
          lastname: users.lastname,
          email: users.email,
          username: users.username,
          role: users.role,
          token: token
      });
  }).catch(function(err){
      console.log(err);
  });
};

const register = (request, response) => {
    axios.get("https://api.typeform.com/forms/vRs8ZOsa/responses?page_size=1", {
      headers: {
          "Authorization": "Bearer " + process.env.TYPEFORM_ACCESS_TOKEN,
      }
  }).then((res) => {
      const register_info = res.data.items[0].answers;

      const firstname = register_info[0].text;
      const lastname = register_info[1].text;
      const email = register_info[2].email;
      const username = register_info[3].text;
      const password = register_info[4].text;
      const role = register_info[5].choice.label;
      

      models.users.findOne({where: {username: username} }).then(function (users){
          
          if(!users){
              models.users.create({
                  username: username,
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  password: bcrypt.hashSync(password, 10),
                  role: role
              });
          }

          if(users){
              return response.json({
                  title: "Fail",
                  error: "Username is taken"
              });
          }

      });
      response.send(200);
  }).catch((error) => {
      console.error(error);
  });
};

const users = (request, response) => {
      // User enters desired username, we look that username up in the database
      models.users.findOne({where: {username: request.body.username} }).then(function (users){

        // If that username does not exist, go ahead and create the user
        if(!users){
            models.users.create({
                username: request.body.username,
                fullname: request.body.fullname,
                password: bcrypt.hashSync(request.body.password, 10),
                role: request.body.role
            });
        }

        // If the user does exist, dont create the user
        if(users){
            return response.json({
                title: "Fail",
                error: "Username is taken"
            });
        }

    });
};

const user_info = (request, response) => {
  let token = request.headers.token;
  jwt.verify(token, "secretkey", (err, decoded )=> {
      

      if(err) return response.status(401).json({
          title: "unauthorized",
          error: err
      });

      models.users.findOne({where: {id: decoded.id} }).then(function (user){
          models.courses.findAll({where: {userId: decoded.id}}).then(function (courses){

              console.log(decoded.id);

              return response.json({
                  title: "Fetch user info",
                  user,
                  courses
              });

          });
      }).catch(function(err){
          console.log(err);
      });
  });
};

const student_course = (request, response) => {
  let courseList = [];
    
  let token = request.headers.token;
  jwt.verify(token, "secretkey", (err, decoded )=> {


      const id = decoded.id;
      const username = decoded.username;
      const fullname = decoded.fullname;
      const role = decoded.role;
      if(err) return response.status(401).json({
          title: "unauthorized",
          error: err
      });

      models.StudentCourseJunction.findAll({where: {userId: decoded.id} }).then(function (stud){
          for(let i = 0; i < stud.length; i++) {

              models.courses.findOne({where: {id: stud[i].courseId}}).then(function (courses){
                  courseList.push(courses.dataValues);
              });
          }
          const greet = function() {
              return response.json({
                  title: "Fetch course info",
                  stud,
                  id,
                  username,
                  fullname,
                  role,
                  courseList
              });
          };

          setTimeout(greet, 100);

      }).catch(function(err){
          console.log(err);
      });
  });
};

module.exports = {
  user,
  register,
  users,
  user_info,
  student_course
};

