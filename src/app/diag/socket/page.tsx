import { BuildInfo } from "@/components/build-info";
import LatencyChart from "@/components/latency-chart";
import { SocketStatus } from "@/components/socket-status";

export default function SocketPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 min-h-0">
        <div className="flex flex-col gap-2">
          <SocketStatus />
          <BuildInfo />
        </div>

        <div className=" p-2 border bg-white w-full">
          <LatencyChart maxDataPoints={30} showStats={true} />
        </div>
      </div>
    </div>
  );
}
