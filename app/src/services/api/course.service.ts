import axios from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { CourseModule, courseType } from "@/store/interfaces/course";
import store from "@/store";
import { AssignmentModule } from "@/store/interfaces/assignments.types";
import { documentType } from "@/store/interfaces/document";
import { datify } from "@/utils/calender.utils";
import { UserType } from "@/store/interfaces/user.types";
import { QuestionSet } from "@/store/interfaces/question.type";
import { DocumentTopicStat } from "@/store/interfaces/topic.stats.types";

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
    })
    .catch((error: AxiosError) => {
      console.error(error);
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
        const courseDocuments: documentType[] = response.data.allCourseDocument;
        const courseTeachers = response.data.allTeachers;
        const CourseDocumentQuestionSets: QuestionSet[] =
          response.data.allCourseDocumentQuestionSets;
        const CourseQuestionSets: QuestionSet[] =
          response.data.allCourseQuestionSets;
        const CourseDocumentTopicStat: DocumentTopicStat[] =
          response.data.allCourseDocumentTopicStats;

        if (courses) {
          courses.forEach((course: courseType) => {
            store.dispatch("AddCourse", course);
          });
        }
        if (courseDocuments) {
          courseDocuments.forEach((doc: documentType) => {
            if (doc.body !== "") {
              doc.body = JSON.parse(doc.body as string).ops;
            } else {
              doc.body = [];
            }
            doc.lastEdited = datify(doc.lastEdited);
            store.dispatch("AddCourseDocuments", doc);
          });
        }
        if (courseTeachers) {
          courseTeachers.forEach((teacher: UserType) => {
            store.dispatch("AddCourseTeacher", teacher);
          });
        }
        if (CourseDocumentQuestionSets) {
          CourseDocumentQuestionSets.forEach((QS: QuestionSet) => {
            QS.LastEdited = datify(QS.LastEdited as string);
            store.dispatch("AddCourseDocumentQuestionSets", QS);
          });
        }
        if (CourseQuestionSets) {
          CourseQuestionSets.forEach((QS: QuestionSet) => {
            QS.LastEdited = datify(QS.LastEdited as string);
            store.dispatch("AddCourseQuestionSets", QS);
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
        return response.data.availableCourses;
      }
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return [];
    });
}

export function CreateCourseModule(newCourseModule: CourseModule) {
  axios
    .post("/createCourseModule", {
      courseModule: newCourseModule
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        if (response.data.newcourseModule) {
          store.dispatch("AddNewCourseModule", response.data.newcourseModule);
        }
      }
    });
}

export function UpdateCourseModule(EditData: any) {
  axios
    .post("/updateCourseModule", {
      EditData: EditData
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        if (response.data.courseModule) {
          store.dispatch("UpdateCourseModule", response.data.courseModule);
        }
      }
    });
}

export function PublishCourseModule(courseModule: CourseModule) {
  axios
    .post("/publishCourseModule", {
      courseModule: courseModule
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        store.dispatch("publishCourseModule", courseModule);
      }
    });
}

export function DeleteCourseModule() {
  return "Not Implemented";
}

export function CreateAssignmentModule(assingmentModule: AssignmentModule) {
  axios
    .post("/createAssignmentModule", {
      assignmentModule: assingmentModule
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        if (response.data.newAssingmentModule) {
          store.dispatch(
            "AddNewAssignmentModule",
            response.data.newAssingmentModule
          );
        }
      }
    });
}

export function UpdateAssignmentModule(EditData: any) {
  axios
    .post("/updateAssignmentModule", {
      EditData: EditData
    })
    .then((response: AxiosResponse) => {
      if (response.status && response.status === 200) {
        if (response.data.updatedAssignmentModule) {
          store.dispatch(
            "updateAssignmentModule",
            response.data.updatedAssignmentModule
          );
        }
      }
    });
}

export function DeleteAssignmentModule() {
  return "Not Implemented";
}
