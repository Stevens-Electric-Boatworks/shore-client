import { AUTH_CONFIG } from "./config";

export const tokenStorage = {
  getAccessToken(): string | null {
    if (!AUTH_CONFIG.isCrossDomain) return null; // Rely on cookies
    if (typeof window === "undefined") return null; // We are running on server
    return localStorage.getItem(AUTH_CONFIG.accessTokenStorageKey);
  },

  setAccessToken(token: string): void {
    if (!AUTH_CONFIG.isCrossDomain) return;
    localStorage.setItem(AUTH_CONFIG.accessTokenStorageKey, token);
  },

  getRefreshToken(): string | null {
    if (!AUTH_CONFIG.isCrossDomain) return null; // Rely on cookies
    if (typeof window === "undefined") return null; // We are running on server
    return localStorage.getItem(AUTH_CONFIG.refreshTokenStorageKey);
  },

  setRefreshToken(token: string): void {
    if (!AUTH_CONFIG.isCrossDomain) return;
    localStorage.setItem(AUTH_CONFIG.refreshTokenStorageKey, token);
  },

  clear(): void {
    if (!AUTH_CONFIG.isCrossDomain) return;
    localStorage.removeItem(AUTH_CONFIG.accessTokenStorageKey);
    localStorage.removeItem(AUTH_CONFIG.refreshTokenStorageKey);
  },
};
