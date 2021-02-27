import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/welcome.vue";

const routes: Array<RouteRecordRaw> = [
  {
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
    path: "/editor",
    name: "EditorView",
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
    path: "/AddQuestionSet",
    name: "AddQuestionSet",
    component: () =>
      import(
        /* webpackChunkName: "QuestionSet" */ "../views/AddNewQuestionSet.vue"
      )
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
