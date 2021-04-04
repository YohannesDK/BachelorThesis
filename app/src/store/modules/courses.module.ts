import { courseType } from "../interfaces/course";

export default {
  state: {
    courses: [
      {
        courseId: 0,
        courseName: "Web Programming",
        courseShorthand: "DAT310",
        Teacher: 0,
        documents: [0]
      },
      {
        courseId: 1,
        courseName: "Operating Systems",
        courseShorthand: "DAT320",
        documents: [1]
      },
      {
        courseId: 2,
        courseName: "Fysikk",
        courseShorthand: "RED102",
        Teacher: 0,
        documents: [1]
      },
      {
        courseId: 3,
        courseName: "Kjemi",
        courseShorthand: "RED101",
        Teacher: 0,
        documents: [1]
      },
      {
        courseId: 4,
        courseName: "Grunnleggende Programmering",
        courseShorthand: "DAT110",
        Teacher: 0,
        documents: [1]
      }
    ] as courseType[]
  },
  mutations: {},
  actions: {},
  getters: {
    getCourses: (state: any) => {
      return state.courses;
    },
    getCoursebyId: (state: any) => (CourseId: number) => {
      return state.courses.find(
        (course: courseType) => course.courseId === CourseId
      );
    }
  }
};
