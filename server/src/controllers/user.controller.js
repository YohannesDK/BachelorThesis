//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const login = async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    let user = await models.users.findOne({where: {username: username} });
    
    let alluser = await models.users.findAll();
    
    // If the user does not exist, return error
    if (!user) {
      return response.status(400).json({
            title: "User not found",
            error: "invalid credentials"
      });
    }
    
    if(!bcrypt.compareSync(password, user.password)){
        return response.status(400).json({
            title: "Login failed",
            error: "invalid credentials"
        });
    } 
    
    let token = jwt.sign({ username: user.username, role: user.role, id: user.id}, "secretkey");

    // Return the user data and token to frontend
    return response.status(200).json({
        title: "logged in",
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        role: user.role,
        token: token
    });

};

const register = (request, response) => {
    axios.get("https://api.typeform.com/forms/vRs8ZOsa/responses", {
      headers: {
          "Authorization": "Bearer " + process.env.TYPEFORM_ACCESS_TOKEN,
      }
  }).then((res) => {
      const register_info = ref.data.items.find((item) => item["response_id"] === request.body.responseID).answers;

      const firstname = register_info[0].text;
      const lastname = register_info[1].text;
      const email = register_info[2].email;
      const username = register_info[3].text;
      const password = register_info[4].text;
      const role = register_info[5].choice.label;

      console.log(firstname, lastname, username, password, role)
      

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
      response.sendStatus(200);
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
  login,
  register,
  users,
  user_info,
  student_course
};

