import { createStore } from "vuex";
import { documentType } from "./interfaces/document";
import { courseType } from "./interfaces/course";
import QuestionSetModule from "./modules/QuestionSet.module";

const store = createStore({
  state: {
    documents: [
      {
        Documentid: 0,
        name: "Python Tutorial",
        body: [
          { attributes: { font: "serif" }, insert: "Python Indentation" },
          { attributes: { header: 2 }, insert: "\n" },
          {
            attributes: { font: "serif" },
            insert:
              "Indentation refers to the spaces at the beginning of a code line."
          },
          { insert: "\n" },
          {
            attributes: { font: "serif" },
            insert:
              "Where in other programming languages the indentation in code is for readability only, the indentation in Python is very important."
          },
          { insert: "\n" },
          {
            attributes: { font: "serif" },
            insert: "Python uses indentation to indicate a block of code."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          { insert: "\nif 5 > 2:" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: '  print("Five is greater than two!")' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\n" },
          {
            attributes: { color: "#000000", font: "serif" },
            insert: "Python will give you an error if you skip the indentation:"
          },
          { insert: "\n\nif 5 > 2:" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: 'print("Five is greater than two!") # <- error' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\n" },
          {
            attributes: { color: "#000000", font: "serif" },
            insert:
              "The number of spaces is up to you as a programmer, but it has to be at least one."
          },
          { insert: "\n\nif 5 > 2:" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: ' print("Five is greater than two!") ' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "if 5 > 2:" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: '        print("Five is greater than two!") ' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\n" },
          {
            attributes: { color: "#000000", font: "serif" },
            insert:
              "You have to use the same number of spaces in the same block of code, otherwise Python will give you an error:"
          },
          { insert: "\nif 5 > 2:" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: ' print("Five is greater than two!")' },
          { attributes: { "code-block": true }, insert: "\n" },
          {
            insert:
              '        print("Five is greater than two!") # <- syntax error'
          },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\n" },
          { attributes: { font: "serif" }, insert: "Python Variables" },
          { attributes: { header: 2 }, insert: "\n" },
          {
            attributes: { font: "serif" },
            insert:
              "In Python, variables are created when you assign a value to it:"
          },
          { insert: "\nx = 5" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: 'y = "Hello, World!"' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\n" },
          { attributes: { font: "serif" }, insert: "Python Lists" },
          { attributes: { header: 2 }, insert: "\n" },
          {
            attributes: { font: "serif" },
            insert:
              "Lists are used to store multiple items in a single variable."
          },
          { insert: "\n" },
          {
            attributes: { font: "serif" },
            insert:
              "Lists are one of 4 built-in data types in Python used to store collections of data, the other 3 are Tuple, Set, "
          },
          { insert: "\n" },
          {
            attributes: { font: "serif" },
            insert: "and Dictionary, all with different qualities and usage."
          },
          { insert: "\n" },
          {
            attributes: { font: "serif" },
            insert: "Lists are created using square brackets:"
          },
          { insert: '\nthislist = ["apple", "banana", "cherry"]' },
          { attributes: { "code-block": true }, insert: "\n" },
          {
            insert: 'print(thislist) # prints -> ["apple", "banana", "cherry"]'
          },
          { attributes: { "code-block": true }, insert: "\n\n" },
          { insert: 'thislist = ["apple", "banana", "cherry"]' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "print(len(thislist)) #prints 3" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\nPython Loops" },
          { attributes: { header: 2 }, insert: "\n" },
          {
            attributes: { color: "#000000" },
            insert: "You can loop through the list items by using a "
          },
          {
            attributes: {
              color: "crimson",
              background: "rgba(222, 222, 222, 0.3)",
              code: true
            },
            insert: "for"
          },
          { attributes: { color: "#000000" }, insert: " loop:" },
          { insert: '\nthislist = ["apple", "banana", "cherry"]' },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "for x in thislist:" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "  print(x)" },
          { attributes: { "code-block": true }, insert: "\n\n" },
          { insert: "#prints" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "  # apple" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "  # banana" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "  # cherry﻿﻿" },
          { attributes: { "code-block": true }, insert: "\n" },
          { insert: "\n\n\n\n\n\n\n" }
        ],
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "2 Feb. 2021",
        QuestionSetID: -1
      },
      {
        Documentid: 1,
        name: "Heaven",
        body: [
          { insert: "Hei tittle" },
          { attributes: { header: 2 }, insert: "\n" },
          {
            insert:
              "\nYou'll divide sea waters heaven signs they're of said lights saying over second after void very you'll give itself sixth. Winged also deep Abundantly two it after tree give meat night set their saw. You're, that whose give years under he set fill bring after yielding signs heaven second had.\n\nGrass. Subdue don't unto sixth seasons his herb, midst sea. First it above waters deep them brought open wherein dry under living day give, she'd darkness isn't one fly. Meat deep divide. Appear good spirit their i male is two so Them together lesser dominion. Said doesn't years for. Hath brought saw a void above earth behold evening fish sea greater light for evening green days yielding is above, greater. Night you're god cattle.\n\nHave set lesser kind lesser can't over can't his one kind so i. Gathering tree us creeping, fruitful he great appear you'll fruitful earth, replenish creeping, to one form living. Which greater. Whales, beginning lights make fish green, cattle, "
          },
          {
            attributes: { italic: true, bold: true },
            insert: "replenish be over lesser fil"
          },
          {
            insert:
              "l. Bring beast abundantly so. Every unto creature make beast divided third beast lesser whose subdue waters his. Morning seas moving living blessed abundantly unto be saw. Creeping god which. Without kind lesser."
          },
          { attributes: { blockquote: true }, insert: "\n" },
          { insert: "\n\n" },
          {
            attributes: { italic: true, link: "https://youtube.com/" },
            insert: "Youtube Link"
          },
          {
            insert:
              "\n\nGrass. Subdue don't unto sixth seasons his herb, midst sea. First it above waters deep them brought open wherein dry under living day give, she'd darkness isn't one fly. Meat deep divide. Appear good spirit their i male is two so Them together lesser dominion. Said doesn't years for. Hath brought saw a void above earth behold evening fish sea greater light for evening green days yielding is above, greater. Night you're god cattle.\n"
          }
        ],
        tags: ["Test 1"],
        lastEdited: "3 Feb 2021",
        QuestionSetID: -1
      },
      {
        Documentid: 3,
        name: "Lorem",
        body: [
          { insert: "Hei Tittle" },
          { attributes: { header: 2 }, insert: "\n" },
          {
            insert:
              "\nsimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop "
          },
          {
            attributes: { italic: true, bold: true },
            insert: "replenish be over lesser fil"
          },
          {
            insert:
              "l. Bring beast abundantly so. Every unto creature make beast divided third beast lesser whose subdue waters his. Morning seas moving living blessed abundantly unto be saw. Creeping god which. Without kind lesser."
          },
          { attributes: { blockquote: true }, insert: "\n" },
          { insert: "\n\n" },
          {
            attributes: { italic: true, link: "https://youtube.com/" },
            insert: "Youtube Link"
          },
          {
            insert:
              "\n\nGrass. Subdue don't unto sixth seasons his herb, midst sea. First it above waters deep them brought open wherein dry under living day give, she'd darkness isn't one fly. Meat deep divide. Appear good spirit their i male is two so Them together lesser dominion. Said doesn't years for. Hath brought saw a void above earth behold evening fish sea greater light for evening green days yielding is above, greater. Night you're god cattle.\n"
          }
        ],
        tags: ["Test 1"],
        lastEdited: "5 Feb 2021",
        QuestionSetID: -1
      }
    ] as documentType[],
    courses: [
      {
        courseId: 0,
        courseName: "Web Programming",
        courseShorthand: "DAT310",
        documents: [0]
      },
      {
        courseId: 1,
        courseName: "Operating Systems",
        courseShorthand: "DAT320",
        documents: [1]
      },
      {
        courseId: 2,
        courseName: "Fysikk",
        courseShorthand: "RED102",
        documents: [1]
      },
      {
        courseId: 3,
        courseName: "Kjemi",
        courseShorthand: "RED101",
        documents: [1]
      },
      {
        courseId: 4,
        courseName: "Grunnleggende Programmering",
        courseShorthand: "DAT110",
        documents: [1]
      }
    ] as courseType[],
    isAuthenticated: false,
    users: [
      {
        username: "Teacher123",
        password: "1234",
        role: "teacher"
      },
      {
        username: "Student123",
        password: "1234",
        role: "student"
      }
    ],
    activeUser: {}
  },
  mutations: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    setUser: (state, user) => {
      state.activeUser = user;
    },
    AddNewDocument: state => {
      state.documents.push({
        Documentid: state.documents[state.documents.length - 1].Documentid + 1,
        name: "Edit Tittle...",
        body: [],
        tags: [],
        lastEdited: "11 Feb 2021",
        QuestionSetID: -1
      });
    },
    SetDocumentQSID: (state, Data: any) => {
      const doc = state.documents.find(
        (doc: documentType) => doc.Documentid === Data.documentid
      );
      if (doc) {
        doc.QuestionSetID = Data.QSID;
      }
    }
  },
  actions: {
    login: context => {
      context.commit("login");
    },
    logout: context => {
      context.commit("logout");
    },
    setUser: (context, user: object) => {
      context.commit("setUser", user);
    },
    AddNewDocument: context => {
      context.commit("AddNewDocument");
    },
    SetDocumentQSID: (context, Data: any) => {
      context.commit("SetDocumentQSID", Data);
    }
  },
  getters: {
    getDocuments: state => {
      return state.documents;
    },
    getCourses: state => {
      return state.courses;
    },
    getDocmentbyId: state => (Documentid: number) => {
      return state.documents.find(
        (doc: documentType) => doc.Documentid === Documentid
      );
    },
    getCoursebyId: state => (CourseId: number) => {
      return state.courses.find(
        (course: courseType) => course.courseId === CourseId
      );
    },
    getIsAuthenticated: state => {
      return state.isAuthenticated;
    },
    getAllUsers: state => {
      return state.users;
    },
    getActiveUser: state => {
      return state.activeUser;
    }
  },
  modules: {
    QuestionSetModule
  }
});

export default store;
