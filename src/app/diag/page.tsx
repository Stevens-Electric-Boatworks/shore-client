"use client";

import LatencyChart from "@/components/latency-chart";
import { LogTable } from "@/components/log-table";
import { useSocketStore } from "@/store/useSocketStore";

export default function DiagPage() {
  const { ws } = useSocketStore();

  return (
    <div className="flex flex-col gap-2 h-full">
      <title>Diagnostic Information</title>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <div className="border bg-white p-2 flex-1 w-[400px]">
            <p className="font-bold uppercase">Socket Status</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>Connected?</td>
                  <td className=" text-end">
                    {ws?.readyState === 1 ? "YES" : "NO"}
                  </td>
                </tr>
                <tr>
                  <td>Socket URL</td>
                  <td className="text-end">{ws?.url}</td>
                </tr>
                <tr>
                  <td>Ready State</td>
                  <td className="text-end">{ws?.readyState}</td>
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
              </tbody>
            </table>
          </div>
          <div className="border bg-white p-2">
            <p className="font-bold uppercase">Build Information</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>Built At</td>
                  <td className="text-end">
                    {process.env.NEXT_PUBLIC_BUILD_TIME || "dev"}
                  </td>
                </tr>
                <tr>
                  <td>Commit ID</td>
                  <td className="text-end">
                    {process.env.NEXT_PUBLIC_COMMIT_SHA || "dev"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-2 border bg-white w-full">
          <LatencyChart maxDataPoints={30} showStats={true} />
        </div>
      </div>
      <div className="flex-1">
        <div className="border bg-white p-2 h-full">
          <p className="font-bold">LOGGING</p>
          <LogTable />
        </div>
      </div>
    </div>
  );
}
