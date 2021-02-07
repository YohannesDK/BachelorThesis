import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
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
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "documents" */ "../views/Register.vue")
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () =>
      import(/* webpackChunkName: "documents" */ "../views/Teacher.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "documents" */ "../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
