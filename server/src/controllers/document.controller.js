//Create functions here
const models = require("../models/index.js");
const jwt = require("jsonwebtoken");

const get_all_documents = (request, response) => {
    models.document.findAll({where: {userId: decoded.id}}).then(function(documents){
      return response.json({
          title: "fetch course",
          documents: documents,
          userId: decoded.id
      });
  });
  
}

const link_document = (request, response) => {

    models.CourseDocumentRelation.create({
      course_id: request.body.courseId,
      document_id: request.body.documentId,
  });

}

const create_document = async (request, response) => {

    const newDocument = await models.document.create({
      body: request.body.body,
      userId: request.body.userId,
      title: request.body.title
  });

  let document_right_format = {
      "Documentid": newDocument.id,
      "body": newDocument.body,
      "tags": [],
      "name": newDocument.title,
      "lastEdited": `${newDocument.createdAt}`,
      "QuestionSetID": []
  }

  return response.status(200).json({document: document_right_format});
}


const alter_document = (request, response) => {
  models.document.update({body: request.body.body, title: request.body.title}, {where: {id: request.body.docID}});
}

const document_info = (request, response) => {

    let token = request.headers.token;
    jwt.verify(token, "secretkey", async (err, decoded )=> {
        if(err) return response.status(401).json({
            title: "unauthorized",
            error: err
        });
        const documents = await models.document.findAll({where: {userId: decoded.id}});
        let document_right_format = documents.map(doc => {
            return {
                "Documentid": doc.id,
                "body": doc.body,
                "tags": [],
                "name": doc.title,
                "lastEdited": `${doc.updatedAt}`,
                "QuestionSetID": []
            }
        });
    
        if (documents) {
            return response.status(200).json({
                title: "fetch course",
                documents: document_right_format,
                userId: decoded.id
            });
        }
        return response.json({
            tittle: "no documents"
        });
    });
}

const fetch_doc = async (request, response) => {

  let document = await models.document.findOne({where: {id: request.query.docId}})

  if (document) {
      return response.status(200).json({
          title: "fetch course",
          document: document,
      });            
  }
  return response.send(404);
}

const delete_document = async (request, response) => {

  const DeletedDocument = await models.document.destroy({
    where: {id: request.body.docID}
  }) 
  console.log(DeletedDocument)
  return response.send(200);
}

module.exports = {
  get_all_documents,
  link_document,
  create_document,
  alter_document,
  document_info,
  fetch_doc,
  delete_document
}
