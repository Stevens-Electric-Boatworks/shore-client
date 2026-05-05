"use client";

import "ldrs/react/LineSpinner.css";
import { StatusBar } from "@/components/status-bar";
import { ErrorBar } from "@/components/error-bar";
import { ButtonsBar } from "@/components/buttons-bar";

import { useSettingsStore } from "@/settings-store";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { ModalProvider } from "@/components/contexts/modal-provider";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LineSpinner } from "ldrs/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [showSlowConnectionMessage, setShowSlowConnectionMessage] =
    useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const { connect, disconnect, ws } = useStore();
  const { loadSettings, loaded } = useSettingsStore();
  const socketUrl = useSettingsStore((s) => s.settings.get("ws.url") as string);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (!loaded) return;
    if (ws) return;

    useStore.setState({ url: socketUrl });
    connect();

    return () => disconnect();
  }, [socketUrl, loaded]);

  useEffect(() => {
    if (!isLoading) {
      setShowSlowConnectionMessage(false);
      return;
    }

    const handle = setTimeout(() => {
      setShowSlowConnectionMessage(true);
    }, 2500);
    return () => clearTimeout(handle);
  }, [isLoading]);

  if (isLoading)
    return (
      <div className="flex flex-col h-screen w-screen">
        <div className="absolute h-full w-full -z-50 pinstripe" />
        <div className="flex flex-col items-center justify-center flex-1 p-2 min-h-0">
          <div className="space-y-2 border-2 border-b-zinc-300 border-r-zinc-300 border-t-zinc-100 border-l-zinc-100 bg-white p-2 max-w-[400px]">
            <div className="flex gap-4 items-center">
              <LineSpinner size={32} stroke={2} />
              <p className="font-bold">Loading...</p>
            </div>
            {showSlowConnectionMessage && (
              <div>
                <p className="text-sm">
                  This is taking longer than usual. Please check your Internet
                  connection, and if issues persist, contact the system
                  administrator.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-screen">
      <ModalProvider />
      <StatusBar />
      <div className="absolute h-full w-full -z-50 pinstripe" />
      <div className="flex flex-col flex-1 p-2 min-h-0">{children}</div>
      <ErrorBar />
      <ButtonsBar />
    </div>
  );
}
