"use client";

import { usePathname } from "next/navigation";
import { useError } from "./contexts/error-provider";
import { useSocketStore } from "@/store/useSocketStore";

export const ErrorBar = () => {
  const pathname = usePathname();
  const { alarms } = useSocketStore();

  // Don't show if on ALARMS page, since user will manage the alarms there
  if (pathname === "/alarms") return;

  // The error to display
  const error = alarms
    .filter((e) => !e.acknowledged)
    .slice()
    .sort((a, b) => {
      // First, sort by type: ERRORs before WARNINGs
      if (a.type !== b.type) {
        return a.type.toUpperCase() === "ERROR" ? -1 : 1;
      }
      // Then, sort by timestamp: newest first
      return b.timestamp.getTime() - a.timestamp.getTime();
    })[0];

  // Don't show if no errors
  if (!error) return;

  return (
    <div
      className={`flex px-2 bg-gradient-to-b border-t-1 
        ${
          error.type.toUpperCase() === "ERROR"
            ? "from-red-300 to-red-600 text-white"
            : "from-yellow-100 to-yellow-300"
        }
    `}
    >
      <p>
        {error.timestamp.toLocaleString()} :{" "}
        {error.type.toUpperCase() === "ERROR" ? "[ERR]" : "[WARN]"}{" "}
        {error.message}
      </p>

      <button
        onClick={() => {
          useSocketStore.setState((state) => ({
            alarms: state.alarms.map((a) =>
              a.id === error.id ? { ...a, acknowledged: true } : a
            ),
          }));
        }}
        className="ml-auto text-sm border px-2 cursor-pointer hover:bg-black/30"
      >
        ACKNOWLEDGE
      </button>
    </div>
  );
};
