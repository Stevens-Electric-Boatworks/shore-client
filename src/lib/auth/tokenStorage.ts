import { AUTH_CONFIG } from "./config";

export const tokenStorage = {
  get(): string | null {
    if (!AUTH_CONFIG.isCrossDomain) return null; // Rely on cookies
    if (typeof window === "undefined") return null; // We are running on server
    return localStorage.getItem(AUTH_CONFIG.tokenStorageKey);
  },

  set(token: string): void {
    if (!AUTH_CONFIG.isCrossDomain) return;
    localStorage.setItem(AUTH_CONFIG.tokenStorageKey, token);
  },

  clear(): void {
    if (!AUTH_CONFIG.isCrossDomain) return;
    localStorage.removeItem(AUTH_CONFIG.tokenStorageKey);
  },
};
