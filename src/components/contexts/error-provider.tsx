"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket-provider";

type Error = {
  timestamp: Date;
  id: number;
  acknowledged: boolean;
  type: "ERROR" | "WARNING";
  message: string;
};

type ErrorContextType = {
  errors: Error[];
  acknowledgeAlarm: (id: number) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context)
    throw new Error(
      "useError() must be called within an ErrorProvider component."
    );
  return context;
};

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errors, setErrors] = useState<Error[]>([
    // {
    //   timestamp: new Date(Date.now()),
    //   id: Math.floor(Math.random() * 1000),
    //   acknowledged: false,
    //   type: "ERROR",
    //   message: "Battery Overcurrent Protection Circuit Tripped FAULT",
    // },
    // {
    //   timestamp: new Date(Date.now() - 545139),
    //   id: Math.floor(Math.random() * 1000),
    //   acknowledged: false,
    //   type: "ERROR",
    //   message: "Motor 1 Temperature Too High FAULT",
    // },
    // {
    //   timestamp: new Date(Date.now() - 193486),
    //   id: Math.floor(Math.random() * 1000),
    //   acknowledged: false,
    //   type: "WARNING",
    //   message: "Motor 1 Temperature Too High WARNING",
    // },
    // {
    //   timestamp: new Date(Date.now() - 4486),
    //   id: Math.floor(Math.random() * 1000),
    //   acknowledged: false,
    //   type: "WARNING",
    //   message: "Coolant Temperature At Probe [A] Too High WARNING",
    // },
    // {
    //   timestamp: new Date(Date.now() - 54513),
    //   id: Math.floor(Math.random() * 1000),
    //   acknowledged: false,
    //   type: "ERROR",
    //   message: "Motor 2 Temperature Too High FAULT",
    // },
    // {
    //   timestamp: new Date(Date.now() - 345139),
    //   id: Math.floor(Math.random() * 1000),
    //   acknowledged: false,
    //   type: "ERROR",
    //   message: "Motor Controller Temperature Too High FAULT",
    // },
  ]);

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleSocketMessage = (event: MessageEvent) => {
      const msg = event.data as string;
      try {
        const parsed = JSON.parse(msg);

        if (parsed.type === "alarm" && parsed.action) {
          if (parsed.action === "set") {
            setErrors((prevErrors) => [
              ...prevErrors,
              {
                timestamp: new Date(parsed.payload.timestamp),
                id: parsed.payload.id,
                acknowledged: false,
                message: parsed.payload.message || "",
                type: parsed.payload.type === "WARNING" ? "WARNING" : "ERROR",
              },
            ]);
          }

          if (parsed.action === "remove") {
            setErrors((prevErrors) =>
              prevErrors.filter((error) => error.id !== parsed.payload.id)
            );
          }
        }
      } catch {}
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => socket.removeEventListener("message", handleSocketMessage);
  }, [socket]);

  const acknowledgeAlarm = (id: number) => {
    if (!errors.find((v) => v.id === id)) return; // That error does not exist
    setErrors((prevErrors) =>
      prevErrors.map((error) =>
        error.id === id ? { ...error, acknowledged: true } : error
      )
    );
  };

  const value: ErrorContextType = {
    errors,
    acknowledgeAlarm,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
