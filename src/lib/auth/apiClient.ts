import axios, { AxiosError } from "axios";
import { AUTH_CONFIG } from "./config";
import { tokenStorage } from "./tokenStorage";

export const apiClient = axios.create({
  baseURL: AUTH_CONFIG.apiUrl,
  withCredentials: !AUTH_CONFIG.isCrossDomain,
});

apiClient.interceptors.request.use((config) => {
  if (AUTH_CONFIG.isCrossDomain) {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
