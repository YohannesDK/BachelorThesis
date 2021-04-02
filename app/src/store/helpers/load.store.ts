import { GetAllDocuments } from "@/services/api/document.service";

// loads store with user data
export function LoadStore() {
  GetAllDocuments();
}
