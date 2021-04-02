import { createStore } from "vuex";
import { courseType } from "./interfaces/course";
import { UserType, RoleType } from "./interfaces/user.types";
import QuestionSetModule from "./modules/QuestionSet.module";
import QuestionTestModule from "./modules/QuestionTest.module";
import DocumentModule from "./modules/Documents.module";
import TestStatsModule from "./modules/TestStats.module";
// import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
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
    user: {
      UserID: -1,
      UserName: "",
      Role: RoleType.Student,
      FirstName: "",
      LastName: ""
    } as UserType,

    activeUser: {},
    loading: false
  },
  mutations: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    setUser: (state, user: UserType) => {
      state.user.UserID = user.UserID;
      state.user.UserName = user.UserName;
      state.user.Role = user.Role;
      state.user.FirstName = user.FirstName;
      state.user.LastName = user.LastName;
    },
    loading: (state, loadingstatus) => {
      state.loading = loadingstatus;
    }
  },
  actions: {
    loading: (context, loadingstatus) => {
      context.commit("loading", loadingstatus);
    },
    login: context => {
      context.commit("login");
    },
    logout: context => {
      context.commit("logout");
    },
    setUser: (context, user: UserType) => {
      context.commit("setUser", user);
    }
  },
  getters: {
    getIsLoading: state => {
      return state.loading;
    },
    getCourses: state => {
      return state.courses;
    },
    getCoursebyId: state => (CourseId: number) => {
      return state.courses.find(
        (course: courseType) => course.courseId === CourseId
      );
    },
    getIsAuthenticated: () => {
      return !localStorage.getItem("token");
    },
    getActiveUser: state => {
      return state.user;
    }
  },
  modules: {
    QuestionSetModule,
    QuestionTestModule,
    DocumentModule,
    TestStatsModule
  }
  // uncomment this on to persist state
  // plugins: [createPersistedState()]
});

export default store;
