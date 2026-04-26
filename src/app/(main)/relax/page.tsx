"use client";

import { LineSpinner } from "ldrs/react";
import dynamic from "next/dynamic";

const DosPlayer = dynamic(() => import("@/components/dos-player"), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex flex-col items-center bg-black/20 border p-4">
        <LineSpinner size={28} stroke={2} />
        <p>Loading emulator...</p>
      </div>
    );
  },
});

export default function DoomPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <title>Relaxation Vault</title>

      <p className="font-bold text-2xl">Relaxation Vault</p>
      <div className="flex w-full h-full items-center justify-center">
        <DosPlayer />
      </div>
    </div>
  );
}
