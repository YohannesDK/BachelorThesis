import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/welcome.vue";
import { IsAuthenticated, Logout } from "@/services/api/auth.service";
import { LoadStore } from "@/store/helpers/load.store";

const routes: Array<RouteRecordRaw> = [
  {
    beforeEnter(to, from, next) {
      if (IsAuthenticated()) {
        LoadStore();
        next({ name: "Home" });
      } else {
        next();
      }
    },
    path: "/",
    name: "Welcome",
    meta: { showSideBar: false },
    component: Welcome
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/courses",
    name: "Courses",
    component: () =>
      import(/* webpackChunkName: "courses" */ "../views/Courses.vue")
  },
  {
    path: "/documents",
    name: "Documents",
    component: () =>
      import(/* webpackChunkName: "documents" */ "../views/Documents.vue")
  },
  {
    beforeEnter(to, from, next) {
      if (from.name === "Course") {
        to.meta.courseDocument = true;
        to.meta.courseID = from.query.cid
      } else {
        to.meta.courseDocuments = false;
      }
      next()
    },
    path: "/editor",
    name: "EditorView",
    // meta: { courseDocument: false },
    component: () =>
      import(/* webpackChunkName: "EditorView" */ "../views/EditorView.vue")
  },
  {
    path: "/course",
    name: "Course",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/course.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: { showSideBar: false },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue")
  },
  {
    beforeEnter(to, from, next) {
      if (IsAuthenticated()) {
        next({ name: "Home" });
      } else {
        next();
      }
    },
    path: "/login",
    name: "Login",
    meta: { showSideBar: false },
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/login.vue")
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () =>
      import(/* webpackChunkName: "Teacher" */ "../views/Teacher.vue")
  },
  {
    path: "/student",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "Student" */ "../views/Student.vue")
  },
  {
    path: "/questionsets",
    name: "QuestionSets",
    component: () =>
      import(/* webpackChunkName: "QuestionSets" */ "../views/QuestionSets.vue")
  },
  {
    path: "/AddQuestionSet",
    name: "AddQuestionSet",
    component: () =>
      import(
        /* webpackChunkName: "AddNewQuestionSet" */ "../views/AddNewQuestionSet.vue"
      )
  },
  {
    path: "/questiontest",
    name: "questiontest",
    component: () =>
      import(/* webpackChunkName: "questiontest" */ "../views/QuestionTest.vue")
  },
  {
    beforeEnter(to, from, next) {
      if (from.name === "Course") {
        to.meta.courseQS = true;
        to.meta.courseID = from.query.cid
      } else {
        to.meta.courseQS = false;
      }
      next()
    },
    path: "/TakeTest",
    name: "TakeTest",
    meta: { showSideBar: false },
    component: () =>
      import(/* webpackChunkName: "TakeTest" */ "../views/TakeTest.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ "../views/PageNotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ["Login", "Welcome", "Register"];
  const authRequired = !publicRoutes.includes(to.name as string);

  if (authRequired && !IsAuthenticated()) {
    Logout();
    next({ name: "Login" });
  } else next();
});

export default router;
