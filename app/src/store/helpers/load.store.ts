import { GetAllDocuments } from "@/services/api/document.service";
import { getAllCourses } from "@/services/api/course.service";

// loads store with user data
export function LoadStore() {
  GetAllDocuments();
  getAllCourses();
}
