import axios from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { courseType } from "@/store/interfaces/course";
import store from "@/store";

export function CreateCourse(course: courseType, coursePassword: string) {
  axios
    .post("/createCourse", {
      courseName: course.courseName,
      coursePassword: coursePassword,
      userId: course.Teacher,
      shorthand: course.courseShorthand
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        store.dispatch("AddCourse", response.data.course);
      }
    });
}

export function getAllCourses() {
  axios
    .get("/getCourses", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        const courses: courseType[] = response.data.courses;
        courses.forEach((course: courseType) => {
          store.dispatch("AddCourse", course);
        });
      }
    })
    .catch((error: AxiosError) => {
      console.error(error);
    });
}
