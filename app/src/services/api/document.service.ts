import store from "@/store";
import { documentType } from "@/store/interfaces/document";
import axios from "../api";
import { AxiosError, AxiosResponse } from "axios";
import { datify } from "@/utils/calender.utils";
import { DeltaOperation } from "quill";


// creates new document
export function CreateDocument(userId: number) {
//Post request to create an empty document
  axios
    .post("/createDocument", {
      userId: userId,
      body: "",
      title: "Edit Title..."
    })
    .then(response => {
      if (response.status && response.status === 200) {
        const NewDocument: documentType = response.data.document;
        if (NewDocument.body === "") {
          NewDocument.body = [];
        }
        NewDocument.lastEdited = datify(NewDocument.lastEdited);
        store.dispatch("UpdateDocuments", NewDocument);
      }
    });
}

export function DeleteDocument(docID: number) {
  axios.post("/deleteDocument", {docID: docID})
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        store.dispatch("DeleteDocument", docID);
      }
    }).catch((err: AxiosError) => {
      console.error(err);
    })
}

// gets all documents from backend
export function GetAllDocuments() {
  axios
    .get("/documentInfo", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        const documents: documentType[] = response.data.documents;

        // TODO
        // det her bædd, dobbel for loop
        documents.forEach((doc: any) => {
          if (doc.body !== "") {
            doc.body = JSON.parse(doc.body as string).ops;
          } else {
            doc.body = []
          }
          doc.lastEdited = datify(doc.lastEdited);
          store.dispatch("UpdateDocuments", doc);
        });
      }
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
}

// updates document
export function UpdateDocument(userId: number, document: documentType) {
  axios
    .post("/alterDocument", {
      userId: userId,
      docID: document.Documentid,
      body: JSON.stringify(document.body),
      title: document.name
    })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        console.log("updated");
      }
    });
}
