const express = require("express");
let router = express.Router();

const document_controller = require("../controllers/document.controller.js")



router.post("/getAllDocuments", document_controller.getAllDocuments)


// app.post("/api/getAllDocuments", (request, response) => {
//   models.document.findAll({where: {userId: decoded.id}}).then(function(documents){
//       return response.json({
//           title: "fetch course",
//           documents: documents,
//           userId: decoded.id
//       });
//   });
// })


module.exports = router;