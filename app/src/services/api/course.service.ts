import axios from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";


export function getAllCourses() {
  axios.get("/getAllAvailableCourse", {
    headers: {
      token: localStorage.getItem("token")
    }
  })
  .then((response: AxiosResponse) => {
    return response;
  }).catch((error: AxiosError) => {
    console.error(error);
  });
}