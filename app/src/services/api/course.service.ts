import axios from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { CourseModule, courseType } from "@/store/interfaces/course";
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
  
export function JoinCourse(courseId: number, coursePassword: string) {
  axios
    .post("/JoinCourse", {
      courseId: courseId,
      coursePassword: coursePassword
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        store.dispatch("AddCourse", response.data.course);
      }
    }).catch((error: AxiosError) => {
      console.error(error);
    })
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
        if (courses) {
          courses.forEach((course: courseType) => {
            store.dispatch("AddCourse", course);
          });
        }
      }
    })
    .catch((error: AxiosError) => {
      console.error(error);
    });
}


export function getAvailableCourses() {
  return axios
    .get("/getAvailableCourses")
      .then((response: AxiosResponse) => {
        if (response.status && response.status === 200) {
          return response.data.availableCourses 
        }
      }).catch((error: AxiosError) => {
        console.error(error);
        return []
      })
}


export function CreateCourseModule(newCourseModule: CourseModule) {
  axios
    .post("/createCourseModule", {
      courseModule: newCourseModule
    })
    .then((response: AxiosResponse) => {
      console.log(response.data);
    })
}

export function UpdateCourseModule() {
  return "Not Implemented"
}


export function DeleteCourseModule() {
  return "Not Implemented"
}

export function CreateAssignmentModule() {
  return "Not Implemented"
}

export function UpdateAssignmentModule() {
  return "Not Implemented"
}


export function DeleteAssignmentModule() {
  return "Not Implemented"
}


