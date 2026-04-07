"use client";

import { cn } from "@/lib/cn";
import { DataValue } from "@/slices/dataSlice";

interface Props {
  data?: DataValue;
}

export const MotorState = ({ data }: Props) => {
  const getText = () => {
    if (!data) return "UNAVAIL";
    if (data.value as boolean) return "ENABLED";
    else return "DISABLED";
  };

  return (
    <div
      className={cn(
        "border px-2 text-sm bg-linear-to-b w-full text-center",
        getText() == "UNAVAIL" && " from-gray-200 to-gray-300 text-black",
        getText() == "ENABLED" && "from-lime-200 to-lime-500 text-black",
        getText() == "DISABLED" &&
          "from-red-300 to-red-600 text-white border-black",
      )}
    >
      {getText()}
    </div>
  );
};
