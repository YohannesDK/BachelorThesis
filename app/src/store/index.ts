import { createStore } from "vuex";
import { doucmentType } from "./interfaces/document";
import { courseType } from "./interfaces/course";

export default createStore({
  state: {
    documents: [
      {
        Documentid: 0,
        name: "Tittle 1",
        text: `Lorem Ipsum is simply dummy text of the
                printing and typesetting industry... Standard dummy text ever...`,
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "2 Feb. 2021"
      },
      {
        Documentid: 1,
        name: "Ajax 1",
        text: `Used to retrieve data, not pages
              Asynchronous, i.e., no need to “lock” the document while waiting for the response
              Fetch
              Performs AJAX call
              Returns a promise`,
        tags: ["DAT310", "WebProg", "Ajax", "NodeJS"],
        lastEdited: "1 Jan. 2021"
      },
      {
        Documentid: 2,
        name: "random 1",
        text: `Lorem Ipsum is simply dummy text of the
                printing and typesetting industry... Standard dummy text ever...`,
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "3 Feb. 2021"
      },
      {
        Documentid: 3,
        name: "random 2",
        text: `Lorem Ipsum is simply dummy text of the
                printing and typesetting industry... Standard dummy text ever...`,
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "1 Jan. 2021"
      },
      {
        Documentid: 4,
        name: "random 3",
        text: `Executes the specified document, using the enclosed data
            Data is sent in the body of the request
            No restrictions on data length
        `,
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "1 Jan. 2021"
      },
      {
        Documentid: 5,
        name: "random 4",
        text: `Lorem Ipsum is simply dummy text of the
                printing and typesetting industry... Standard dummy text ever...`,
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "1 Jan. 2021"
      }
    ] as doucmentType[],
    courses: [
      {
        courseName: "Web Programming",
        courseShorthand: "DAT310",
        documents: [0, 2, 3]
      }
    ] as courseType[]
  },
  mutations: {},
  actions: {},
  getters: {
    getDocuments: state => {
      return state.documents;
    },
    getCourses: state => {
      return state.courses;
    }
  },
  modules: {}
});
