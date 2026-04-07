"use client";

import { Gauge } from "@/components/ui/gauge";
import { LinearGauge } from "@/components/ui/linear-gauge";
import { NumberGauge } from "@/components/ui/number-gauge";
import { HeadingIndicator } from "@/components/ui/heading-indicator";
import { useStore } from "@/store";
import { Map } from "@/components/map-view";

export default function Home() {
  const data = useStore((s) => s.data);

  return (
    <div className="flex gap-2 justify-center items-center h-full">
      <div className="border bg-white flex gap-4 p-2">
        <div className="flex flex-col items-center">
          <p className="font-bold text-2xl">A</p>
          <Gauge
            size={150}
            label="TEMP"
            data={data.get("motor_a.temp")}
            danger={80}
          />
          <Gauge
            size={150}
            label="CURRENT"
            data={data.get("motor_a.current")}
          />
          <Gauge size={150} label="TORQUE" data={data.get("motor_a.torque")} />
          <NumberGauge
            data={data.get("motor_a.voltage")}
            label="VOLTAGE"
            suffix="V"
            size={150}
          />
        </div>
        <LinearGauge
          label="THR %"
          direction="vertical"
          data={data.get("motors.throttle")}
          thickness={30}
        />
        <LinearGauge
          label="RPM"
          direction="vertical"
          thickness={30}
          dangerHigh={4000}
          high={6000}
          data={data.get("motors.rpm")}
        />
        <div className="flex flex-col items-center">
          <p className="font-bold text-2xl">B</p>
          <Gauge
            size={150}
            label="TEMP"
            data={data.get("motor_b.temp")}
            danger={80}
          />
          <Gauge
            size={150}
            label="CURRENT"
            data={data.get("motor_b.current")}
          />
          <Gauge size={150} label="TORQUE" data={data.get("motor_b.torque")} />
          <NumberGauge size={150} data={data.get("motor_b.voltage")} />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2 border bg-white">
        <div className="flex gap-2">
          <Gauge
            data={data.get("speed")}
            label="SPEED"
            suffix="kts"
            staleDelay={4000}
          />
          <HeadingIndicator data={data.get("heading")} />
        </div>
        <div>
          <Map />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex p-2 gap-2 border bg-white">
          <div className="flex flex-col gap-2">
            <Gauge
              data={data.get("bms.pack_voltage_raw")}
              label="VBAT"
              size={150}
              low={300}
              high={400}
              suffix="V"
              staleDelay={5000}
            />
            <Gauge
              data={data.get("bms.pack_current_raw")}
              label="BAT AMPS"
              size={150}
              suffix="A"
              danger={500}
              high={750}
              staleDelay={5000}
            />
            <Gauge data={data.get("")} label="TEMP BAT" size={150} suffix="°" />
          </div>

          <LinearGauge
            data={data.get("bms.soc_percent")}
            label="BAT %"
            suffix="%"
            thickness={30}
            dangerLow={20}
          />

          <div className="flex flex-col gap-2">
            <Gauge data={data.get("")} label="BMS TEMP" suffix="°" size={150} />
            <Gauge
              data={data.get("")}
              label="BAT COMP TEMP"
              suffix="°"
              size={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
