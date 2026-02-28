"use client";

import { usePathname } from "next/navigation";
import { useStore } from "@/store";

export const ErrorBar = () => {
  const pathname = usePathname();
  const alarms = useStore((s) => s.alarms);
  const acknowledge = useStore((s) => s.acknowledgeAlarm);

  // Don't show if on ALARMS page, since user will manage the alarms there
  if (pathname === "/alarms") return;

  // The error to display
  const error = alarms
    .filter((e) => !e.acknowledgedAt)
    .slice()
    .sort((a, b) => {
      // First, sort by type: ERRORs before WARNINGs
      if (a.type !== b.type) {
        return a.type.toUpperCase() === "ERROR" ? -1 : 1;
      }
      // Then, sort by timestamp: newest first
      return b.raisedAt.getTime() - a.raisedAt.getTime();
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
        {error.raisedAt.toLocaleString()} :{" "}
        {error.type.toUpperCase() === "ERROR" ? "[ERR]" : "[WARN]"}{" "}
        {error.message}
      </p>

      <button
        onClick={() => acknowledge(error.id)}
        className="ml-auto text-sm border px-2 cursor-pointer hover:bg-black/30"
      >
        ACKNOWLEDGE
      </button>
    </div>
  );
};
