"use client";

import { useSocket } from "@/components/contexts/socket-provider";
import LatencyChart from "@/components/latency-chart";

export default function DiagPage() {
  const { socket, isConnecting, isFailed } = useSocket();

  return (
    <div className="flex gap-2">
      <div className="border bg-white p-2">
        <p className="font-bold uppercase">Socket Status</p>
        <table className="w-[300px]">
          <tbody>
            <tr>
              <td>Connected?</td>
              <td className=" text-end">
                {socket?.readyState === 1 ? "YES" : "NO"}
              </td>
            </tr>
            <tr>
              <td>Socket URL</td>
              <td className="text-end">{socket?.url}</td>
            </tr>
            <tr>
              <td>Ready State</td>
              <td className="text-end">{socket?.readyState}</td>
            </tr>
            <tr>
              <td>Is Connecting?</td>
              <td className="text-end">{isConnecting ? "YES" : "NO"}</td>
            </tr>
            <tr>
              <td>Is Failed?</td>
              <td className="text-end">{isFailed ? "YES" : "NO"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-2 border bg-white w-[1000px]">
        <LatencyChart maxDataPoints={30} showStats={true} height={400} />
      </div>
    </div>
  );
}
