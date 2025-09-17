"use client";

import { useSocket } from "@/components/contexts/socket-provider";
import { Gauge } from "@/components/ui/gauge";
import { HeadingIndicator } from "@/components/ui/heading-indicator";
import { VerticalCenteredGauge } from "@/components/ui/vertical-centered-gauge";
import { useEffect, useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleSocketMessage = (event: MessageEvent) => {
      const data = event.data as string;
      try {
        const parsed = JSON.parse(data);

        if (parsed.type !== "data") return;
        if (!parsed.payload) return;

        setData(parsed.payload);
      } catch {}
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);

  // useEffect(() => {
  //   const set = () => {
  //     setValue((v) =>
  //       Math.round(Math.max(0, Math.min(100, v + (Math.random() * 10 - 5))))
  //     );
  //     setTimeout(set, 1000);
  //   };
  //   set();
  // }, []);

  return (
    <div>
      <title>MAIN</title>
      <div className="flex gap-2 border bg-white">
        <Gauge value={data.throttle} label="THR %" suffix="%" />
        <Gauge value={data.speed} label="SPEED" high={50} suffix=" kt" />

        <HeadingIndicator value={data.heading} />

        <VerticalCenteredGauge value={data.imu_x} high={1} low={0} />

        <div>
          <p>PITCH</p>
        </div>
      </div>
      <div className="flex gap-2 border bg-white">
        <Gauge
          value={data.bat_comp_temp}
          label="TEMP °C"
          low={0}
          danger={270}
          high={100}
          suffix="°"
        />
        <Gauge
          value={data.vbat}
          label="VOLTAGE"
          low={280}
          danger={380}
          high={400}
          suffix="V"
        />
        <Gauge
          value={data.current_bat}
          label="CURRENT"
          low={100}
          danger={270}
          high={300}
          suffix="A"
        />
      </div>
    </div>
  );
}
