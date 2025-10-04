"use client";

import { BuildInfo } from "@/components/build-info";
import LatencyChart from "@/components/latency-chart";
import { LogTable } from "@/components/log-table";
import { SocketStatus } from "@/components/socket-status";

export default function DiagPage() {
  return (
    <div className="flex flex-col gap-2 h-full min-h-0">
      <title>Diagnostic Information</title>
      <div className="flex gap-2 min-h-0">
        <div className="flex flex-col gap-2">
          <SocketStatus />
          <BuildInfo />
        </div>

        <div className=" p-2 border bg-white w-full">
          <LatencyChart maxDataPoints={30} showStats={true} />
        </div>
      </div>
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col border bg-white p-2 ">
          <p className="font-bold">LOGGING</p>
          <LogTable />
        </div>
      </div>
    </div>
  );
}
