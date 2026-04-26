export const AUTH_CONFIG = {
  isCrossDomain: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.includes("localhost")
    : false,
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001",
  accessTokenStorageKey: "access_token",
  refreshTokenStorageKey: "refresh_token",
} as const;
