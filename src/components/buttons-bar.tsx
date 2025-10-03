"use client";

import { useRouter } from "next/navigation";
import { NavButton } from "./ui/nav-button";
import { useError } from "./contexts/error-provider";
import { useSocketStore } from "@/store/useSocketStore";

export const ButtonsBar = () => {
  const router = useRouter();
  const { alarms } = useSocketStore();

  return (
    <div className="flex gap-2 p-2 bg-gradient-to-b from-zinc-100 to-zinc-300 border-t relative items-center">
      <NavButton onClick={() => router.push("/")}>MAIN</NavButton>
      <button
        onClick={() => router.push("/alarms")}
        className={`p-2 border-2 cursor-pointer
        ${
          alarms.filter(
            (e) => e.type.toUpperCase() === "ERROR" && !e.acknowledged
          ).length >= 1
            ? "bg-red-500 text-white font-bold border-t-red-400 border-l-red-400 border-b-red-700 border-r-red-700 hover:bg-red-700 blink-slow"
            : "bg-blue-600 text-white font-bold border-t-blue-400 border-l-blue-400 border-b-blue-700 border-r-blue-700 hover:bg-blue-700"
        }
        `}
      >
        ACTIVE ALARMS
      </button>
      <NavButton onClick={() => router.push("/alarms_history")}>
        ALARM HISTORY
      </NavButton>
      <NavButton onClick={() => router.push("/diag")}>DIAGNOSTIC</NavButton>
      <div className="ml-auto flex gap-2">
        <NavButton>SETTINGS</NavButton>
        <NavButton>HELP</NavButton>
      </div>
    </div>
  );
};
