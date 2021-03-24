import axios from "axios";
import { ApiConfig } from "@/config/api.config";

export default axios.create({
  baseURL: ApiConfig.API_URL
})
