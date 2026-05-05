"use client";

import { apiClient } from "@/lib/auth/apiClient";
import { tokenStorage } from "@/lib/auth/tokenStorage";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import loginFn from "@/lib/auth/login";
import logoutFn from "@/lib/auth/logout";
import resetPasswordFn from "@/lib/auth/resetPassword";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // On mount, check if we have a valid session
    const isLikelyAuthenticated = AUTH_CONFIG.isCrossDomain
      ? Boolean(tokenStorage.getRefreshToken())
      : true; // Cookie presence can't be checked from JS — always try

    if (!isLikelyAuthenticated) {
      setIsLoading(false);
      return;
    }

    apiClient
      .get("/auth/me")
      .then((s) => {
        const user = s.data.user as User;
        setUser(user);
      })
      .catch(() => {
        tokenStorage.clear();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const user = await loginFn(username, password);
    setUser(user);
    if (user.needsPasswordReset) router.replace("/reset-password");
    else router.replace("/");
  };

  const logout = async () => {
    await logoutFn();
    setUser(null);
  };

  const resetPassword = async (newPassword: string) => {
    const user = await resetPasswordFn(newPassword);
    setUser(user);
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        resetPassword,
      }}
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
