"use client";

import { useState } from "react";
import { useError } from "./contexts/error-provider";
import { NavButton } from "./ui/nav-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSocketStore } from "@/store/useSocketStore";

export const AlarmsTable = () => {
  const [selected, setSelected] = useState(0);

  const { alarms } = useSocketStore();

  const sorted = alarms.slice().sort((a, b) => {
    // First, sort by type: ERRORs before WARNINGs
    if (a.type !== b.type) {
      return a.type.toUpperCase() === "ERROR" ? -1 : 1;
    }
    // Then, sort by timestamp: newest first
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex flex-col flex-1 bg-white border">
        <table className="w-full">
          <colgroup>
            <col span={1} className="w-[180px]" />
            <col span={1} className="w-[80px]" />
            <col span={1} className="w-[70px]" />
          </colgroup>
          <thead className="text-left border-b bg-gradient-to-b from-zinc-100 to-zinc-300">
            <tr>
              <td>Timestamp</td>
              <td>Category</td>
              <td>Alarm ID</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e, idx) => (
              <tr
                key={idx}
                className={
                  idx === selected
                    ? "bg-blue-600 text-white cursor-pointer"
                    : "hover:bg-blue-200 cursor-pointer"
                }
                onClick={() => setSelected(idx)}
              >
                <td>{e.timestamp.toLocaleString()}</td>
                <td>
                  {e.type.toUpperCase() === "ERROR" && (
                    <div
                      className={`text-sm text-center bg-red-500 px-2 mx-2 text-white border border-red-800 ${
                        e.acknowledged ? "" : "blink-slow"
                      }`}
                    >
                      ERR
                    </div>
                  )}
                  {e.type.toUpperCase() === "WARNING" && (
                    <div
                      className={`text-sm text-center bg-yellow-500 px-2 mx-2 text-white border border-red-800 ${
                        e.acknowledged ? "" : "blink-slow"
                      }`}
                    >
                      WARN
                    </div>
                  )}
                </td>
                <td>{e.id}</td>
                <td>{e.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length <= 0 && (
          <div className="bg-gradient-to-b from-lime-200 to-lime-500 px-2 border-t mt-auto">
            No active alarms. Enjoy this moment! ☺️
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <NavButton
          onClick={() => {
            if (selected > 0) setSelected((s) => s - 1);
          }}
        >
          <ChevronUp />
        </NavButton>
        <NavButton
          onClick={() => {
            if (selected < alarms.length - 1) setSelected((s) => s + 1);
          }}
        >
          <ChevronDown />
        </NavButton>
        <button
          onClick={() => {
            const selectedId = sorted[selected]?.id;
            if (!selectedId) return;
            useSocketStore.setState((state) => ({
              alarms: state.alarms.map((a) =>
                a.id === selectedId ? { ...a, acknowledged: true } : a
              ),
            }));
          }}
          className="p-2 min-w-[180px] border-2 
            cursor-pointer flex justify-center bg-orange-400 text-white font-bold 
            border-t-orange-300 border-l-orange-300 border-b-orange-500 
            border-r-orange-500 hover:bg-orange-500 disabled:hover:bg-orange-400 disabled:hover:cursor-auto"
          disabled={sorted[selected]?.acknowledged || sorted.length < 1}
        >
          {sorted[selected]?.acknowledged || sorted.length < 1
            ? "ACKNOWLEDGED"
            : "ACKNOWLEDGE"}
        </button>
        <button
          onClick={() => {
            sorted.forEach((alarm) => {
              if (!alarm.acknowledged) {
                useSocketStore.setState((state) => ({
                  alarms: state.alarms.map((a) =>
                    a.id === alarm.id ? { ...a, acknowledged: true } : a
                  ),
                }));
              }
            });
          }}
          className="p-2 min-w-[220px] border-2 
            cursor-pointer flex justify-center bg-orange-400 text-white font-bold 
            border-t-orange-300 border-l-orange-300 border-b-orange-500 
            border-r-orange-500 hover:bg-orange-500 disabled:hover:bg-orange-400 disabled:hover:cursor-auto"
          disabled={sorted.every((e) => e.acknowledged)}
        >
          {sorted.every((e) => e.acknowledged)
            ? "ALL ACKNOWLEDGED"
            : "ACKNOWLEDGE ALL"}
        </button>
      </div>
    </div>
  );
};
