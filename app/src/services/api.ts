import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiConfig } from "@/config/api.config";
import router from "@/router";
// import { IsAuthenticated } from "@/services/api/auth.service";

// Singleton pattern
const axiosInstance = axios.create({
  baseURL: ApiConfig.API_URL
});

// adds token to any request if it exists
// safe guard against actions that the vue-router doesn't catch, with beforeEach hook
axiosInstance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    if (
      !(router.currentRoute.value.name === "Login") &&
      !(router.currentRoute.value.name === "Welcome") &&
      !(router.currentRoute.value.name === "Register")
    ) {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers.token = token;
        return Promise.resolve(request);
      }
      return Promise.reject(request);
    }
    return Promise.resolve(request);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios response interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (error.response && error.response.status) {
      console.log(error.response.status);
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
