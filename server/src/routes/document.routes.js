const express = require("express");
let router = express.Router();
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");
const cache = require("../routes/routeCache.js");


const documentController = require("../controllers/document.controller")

//This api call gets all the documents
router.post("/api/getAllDocuments", documentController.get_all_documents)

//This api call creates a document relation
router.post("/api/linkDocumentToCourse", documentController.link_document_to_course)

//This api call removes a document - course, relation
router.post("/api/RemoveDocumentFromCourse", documentController.remove_document_from_course)

//This api call creates a document
router.post("/api/createDocument", documentController.create_document)

//This api call saves / updates document content
router.post("/api/alterDocument", documentController.alter_document)

//This api call retrieves all documents that belong to one user
router.get("/api/documentInfo", documentController.document_info)

//This api call retrieves one document based on query ID.
//TODO: authorize this api npcall
router.get("/api/fetchDoc", documentController.fetch_doc )

//This api call deletes a document
router.post("/api/deleteDocument", documentController.delete_document)


module.exports = router;