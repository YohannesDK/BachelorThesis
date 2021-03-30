import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiConfig } from "@/config/api.config";
import router from "@/router";
// import { IsAuthenticated } from "@/services/api/auth.service";

// Singleton pattern
const axiosInstance = axios.create({
  baseURL: ApiConfig.API_URL,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
});

// axiosInstance.interceptors.request.use(
//   (request: any ) => {
//     const auth = IsAuthenticated();
//     if (auth) {
//       return request
//     }
//   }
// )

// axios response interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        // 401 from server, remove jwt and logout
        localStorage.removeItem("token");
        router.push({ name: "Login" });
      } else if (error.response.status === 404) {
        router.push({ name: "PageNotFound" });
      }
      return Promise.reject(error.response.status);
    }
  }
);

export default axiosInstance;
