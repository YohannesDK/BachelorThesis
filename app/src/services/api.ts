import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiConfig } from "@/config/api.config";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: ApiConfig.API_URL,
  headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
})


// axios interceptors
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error: AxiosError) => {
  if (error.response && error.response.status) {
    if (error.response.status === 401) {
      // 401 from server, remove jwt and logout
      localStorage.removeItem('token');
      router.push({name: "Login"})
      return;

    } else if (error.response.status === 404) {
      router.push({name: "PageNotFound"})
    }
      else {
      return Promise.reject(error.response);
    }
  }
});

export default axiosInstance;
