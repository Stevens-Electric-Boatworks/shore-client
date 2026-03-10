"use client";

import { useStore } from "@/store";

type Satellite = {
  prn: number;
  elev: number;
  azimuth: number;
  snr: number;
};

export const GNSSVehicles = () => {
  const data = useStore((s) => s.data);

  const getUseString = (prn: number) => {
    if (!data || !data.get("sat_mode.prn")) return "--";
    if ((data.get("sat_mode.prn")?.value as number[]).find((p) => p == prn))
      return "Y";
    return "N";
  };

  const sorted = () => {
    if (!data.get("sats")) return [];
    if (data.get("sat_mode.prn")) {
      return (data.get("sats")?.value as Satellite[]).sort((a, b) => {
        const aUsed = (data.get("sat_mode.prn")?.value as number[]).find(
          (p) => p == a.prn,
        )
          ? 1
          : 0;
        const bUsed = (data.get("sat_mode.prn")?.value as number[]).find(
          (p) => p == b.prn,
        )
          ? 1
          : 0;
        return bUsed - aUsed;
      });
    } else {
      return (data.get("sats")?.value as Satellite[]).sort(
        (a, b) => a.prn - b.prn,
      );
    }
  };

  return (
    <div className="border bg-white flex-1">
      <div className="border-b bg-linear-to-b from-zinc-100 to-zinc-300 px-2">
        <p className="font-bold">Space Vehicles</p>
      </div>
      <div className="flex flex-col">
        <table>
          <thead className="[&>tr>td]:px-2 sticky top-0 bg-gradient-to-b from-zinc-100 to-zinc-300 text-left border-b-2">
            <tr>
              <td>GNSS</td>
              <td>PRN</td>
              <td>Elev</td>
              <td>Azim</td>
              <td>SNR</td>
              <td>Use</td>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td]:px-2">
            {sorted().map((e: Satellite) => (
              <tr key={e.prn}>
                <td>GP</td>
                <td>{e.prn}</td>
                <td>{e.elev}</td>
                <td>{e.azimuth}</td>
                <td>{e.snr}</td>
                <td>{getUseString(e.prn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
