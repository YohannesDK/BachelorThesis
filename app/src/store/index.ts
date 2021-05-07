import { createStore } from "vuex";
import { UserType, RoleType } from "./interfaces/user.types";
import QuestionSetModule from "./modules/QuestionSet.module";
import QuestionTestModule from "./modules/QuestionTest.module";
import DocumentModule from "./modules/Documents.module";
import TestStatsModule from "./modules/TestStats.module";
import CourseModule from "./modules/courses.module";
import StatsModule from "./modules/Stats.module";
import createPersistedState from "vuex-persistedstate";

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
    loading: false,
    alertMessages: [] as any[]
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
    },
    AddNewAlert: (state, alertData) => {
      let alertID = 0

      if (state.alertMessages.length > 0) {
        alertID = state.alertMessages[state.alertMessages.length - 1].id + 1; 
      }
      const alert = {
        id: alertID,
        message: alertData.message,
        shown: false,
        type: alertData.type
      }
      state.alertMessages.push(alert)
    },
    RemoveAlert: (state, alertID) => {
      const alert = state.alertMessages.find((alert) => alert.id === alertID);
      if (alert) {
        alert.shown = true; 
      }
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
    },
    AddNewAlert: (context, alertData) => {
      context.commit("AddNewAlert", alertData)
    },
    RemoveAlert: (context, alertID: number) => {
      context.commit("RemoveAlert", alertID)
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
    },
    getIsTeacher: state => {
      if (state.user) {
        return state.user.Role.toLocaleLowerCase() === "teacher";
      }
      return -1;
    },
    getAlertMessages: state => {
      return state.alertMessages.filter((alert: any) => {
        if (alert.shown === false) {
          return alert
        }
      })
    }
  },
  modules: {
    QuestionSetModule,
    QuestionTestModule,
    DocumentModule,
    TestStatsModule,
    CourseModule,
    StatsModule
  },
  // uncomment this to persist state
  plugins: [createPersistedState()]
});

export default store;
