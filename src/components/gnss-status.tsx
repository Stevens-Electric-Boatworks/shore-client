"use client";

import { DataValue } from "@/slices/dataSlice";
import { useStore } from "@/store";

const OperationMode = ({ data }: { data?: DataValue }) => {
  if (data) {
    if (data.value === "A")
      return (
        <span className="text-sm border px-3 bg-linear-to-b from-lime-200 to-lime-400">
          AUTO
        </span>
      );
    if (data.value === "M")
      return (
        <span className="text-sm border px-3 bg-linear-to-b from-yellow-100 to-yellow-300">
          MANUAL
        </span>
      );
  }

  return (
    <span className="text-sm border px-3 bg-linear-to-b from-zinc-100 to-zinc-300">
      ???
    </span>
  );
};

const Mode = ({ data }: { data?: DataValue }) => {
  if (data) {
    if (data.value === 1)
      return (
        <span className="text-sm border px-3 bg-linear-to-b from-red-300 to-red-600 text-white border-black">
          NO FIX
        </span>
      );
    if (data.value === 2)
      return (
        <span className="text-sm border px-3 bg-linear-to-b from-blue-200 to-blue-400">
          2D FIX
        </span>
      );
    if (data.value === 3)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-lime-200 to-lime-400">
          3D FIX
        </span>
      );
  }
  return (
    <span className="text-sm border px-3 bg-linear-to-b from-zinc-100 to-zinc-300">
      ???
    </span>
  );
};

const LateralAccruacyRating = ({ data }: { data?: DataValue }) => {
  if (data) {
    if (data.value < 1)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-lime-200 to-lime-400">
          EXCELLENT
        </span>
      );

    if (data.value < 2)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-lime-200 to-lime-400">
          GOOD
        </span>
      );

    if (data.value < 5)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-yellow-100 to-yellow-300">
          OK
        </span>
      );

    if (data.value < 10)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-yellow-100 to-yellow-300">
          MODERATE
        </span>
      );

    if (data.value < 20)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-red-300 to-red-600 text-white border-black">
          POOR
        </span>
      );
    if (data.value === 2)
      return (
        <span className="text-sm border px-3 bg-linear-to-b from-blue-200 to-blue-400">
          2D FIX
        </span>
      );
    if (data.value === 3)
      return (
        <span className="text-sm border px-3 bg-linear-to-b  from-lime-200 to-lime-400">
          3D FIX
        </span>
      );
  }
  return (
    <span className="text-sm border px-3 bg-linear-to-b from-zinc-100 to-zinc-300">
      ???
    </span>
  );
};

export const GNSSStatus = () => {
  const data = useStore((s) => s.data);

  return (
    <div className="border bg-white flex-1">
      <div className="border-b bg-linear-to-b from-zinc-100 to-zinc-300 px-2">
        <p className="font-bold">Status</p>
      </div>
      <div className="flex flex-col">
        <table>
          <colgroup>
            <col span={1} width={240} />
          </colgroup>
          <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold [&>tr>td]:px-2">
            <tr>
              <td>Time</td>
              <td>{data.get("boat_time")?.value}</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>{data.get("lat")?.value}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{data.get("long")?.value}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{data.get("speed")?.value}</td>
            </tr>
            <tr>
              <td>Track</td>
              <td>{data.get("heading")?.value}</td>
            </tr>
            <tr>
              <td>Horizontal Precision</td>
              <td>{data.get("sat_mode.hdop")?.value}</td>
            </tr>
            <tr>
              <td>Vertical Precision</td>
              <td>{data.get("sat_mode.vdop")?.value}</td>
            </tr>
            <tr>
              <td>Position Precision</td>
              <td>{data.get("sat_mode.pdop")?.value}</td>
            </tr>
            <tr>
              <td>Lateral Accuracy Rating</td>
              <td>
                <LateralAccruacyRating data={data.get("sat_mode.hdop")} />
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <Mode data={data.get("sat_mode.mode")} />
              </td>
            </tr>
            <tr>
              <td>Operation Mode</td>
              <td>
                <OperationMode data={data.get("sat_mode.op_mode")} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
