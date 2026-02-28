"use client";

import { Gauge } from "@/components/ui/gauge";
import { HeadingIndicator } from "@/components/ui/heading-indicator";
import { LinearGauge } from "@/components/ui/linear-gauge";
import { useStore } from "@/store";

export default function Home() {
  const data = useStore((s) => s.data);

  return (
    <div className="flex w-full h-full items-center justify-center gap-2 p-2">
      <title>Developer Page</title>
      <div className="flex flex-col p-2 gap-2 border bg-white">
        <div className="flex gap-2">
          <Gauge data={data.get("speed")} label="SPEED" suffix="kts" />
          <HeadingIndicator data={data.get("heading")} />
        </div>
        <div>
          <LinearGauge
            data={data.get("propulsion_angle")}
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
              data={data.get("vbat")}
              label="VBAT"
              size={150}
              low={300}
              high={400}
              suffix="V"
            />
            <Gauge
              data={data.get("current_bat")}
              label="BAT AMPS"
              size={150}
              suffix="A"
            />
            <Gauge
              data={data.get("temp_bat")}
              label="TEMP BAT"
              size={150}
              suffix="°"
            />
          </div>

          <LinearGauge
            data={data.get("battery_percent")}
            label="BAT %"
            suffix="%"
            thickness={30}
            dangerLow={20}
          />

          <div className="flex flex-col gap-2">
            <Gauge
              data={data.get("bms_temp")}
              label="BMS TEMP"
              suffix="°"
              size={150}
            />
            <Gauge
              data={data.get("bat_comp_temp")}
              label="BAT COMP TEMP"
              suffix="°"
              size={150}
            />
          </div>
        </div>

        <div className="flex p-2 border bg-white gap-2 w-[170px] justify-between">
          <LinearGauge
            data={data.get("rpm_a")}
            thickness={40}
            high={4000}
            label="RPM A"
          />
          <LinearGauge
            data={data.get("motor_synch")}
            thickness={15}
            suffix="%"
          />
          <LinearGauge
            data={data.get("rpm_b")}
            thickness={40}
            high={4000}
            label="RPM B"
          />
        </div>
      </div>
    </div>
  );
}
