"use client";

import { cn } from "@/lib/cn";
import { DataValue } from "@/slices/dataSlice";

interface Props {
  is_limited?: DataValue;
  limit_reason?: DataValue;
}

export const MotorCurrentLimit = ({ is_limited: is_limited, limit_reason: limit_reason }: Props) => {
  const text = (() => {
    if (!is_limited) return "UNAVAIL";

    if (is_limited.value as boolean) {
      const reason = limit_reason?.value;
      return reason !== undefined
        ? `CURR LIMIT: ${reason}`
        : "CURR LIMIT";
    }

    return "NO CURR. LIMIT";
  })();

  return (
    <div
      className={cn(
        "border px-2 text-sm bg-linear-to-b w-full text-center",
        text === "UNAVAIL" && "from-gray-200 to-gray-300 text-black",
        text === "NO CURR. LIMIT" && "from-lime-200 to-lime-500 text-black",
        text.startsWith("CURR LIMIT") &&
        "from-red-300 to-red-600 text-white border-black"
      )}
    >
      {text}
    </div>
  );
};
