"use client";

import { useStore } from "@/store";
import { Gauge } from "./ui/gauge";

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(decimals))} ${units[i]}`;
}

interface FormattedBytes {
  value: number;
  unit: string;
}

function formatBytesObj(bytes: number, decimals = 2): FormattedBytes {
  if (bytes === 0) return { value: 0, unit: "B" };

  const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    value: parseFloat((bytes / k ** i).toFixed(decimals)),
    unit: units[i],
  };
}

export const BoatSystemInformation = () => {
  const data = useStore((s) => s.data);

  return (
    <div className="border bg-white">
      <div className="px-2 border-b flex items-center bg-gradient-to-b from-zinc-100 to-zinc-300">
        <p className="font-bold">Boat</p>
      </div>
      <div className="p-2 gap-2 flex">
        <div className="flex-1">
          <table className="w-full">
            <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold">
              <tr>
                <td>CPU Model</td>
                <td>{data.get("server.cpu.model")?.value}</td>
              </tr>
              <tr>
                <td>CPU Cores</td>
                <td>{data.get("server.cpu.cores")?.value}</td>
              </tr>
              <tr>
                <td>CPU Speed</td>
                <td>{data.get("server.cpu.speed")?.value} GHz</td>
              </tr>
              <tr>
                <td>CPU Utilization</td>
                <td>
                  {data.get("server.cpu.currentLoad")
                    ? (
                        data.get("server.cpu.currentLoad")?.value as number
                      ).toFixed(2)
                    : ""}
                  %
                </td>
              </tr>
              <tr>
                <td>Host</td>
                <td>{data.get("server.os.host")?.value}</td>
              </tr>
              <tr>
                <td>Hostname</td>
                <td>{data.get("server.os.hostname")?.value}</td>
              </tr>
              <tr>
                <td>Platform</td>
                <td>{data.get("server.os.platform")?.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1">
          <table className="w-full">
            <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold">
              <tr>
                <td>Total Memory</td>
                <td>{formatBytes(data.get("server.memory.total")?.value)}</td>
              </tr>
              <tr>
                <td>Active Memory</td>
                <td>{formatBytes(data.get("server.memory.active")?.value)}</td>
              </tr>
              <tr>
                <td>Available Memory</td>
                <td>
                  {formatBytes(
                    data.get("server.memory.total")?.value -
                      data.get("server.memory.active")?.value,
                  )}
                </td>
              </tr>
              <tr>
                <td>Memory Utilization</td>
                <td>
                  {(
                    (data.get("server.memory.active")?.value /
                      data.get("server.memory.total")?.value) *
                    100.0
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full">
            <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold">
              <tr>
                <td>Total Memory</td>
                <td>{formatBytes(data.get("server.memory.total")?.value)}</td>
              </tr>
              <tr>
                <td>Active Memory</td>
                <td>{formatBytes(data.get("server.memory.active")?.value)}</td>
              </tr>
              <tr>
                <td>Available Memory</td>
                <td>
                  {formatBytes(
                    data.get("server.memory.total")?.value -
                      data.get("server.memory.active")?.value,
                  )}
                </td>
              </tr>
              <tr>
                <td>Memory Utilization</td>
                <td>
                  {(
                    (data.get("server.memory.active")?.value /
                      data.get("server.memory.total")?.value) *
                    100.0
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Gauge
            label="CPU USE"
            size={150}
            data={data.get("server.cpu.currentLoad")}
            suffix="%"
            danger={85}
            staleDelay={2500}
          />
          <Gauge
            label="MEM USE"
            size={150}
            data={data.get("server.memory.active")}
            suffix={
              formatBytesObj(data.get("server.memory.active")?.value).unit
            }
            danger={data.get("server.memory.total")?.value * 0.85}
            high={data.get("server.memory.total")?.value}
            valueString={formatBytesObj(
              data.get("server.memory.active")?.value,
            ).value.toFixed(1)}
            staleDelay={2500}
          />
        </div>
      </div>
    </div>
  );
};
