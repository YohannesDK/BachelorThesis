import { documentType, documentsNeedUpdate } from "../interfaces/document";
import { UpdateDocument } from "@/services/api/document.service";
export default {
  state: {
    documents: [] as documentType[],
    HighestdocumentID: 0,
    documentsNeedUpdate: {} as documentsNeedUpdate
  },
  mutations: {
    AddNewDocument: (state: any) => {
      state.documents.push({
        Documentid: state.HighestdocumentID,
        name: "Edit Tittle...",
        body: [],
        tags: [],
        lastEdited: "11 Feb 2021",
        QuestionSetID: []
      });
    },
    SetDocumentQSID: (state: any, Data: any) => {
      const doc = state.documents.find(
        (doc: documentType) => doc.Documentid === Data.documentid
      );
      if (doc) {
        doc.QuestionSetID.forEach((ele: number) => {
          if (ele === Data.QSID) {
            return;
          }
        });
        doc.QuestionSetID.push(Data.QSID);
      }
    },
    SetDocumentTittle: (state: any, Data: any) => {
      state.documents.find(
        (doc: documentType) => doc.Documentid === Data.Documentid
      ).name = Data.DocumentTittle;
    },
    DeleteDocument: (state: any, docID: number) => {
      const index = state.documents
        .map((doc: documentType) => doc.Documentid)
        .indexOf(docID);
      if (index > -1) {
        state.documents.splice(index, 1);
      }
    },
    DeleteQuestionSetFromDocument: (state: any, Data: any) => {
      const doc = state.documents.find(
        (doc: documentType) => doc.Documentid === Data.documentid
      );
      if (doc) {
        const QSIDIndex = doc.QuestionSetID.map((QSID: number) => QSID).indexOf(
          Data.QSID
        );
        if (QSIDIndex !== -1) {
          doc.QuestionSetID.splice(QSIDIndex, 1);
        }
      }
    },
    DeleteQuestionSetFromAllDocuments: (state: any, Data: any) => {
      Data.DocumentIds.forEach((documentid: number) => {
        const doc = state.documents.find(
          (doc: documentType) => doc.Documentid === documentid
        );
        if (doc) {
          const QSIDIndex = doc.QuestionSetID.map(
            (QSID: number) => QSID
          ).indexOf(Data.QSID);
          if (QSIDIndex !== -1) {
            doc.QuestionSetID.splice(QSIDIndex, 1);
          }
        }
      });
    },
    UpdateDocuments: (state: any, Document: documentType) => {
      const docIndex: number = state.documents
        .map((doc: documentType, index: number) => {
          if (state.HighestdocumentID < doc.Documentid) {
            state.HighestdocumentID = doc.Documentid + 1;
          }
          return doc.Documentid;
        })
        .indexOf(Document.Documentid);

      if (docIndex === -1) {
        state.documents.push(Document);
      } else {
        (state.documents[docIndex] as documentType) = Document;
      }
    },
    UpdateDocumentBody: (state: any, Data: any) => {
      const doc: documentType = state.documents.find(
        (doc: documentType) => doc.Documentid === Data.docID
      );
      if (doc) {
        console.log(Data, doc)
        doc.name = Data.DocumentTittle;
        doc.body = Data.body;
        UpdateDocument(Data.userId, doc);
      }
    }
  },
  actions: {
    AddNewDocument: (context: any) => {
      context.commit("AddNewDocument");
    },
    SetDocumentQSID: (context: any, Data: any) => {
      context.commit("SetDocumentQSID", Data);
    },
    SetDocumentTittle: (context: any, Data: any) => {
      context.commit("SetDocumentTittle", Data);
    },
    DeleteDocument: (context: any, docID: number) => {
      context.commit("DeleteDocument", docID);
    },
    DeleteQuestionSetFromDocument: (context: any, Data: any) => {
      context.commit("DeleteQuestionSetFromDocument", Data);
    },
    DeleteQuestionSetFromAllDocuments: (context: any, Data: any) => {
      context.commit("DeleteQuestionSetFromAllDocuments", Data);
    },
    UpdateDocuments: (context: any, Document: documentType) => {
      context.commit("UpdateDocuments", Document);
    },
    UpdateDocumentBody: (context: any, Data: any) => {
      context.commit("UpdateDocumentBody", Data);
    }
  },
  getters: {
    getDocuments: (state: any) => {
      return state.documents;
    },
    getDocmentbyId: (state: any) => (Documentid: number) => {
      return state.documents.find(
        (doc: documentType) => doc.Documentid === Documentid
      );
    },
    getHighestDocumentId: (state: any) => {
      return state.HighestdocumentID;
    }
  }
};
