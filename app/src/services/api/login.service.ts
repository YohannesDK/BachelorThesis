import { useStore } from "vuex";
import store from "@/store/index";

export function checkLogin(form: any) {
  const users = store.getters.getAllUsers;
  return users.filter(
    (user: any) =>
      user.username === form.username && user.password === form.password
  );
}
