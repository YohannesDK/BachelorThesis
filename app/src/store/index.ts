import { createStore } from "vuex";
import { UserType, RoleType } from "./interfaces/user.types";
import QuestionSetModule from "./modules/QuestionSet.module";
import QuestionTestModule from "./modules/QuestionTest.module";
import DocumentModule from "./modules/Documents.module";
import TestStatsModule from "./modules/TestStats.module";
import CourseModule from "./modules/courses.module";
// import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
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
    TestStatsModule,
    CourseModule
  }
  // uncomment this on to persist state
  // plugins: [createPersistedState()]
});

export default store;
