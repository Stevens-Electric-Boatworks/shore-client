"use client";

import { useSocketStore } from "@/store/useSocketStore";

export const SocketStatus = () => {
  const { ws, latencies } = useSocketStore();

  return (
    <div className="border bg-white p-2 flex-1 w-[400px]">
      <p className="font-bold uppercase">Socket Status</p>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Connected?</td>
            <td className=" text-end">{ws?.readyState === 1 ? "YES" : "NO"}</td>
          </tr>
          <tr>
            <td>Socket URL</td>
            <td className="text-end">{ws?.url}</td>
          </tr>
          <tr>
            <td>Ready State</td>
            <td className="text-end font-mono">{ws?.readyState}</td>
          </tr>
          <tr>
            <td>Is Connecting?</td>
            <td className="text-end">
              {ws?.readyState === WebSocket.CONNECTING ? "YES" : "NO"}
            </td>
          </tr>
          <tr>
            <td>Is Closed?</td>
            <td className="text-end">
              {ws?.readyState === WebSocket.CLOSED ? "YES" : "NO"}
            </td>
          </tr>
          <tr>
            <td>Last Ping</td>
            <td className="text-end">
              {latencies[0]?.timestamp.toLocaleTimeString() ?? "---"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
