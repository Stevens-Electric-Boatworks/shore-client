"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SocketContextType = {
  socket: WebSocket | null;
  isConnecting: boolean;
  isFailed: boolean;
  sendMessage: (message: string) => void;
  latency?: { value: number; timestamp: Date };
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocket() must be used within a SocketProvider component"
    );
  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latency, setLatency] = useState<
    { value: number; timestamp: Date } | undefined
  >(undefined);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    let attempts = 0;
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connect = () => {
      console.log(process.env.NEXT_PUBLIC_SOCKET_URL);
      ws = new WebSocket(
        process.env.NEXT_PUBLIC_SOCKET_URL || "wss://eboat.thiagoja.com/api"
      );

      ws.onopen = () => {
        console.log("WebSocket connected");
        attempts = 0; // Reset attempts on successful connection

        ws!.send(
          JSON.stringify({
            type: "ident",
            message: "client",
          })
        );

        setIsConnecting(false);
        setIsFailed(false);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        if (attempts < 3) {
          setIsConnecting(true);
          setIsFailed(false);
          attempts += 1;
          reconnectTimeout = setTimeout(connect, 1000 * attempts); // Exponential backoff
        } else {
          setIsConnecting(false);
          setIsFailed(true);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        // Close socket to trigger onclose and retry logic
        ws?.close();
      };

      ws.onmessage = (event) => {
        const msg = event.data as string;
        try {
          const parsed = JSON.parse(msg);

          console.log("WebSocket message received:", msg);

          if (parsed.type === "pong" && parsed.timestamp) {
            const startTime = parseInt(parsed.timestamp);
            const delta = Date.now() - startTime;
            setLatency({
              value: delta,
              timestamp: new Date(),
            });
            return;
          }
        } catch (err) {}
      };

      setSocket(ws);
    };

    connect();

    // Cleanup on unmount
    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "ping",
            timestamp: Date.now(),
          })
        );
      }
    }, 3000); // Ping every 5 seconds

    return () => clearInterval(interval);
  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  const value: SocketContextType = {
    socket,
    isConnecting,
    isFailed,
    sendMessage,
    latency,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
