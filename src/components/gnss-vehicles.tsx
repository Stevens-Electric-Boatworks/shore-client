"use client";

import { useStore } from "@/store";

export const GNSSVehicles = () => {
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
          <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td]:px-2"></tbody>
        </table>
      </div>
    </div>
  );
};
