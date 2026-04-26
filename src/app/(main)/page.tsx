"use client";

import { Gauge } from "@/components/ui/gauge";
import { LinearGauge } from "@/components/ui/linear-gauge";
import { NumberGauge } from "@/components/ui/number-gauge";
import { HeadingIndicator } from "@/components/ui/heading-indicator";
import { useStore } from "@/store";
import { Map } from "@/components/map-view";
import { MotorState } from "@/components/motor-state";
import { CellBars } from "@/components/ui/cell-bars";
import { Mode, OperationMode } from "@/components/gnss-status";
import { MotorCurrentLimit } from "@/components/motor-current-limit";

export default function Home() {
  const data = useStore((s) => s.data);

  return (
    <div className="flex gap-2 justify-center items-center h-full">
      <div className="border bg-white flex flex-col gap-4 p-2">
        <div className="flex gap-4">
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
              high={250}
            />
            <Gauge
              size={150}
              label="TORQUE"
              data={data.get("motor_a.torque")}
            />
            <NumberGauge
              data={data.get("motor_a.voltage")}
              label="VOLTAGE"
              suffix="V"
              size={150}
              precision={1}
            />
           <div className="div w-full flex flex-col gap-2">
              <MotorState data={data.get("motor_a.enabled")} />
              <MotorCurrentLimit is_limited={data.get("motor_a.current_limited")} limit_reason={data.get("motor_a.current_limit_reason")} />
            </div>
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
              high={250}
            />
            <Gauge
              size={150}
              label="TORQUE"
              data={data.get("motor_b.torque")}
            />
            <NumberGauge
              size={150}
              data={data.get("motor_b.voltage")}
              precision={1}
            />
            <div className="div w-full flex flex-col gap-2">
              <MotorState data={data.get("motor_b.enabled")} />
              <MotorCurrentLimit is_limited={data.get("motor_b.current_limited")} limit_reason={data.get("motor_b.current_limit_reason")} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2 border bg-white">
        <div className="flex gap-2">
          <Gauge
            data={data.get("speed")}
            label="SPEED"
            suffix="kts"
            staleDelay={4000}
            precision={1}
          />
          <HeadingIndicator data={data.get("heading")} />
        </div>
        <div>
          <Map />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex p-2 gap-2 border bg-white items-center">
          <div className="flex items-center gap-2 w-full">
            <CellBars bars={data.get("cell.bars")?.value} />
            <p>
              {data.get("cell.network")?.value}{" "}
              {data.get("cell.technology")?.value}
            </p>

            <div className="ml-auto flex items-center gap-2">
              <Mode data={data.get("sat_mode.mode")} />
              <OperationMode data={data.get("sat_mode.op_mode")} />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex p-2 gap-2 border bg-white">
            <div className="flex flex-col gap-2">
              <Gauge
                data={data.get("bms.pack_voltage_raw")}
                label="VBAT"
                size={150}
                low={40}
                high={60}
                suffix="V"
                staleDelay={5000}
                precision={1}
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
              <Gauge
                data={data.get("")}
                label="TEMP BAT"
                size={150}
                suffix="°"
              />
            </div>

            <LinearGauge
              data={data.get("bms.soc_percent")}
              label="BAT %"
              suffix="%"
              thickness={30}
              dangerLow={20}
              precision={1}
            />

            <div className="flex flex-col gap-2">
              <Gauge
                data={data.get("booster_temp")}
                label="BOOSTER TEMP"
                suffix="°"
                size={150}
              />
              <Gauge
                data={data.get("")}
                label="BMS TEMP"
                suffix="°"
                size={150}
              />
              <Gauge
                data={data.get("")}
                label="BAT COMP TEMP"
                suffix="°"
                size={150}
              />
            </div>
          </div>
        </div>

        <div className="flex p-2 gap-2 border bg-white items-center">
          <div className="w-full">
            <LinearGauge
              label="COOLING TEMP"
              direction="horizontal"
              data={data.get("cooling_temp")}
              dangerHigh={40.0}
              low={0}
              high={100}
              suffix="°"
              precision={1}
              thickness={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
