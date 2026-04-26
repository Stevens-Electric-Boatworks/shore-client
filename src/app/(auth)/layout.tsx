"use client";

import { useAuth } from "@/components/contexts/AuthContext";
import "ldrs/react/LineSpinner.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(!isLoading);
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="absolute h-full w-full -z-50 pinstripe" />
      <div className="flex flex-col flex-1 p-2 min-h-0">{children}</div>
    </div>
  );
}
