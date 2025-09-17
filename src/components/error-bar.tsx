"use client";

import { usePathname } from "next/navigation";
import { useError } from "./contexts/error-provider";

export const ErrorBar = () => {
  const pathname = usePathname();
  const { errors, acknowledgeAlarm } = useError();

  // Don't show if on ALARMS page, since user will manage the alarms there
  if (pathname === "/alarms") return;

  // The error to display
  const error = errors
    .filter((e) => !e.acknowledged)
    .slice()
    .sort((a, b) => {
      // First, sort by type: ERRORs before WARNINGs
      if (a.type !== b.type) {
        return a.type === "ERROR" ? -1 : 1;
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
          error.type === "ERROR"
            ? "from-red-300 to-red-600 text-white"
            : "from-yellow-100 to-yellow-300"
        }
    `}
    >
      <p>
        {error.timestamp.toLocaleString()} :{" "}
        {error.type === "ERROR" ? "[ERR]" : "[WARN]"} {error.message}
      </p>

      <button
        onClick={() => acknowledgeAlarm(error.id)}
        className="ml-auto text-sm border px-2 cursor-pointer hover:bg-black/30"
      >
        ACKNOWLEDGE
      </button>
    </div>
  );
};
