import axios, { AxiosError } from "axios";
import { AUTH_CONFIG } from "./config";
import { tokenStorage } from "./tokenStorage";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retried?: boolean;
  }
}

type QueueEntry = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let queue: QueueEntry[] = [];

function processQueue(error: unknown, token: string | null = null) {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  queue = [];
}

export const apiClient = axios.create({
  baseURL: AUTH_CONFIG.apiUrl,
  withCredentials: !AUTH_CONFIG.isCrossDomain,
});

apiClient.interceptors.request.use((config) => {
  if (AUTH_CONFIG.isCrossDomain) {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;

    if (error.response?.status !== 401 || originalRequest._retried)
      return Promise.reject(error);

    // If a refresh is already in flight, queue this request
    if (isRefreshing)
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      })
        .then((token) => {
          if (AUTH_CONFIG.isCrossDomain && token)
            originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch(Promise.reject.bind(Promise));

    // This request will drive the refresh
    originalRequest._retried = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      if (AUTH_CONFIG.isCrossDomain && newAccessToken) {
        tokenStorage.setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      processQueue(null, newAccessToken);
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      tokenStorage.clear();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

async function refreshAccessToken(): Promise<string | null> {
  const res = await axios.post(
    "/auth/refresh",
    AUTH_CONFIG.isCrossDomain
      ? { refreshToken: tokenStorage.getRefreshToken() }
      : {},
    {
      baseURL: AUTH_CONFIG.apiUrl,
      withCredentials: !AUTH_CONFIG.isCrossDomain,
    },
  );

  return res.data.accessToken ?? null;
}
