"use client";

import { Gauge } from "@/components/ui/gauge";
import { HeadingIndicator } from "@/components/ui/heading-indicator";
import { LinearGauge } from "@/components/ui/linear-gauge";
import { useSocketStore } from "@/store/useSocketStore";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const { data } = useSocketStore();

  // useEffect(() => {
  //   if (!socket) return;

  //   const handleSocketMessage = (event: MessageEvent) => {
  //     const data = event.data as string;
  //     try {
  //       const parsed = JSON.parse(data);

  //       if (parsed.type !== "data") return;
  //       if (!parsed.payload) return;

  //       setData(parsed.payload);
  //     } catch {}
  //   };

  //   socket.addEventListener("message", handleSocketMessage);

  //   return () => {
  //     socket.removeEventListener("message", handleSocketMessage);
  //   };
  // }, [socket]);

  return (
    <div className="flex w-full h-full items-center justify-center gap-2 p-2">
      <title>MAIN</title>
      <div className="flex flex-col p-2 gap-2 border bg-white">
        <div className="flex gap-2">
          <Gauge data={data.get("voltage")} label="VOLTAGE" suffix="V" />
          <Gauge data={data.get("throttle_mv")} label="THR MV" suffix="mV" />
          <Gauge data={data.get("torque")} label="TORQUE" suffix="" />
        </div>
        <div className="flex gap-2">
          <Gauge data={data.get("torque")} label="MOTOR TEMP" suffix="°" />
          <Gauge data={data.get("current")} label="CURRENT" suffix="A" />
          <Gauge data={data.get("power")} label="POWER" suffix="W" />
        </div>
        <div>
          <LinearGauge
            data={data.get("rpm")}
            direction="horizontal"
            low={-4400}
            high={4400}
            centered
            label="RPM"
          />
        </div>
      </div>
    </div>
  );
}
