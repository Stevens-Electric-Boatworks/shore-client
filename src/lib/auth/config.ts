export const AUTH_CONFIG = {
  isCrossDomain: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.includes("localhost")
    : false,
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  tokenStorageKey: "access_token",
} as const;
