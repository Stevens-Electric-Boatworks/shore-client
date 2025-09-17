"use client";

import "./globals.css";
import "ldrs/react/LineSpinner.css";
import { SocketProvider } from "@/components/contexts/socket-provider";
import { ErrorProvider } from "@/components/contexts/error-provider";
import { StatusBar } from "@/components/status-bar";
import { ErrorBar } from "@/components/error-bar";
import { ButtonsBar } from "@/components/buttons-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>
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
      </SocketProvider>
    </html>
  );
}
