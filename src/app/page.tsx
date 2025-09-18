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
    <div className="flex gap-2 p-2">
      <title>MAIN</title>
      <div className="flex px-2 gap-2 border bg-white">
        <Gauge value={data.speed} label="SPEED" suffix="kts" />
        <HeadingIndicator value={data.heading} />
      </div>
      <div className="flex flex-col px-2 gap-2 border bg-white">
        <Gauge value={data.vbat} label="VBAT" size={100} />
        <Gauge value={data.current_bat} label="BAT AMPS " size={100} />
        <Gauge value={data.temp_bat} label="TEMP BAT" size={100} />
      </div>
    </div>
  );
}
