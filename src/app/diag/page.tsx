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
  useKeybind("r", () => router.push("/relax"));
  useKeybind("y", () => router.push("/diag/system"));

  return (
    <div className="flex flex-col h-full">
      <title>Select Diagnostic Module</title>
      <p className="text-xl font-bold mb-4">Select Diagnostic Module</p>
      <div className="grid grid-cols-3 grid-rows-5 h-full gap-2">
        <NavButton onClick={() => router.push("/diag/logs")}>
          <u>L</u>OGS
        </NavButton>
        <NavButton onClick={() => router.push("/diag/gnss")}>
          <u>G</u>NSS
        </NavButton>
        <NavButton onClick={() => router.push("/diag/socket")}>
          <u>S</u>OCKET
        </NavButton>
        <NavButton onClick={() => router.push("/diag/motor")}>
          <u>M</u>OTOR
        </NavButton>
        <NavButton onClick={() => router.push("/diag/alarms_history")}>
          <u>A</u>LARM HISTORY
        </NavButton>
        <NavButton onClick={() => router.push("/diag/terminal")}>
          TERMINAL
        </NavButton>
        <NavButton onClick={() => router.push("/diag/system")}>
          S<u>Y</u>STEM
        </NavButton>
        <NavButton onClick={() => router.push("/relax")}>
          <u>R</u>ELAXATION VAULT
        </NavButton>
      </div>
    </div>
  );
}
