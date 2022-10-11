import axios from "axios";
import { getToken, removeToken } from "../services/sessionStorage";

export const baseURL = `http://localhost:8080/`;
const timeout = 50000;

export default function request(options) {
  const accessToken = getToken(); //function to get token

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    timeout,
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      // return Promise.reject(error.message);
      if (error.response.status === 401) {
        removeToken();
      }
      return Promise.reject(error.response.data);
    }
  );
  return axiosInstance(options);
}
