"use client";

import { NavButton } from "@/components/ui/nav-button";
import useKeybind from "@/hooks/use-keybind";
import { useRouter } from "next/navigation";

export default function DiagnosticHomePage() {
  const router = useRouter();

  useKeybind("l", () => router.push("/diag/logs"));
  useKeybind("g", () => router.push("/diag/gnss"));
  useKeybind("s", () => router.push("/diag/socket"));
  useKeybind("m", () => router.push("/diag/motor"));
  useKeybind("a", () => router.push("/diag/alarms_history"));
  useKeybind("L", () => router.push("/diag/legacy"));

  return (
    <div className="flex flex-col h-full">
      <title>Select Diagnostic Module</title>
      <p className="text-xl font-bold mb-4">Select Diagnostic Module</p>
      <div className="grid grid-cols-3 grid-rows-5 h-full gap-2">
        <NavButton onClick={() => router.push("/diag/logs")}>LOGS</NavButton>
        <NavButton onClick={() => router.push("/diag/gnss")}>GNSS</NavButton>
        <NavButton onClick={() => router.push("/diag/socket")}>
          SOCKET
        </NavButton>
        <NavButton onClick={() => router.push("/diag/motor")}>MOTOR</NavButton>
        <NavButton onClick={() => router.push("/diag/alarm_history")}>
          ALARM HISTORY
        </NavButton>
        <NavButton onClick={() => router.push("/diag/legacy")}>
          LEGACY
        </NavButton>
      </div>
    </div>
  );
}
