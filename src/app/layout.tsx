"use client";

import "./globals.css";
import "ldrs/react/LineSpinner.css";
import {
  SocketProvider,
  useSocket,
} from "@/components/contexts/socket-provider";
import { ErrorProvider } from "@/components/contexts/error-provider";
import { StatusBar } from "@/components/status-bar";
import { ErrorBar } from "@/components/error-bar";
import { ButtonsBar } from "@/components/buttons-bar";
import { useEffect } from "react";
import { useSocketStore } from "@/store/useSocketStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <html lang="en">
      <ErrorProvider>
        <body className={`antialiased`}>
          <div className="flex flex-col h-screen w-screen">
            <StatusBar />
            <div className="absolute h-full w-full -z-50 pinstripe" />
            <div className="flex flex-col flex-1 p-2">{children}</div>
            <ErrorBar />
            <ButtonsBar />
          </div>
        </body>
      </ErrorProvider>
    </html>
  );
}
