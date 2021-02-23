import { createStore } from "vuex";
import { doucmentType } from "./interfaces/document";
import { courseType } from "./interfaces/course";

const store = createStore({
  state: {
    documents: [
      {
        Documentid: 0,
        name: "Tittle 1",
        delta: [
          { attributes: { bold: true }, insert: "Jesus fra Nasaret" },
          { insert: ":\nFødt Ca. 5 fvt., døde 30 evt." },
          { attributes: { list: "bullet" }, insert: "\n" },
          { insert: "En historisk person" },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            insert:
              "Bibel forskere sier Athen ikke var gift, ikke hadde barn, ikke drept av jøder men romerne. "
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            attributes: { bold: true },
            insert: "Ulike oppfatninger, ulike skrifter:"
          },
          { insert: "\n" },
          {
            attributes: { underline: true },
            insert: "Mennesker vekta forskjellen ting ved Jesus"
          },
          { insert: "\nJesus sin død og oppstandelse" },
          { attributes: { list: "bullet" }, insert: "\n" },
          { insert: "Jesus som visdomslærer " },
          { attributes: { list: "bullet" }, insert: "\n\n" },
          { insert: "Jesus sine undre" },
          { attributes: { list: "bullet" }, insert: "\n" },
          { attributes: { bold: true }, insert: "Fire evangelier" },
          {
            insert:
              "\nI det nye testamentet(NT) finner vi fire forfattere som har skrevet om Jesus (på gresk)."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            insert: "Det fire evangeliene; Markus, Matteus, Lukas og Johannes."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            insert:
              "Skrifter som er skrevet om Jesus som ikke står i bibelen kalles apokryfer."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          { attributes: { bold: true }, insert: "Fire evangeliene forts" },
          {
            insert:
              "\nSkrevet for å forkynne troen på den levende Jesus som hadde stått opp fra de døde."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            insert:
              "Skulle styrke tilhørernes tro, gi dem trøst og oppmuntring."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            insert:
              "Forskjellige mennesker hadde forskjellige behov -> evangeliene vektlegger forskjellige ting. -> tilpasset tilhørernes behov."
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          { insert: "\n" }
        ],
        tags: ["DAT310", "WebProg", "Vue", "NodeJS"],
        lastEdited: "2 Feb. 2021"
      },
      {
        Documentid: 1,
        name: "Heaven",
        delta: [
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
        lastEdited: "3 Feb 2021"
      },
      {
        Documentid: 3,
        name: "Lorem",
        delta: [
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
        lastEdited: "5 Feb 2021"
      }
    ] as doucmentType[],
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
        delta: [],
        tags: [],
        lastEdited: "11 Feb 2021"
      });
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
        (doc: doucmentType) => doc.Documentid === Documentid
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
  modules: {}
});

export default store;
