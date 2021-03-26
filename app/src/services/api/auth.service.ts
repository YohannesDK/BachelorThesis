import router from "@/router";
import store from "@/store/index";
import { UserType } from "@/store/interfaces/user.types";
import { AxiosResponse } from "axios";
import axios from "../api";
// import { authHeader } from "../helpers/auth-header.helper";

export function checkLogin(form: any) {
  const users = store.getters.getAllUsers;
  return users.filter(
    (user: any) =>
      user.username === form.username && user.password === form.password
  );
}

export function Login(username: string, password: string) {
  axios
    .post("/user", {
      username: username,
      password: password
    })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        const user: UserType = {
          UserName: response.data.username,
          Role: response.data.role.toUpperCase(),
          FirstName: "None Yet" //TODO - fix so we have firstname / lastname in user model
        }
        store.dispatch("setUser", user);
        store.dispatch("login");
        localStorage.setItem("token", response.data.token);
        router.push({name: "Home" });
      }
    });
}

export function Logout() {
  localStorage.removeItem("token");
  router.push("/");
}