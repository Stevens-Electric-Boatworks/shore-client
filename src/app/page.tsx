"use client";

import { useSocket } from "@/components/contexts/socket-provider";
import { Gauge } from "@/components/ui/gauge";
import { HeadingIndicator } from "@/components/ui/heading-indicator";
import { LinearGauge } from "@/components/ui/linear-gauge";
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

  return (
    <div className="flex w-full h-full items-center justify-center gap-2 p-2">
      <title>MAIN</title>
      <div className="flex flex-col p-2 gap-2 border bg-white">
        <div className="flex gap-2">
          <Gauge value={data.speed} label="SPEED" suffix="kts" />
          <HeadingIndicator value={data.heading} />
        </div>
        <div>
          <LinearGauge
            value={data.propulsion_angle}
            centered
            low={-45}
            dangerLow={-35}
            high={45}
            dangerHigh={35}
            direction="horizontal"
            label="PROP ANGLE"
            suffix="°"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex p-2 gap-2 border bg-white">
          <div className="flex flex-col gap-2">
            <Gauge
              value={data.vbat}
              label="VBAT"
              size={150}
              low={300}
              high={400}
              suffix="V"
            />
            <Gauge
              value={data.current_bat}
              label="BAT AMPS "
              size={150}
              suffix="A"
            />
            <Gauge
              value={data.temp_bat}
              label="TEMP BAT"
              size={150}
              suffix="°"
            />
          </div>

          <LinearGauge
            value={data.battery_percent}
            label="BAT %"
            suffix="%"
            thickness={30}
            dangerLow={20}
          />

          <div className="flex flex-col gap-2">
            <Gauge
              value={data.bms_temp}
              label="BMS TEMP"
              suffix="°"
              size={150}
            />
            <Gauge
              value={data.bat_comp_temp}
              label="BAT COMP TEMP"
              suffix="°"
              size={150}
            />
          </div>
        </div>

        <div className="flex p-2 border bg-white gap-2 w-[170px] justify-between ">
          <LinearGauge
            value={data.rpm_a}
            thickness={40}
            high={4000}
            label="RPM A"
          />
          <LinearGauge value={data.motor_synch} thickness={15} suffix="%" />
          <LinearGauge
            value={data.rpm_b}
            thickness={40}
            high={4000}
            label="RPM B"
          />
        </div>
      </div>
    </div>
  );
}
