"use client";

import { cn } from "@/lib/cn";
import { useStore } from "@/store";

export const StatusBarConnectionStatus = () => {
  const { ws, latencies } = useStore();

  const isConnecting = ws?.readyState === WebSocket.CONNECTING;
  const isConnected = ws?.readyState === WebSocket.OPEN;
  const isFailed = !isConnected && !isConnecting;

  const green = "from-lime-200 to-lime-500 text-black";
  const red = "from-red-300 to-red-600 text-white border-black";
  const yellow = "from-yellow-100 to-yellow-300 text-black";

  return (
    <div
      className={cn(
        "px-2 border-x bg-linear-to-b flex gap-3 items-center",
        isConnecting && yellow,
        isConnected && green,
        isFailed && red,
      )}
    >
      <p>
        {isConnecting && "CONNECTING"}
        {isConnected && "CONNECTION OK"}
        {isFailed && "CONNECTION ERR"}
      </p>
      {isConnected && latencies && latencies[0] && (
        <p className="text-sm">{latencies[0].value + " ms"}</p>
      )}
    </div>
  );
};
