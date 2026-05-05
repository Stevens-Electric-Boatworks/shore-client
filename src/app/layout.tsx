"use client";

import { AuthProvider } from "@/components/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`antialiased`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
