"use client";

import { apiClient } from "@/lib/auth/apiClient";
import { tokenStorage } from "@/lib/auth/tokenStorage";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import loginFn from "@/lib/auth/login";
import logoutFn from "@/lib/auth/logout";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { setLazyProp } from "next/dist/server/api-utils";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On mount, check if we have a valid session
    const isLikelyAuthenticated = AUTH_CONFIG.isCrossDomain
      ? Boolean(tokenStorage.get())
      : true; // Cookie presence can't be checked from JS — always try

    if (!isLikelyAuthenticated) {
      setIsLoading(false);
      return;
    }

    apiClient
      .get("/auth/me")
      .then((s) => {
        setUser(s.data.user as User);
      })
      .catch(() => {
        tokenStorage.clear();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginFn(username, password);
    setUser(data.user);
  };

  const logout = async () => {
    await logoutFn();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: Boolean(user), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() must be used inside <AuthProvider>");
  return ctx;
};
