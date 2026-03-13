"use client";

import { DataValue } from "@/slices/dataSlice";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { CellBars } from "./ui/cell-bars";

const regStatusString: Record<number, string> = {
  0: "Not Searching",
  1: "Registered",
  2: "Searching...",
  3: "Registration Denied",
  4: "Unknown",
  5: "Roaming",
  8: "SOS Only",
};

const RegistrationStatus = ({ data }: { data?: DataValue }) => {
  if (data) {
    if ([1, 5].includes(data.value))
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-lime-200 to-lime-400">
          {regStatusString[data.value].toUpperCase()} ({data.value})
        </span>
      );

    if ([2].includes(data.value))
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-yellow-100 to-yellow-300">
          {regStatusString[data.value].toUpperCase()} ({data.value})
        </span>
      );

    if ([0, 3, 4].includes(data.value))
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-red-300 to-red-600 text-white border-black">
          {regStatusString[data.value].toUpperCase()} ({data.value})
        </span>
      );
    if ([8].includes(data.value))
      return (
        <span className="text-sm border px-3 bg-linear-to-b from-blue-200 to-blue-400">
          {regStatusString[data.value].toUpperCase()} ({data.value})
        </span>
      );
  }
  return (
    <span className="text-sm border px-3 bg-linear-to-b from-zinc-100 to-zinc-300">
      ---
    </span>
  );
};

const PinStatus = ({ data }: { data?: DataValue }) => {
  if (data) {
    if (data.value == "READY")
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-lime-200 to-lime-400">
          {data.value}
        </span>
      );
    else
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-red-300 to-red-600 text-white border-black">
          {data.value}
        </span>
      );
  }
  return (
    <span className="text-sm border px-3 bg-linear-to-b from-zinc-100 to-zinc-300">
      ---
    </span>
  );
};

export const CellStatus = () => {
  const data = useStore((s) => s.data);

  const [isStale, setIsStale] = useState(true);

  useEffect(() => {
    const bars = data.get("cell.bars");

    if (!bars) {
      setIsStale(true);
      return;
    }

    setIsStale(false);

    const timeSinceUpdate = Date.now() - new Date(bars.timestamp).getTime();
    const timeUntilStale = 10000 - timeSinceUpdate;

    if (timeUntilStale <= 0) {
      setIsStale(true);
      return;
    }

    const timeout = setTimeout(() => setIsStale(true), timeUntilStale);
    return () => clearTimeout(timeout);
  }, [data]);

  const getPrecisionDisplayString = (data?: DataValue) => {
    if (!data) return "---";
    if (data.value < 0) return "---";
    return (data.value as number).toFixed(1);
  };

  return (
    <div className="border bg-white flex-1">
      <div className="border-b bg-linear-to-b from-zinc-100 to-zinc-300 px-2 flex">
        <p className="font-bold">Cellular Connection</p>
        {isStale && (
          <div className="ml-auto text-sm border-x px-2 font-bold bg-linear-to-b from-red-300 to-red-600 text-white border-black flex items-center">
            STALE DATA
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <table>
          <colgroup>
            <col span={1} width={240} />
          </colgroup>
          <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold [&>tr>td]:px-2">
            <tr>
              <td>Registration Status</td>
              <td>
                <RegistrationStatus data={data.get("cell.reg_status")} />
              </td>
            </tr>
            <tr>
              <td>Network</td>
              <td>{data.get("cell.network")?.value}</td>
            </tr>
            <tr>
              <td>Technology</td>
              <td>{data.get("cell.technology")?.value}</td>
            </tr>
            <tr>
              <td>Signal Quality</td>
              <td>
                <div className="flex">
                  <CellBars bars={data.get("cell.bars")?.value} />
                </div>
              </td>
            </tr>
            <tr>
              <td>RSRP</td>
              <td>{data.get("cell.rsrp")?.value}</td>
            </tr>
            <tr>
              <td>RSRQ</td>
              <td>{data.get("cell.rsrq")?.value}</td>
            </tr>
            <tr>
              <td>IP Address</td>
              <td>{data.get("cell.ip_addr")?.value}</td>
            </tr>
            <tr>
              <td>APN</td>
              <td>{data.get("cell.apn")?.value}</td>
            </tr>
            <tr>
              <td>Authentication Status</td>
              <td>
                <PinStatus data={data.get("cell.pin_status")} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
