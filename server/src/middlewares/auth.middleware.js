// jwt authentication verification middleware
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // TODO - fix token name later -> Bearer + authorization token
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.token;
    jwt.verify(token, "secretkey", (err, decoded) => {
      if(err) return response.status(401).json({
        title: "unauthorized",
        error: err
      });
      else next();
    });
  } catch (error) {
   res.status(400).json({
     error: new Error("Bad Request")
   });
  }
};
