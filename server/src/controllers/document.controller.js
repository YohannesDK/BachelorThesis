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

const link_document_to_course = async (request, response) => {
  const courseID = request.body.courseId;
  const documentID = request.body.documentId;

  await models.CourseDocumentRelation.findOrCreate({
    where: {
      course_id: courseID,
      document_id: documentID,
    },
    defaults: {
      course_id: courseID,
      document_id: documentID
    }
  }).then((result) => {
    return response.sendStatus(200);
  }).catch((e) => {
    console.error(e)
    return response.sendStatus(400);
  })
}


const remove_document_from_course = async (request, response) => {
  const courseID = request.body.courseId;
  const documentID = request.body.documentId;

  await models.CourseDocumentRelation.destroy({
    where: {
      course_id: courseID,
      document_id: documentID
    }
  }).then((result) => {
    console.log(result);
    return response.sendStatus(200)
  }).catch((e) => {
    return response.sendStatus(400)
  })
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
            };
        });

        // fetch questionsets related to a document
        // const documentQuestionSets = [];

        await Promise.all(document_right_format.map( async (doc) => {
          const documentQuestionSetRelations = await models.QuestionsetDocumentRelation.findAll({where: {
            document_id: doc.Documentid
          }});
          if (documentQuestionSetRelations) {
            documentQuestionSetRelations.forEach(DocQSRelation => {
              doc.QuestionSetID.push(DocQSRelation.questionset_id);
            });
          }
        }));
    
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
  link_document_to_course,
  remove_document_from_course,
  create_document,
  alter_document,
  document_info,
  fetch_doc,
  delete_document
}
