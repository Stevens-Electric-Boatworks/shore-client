"use client";

import { useState } from "react";
import { NavButton } from "./ui/nav-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import useKeybind from "@/hooks/use-keybind";
import { useStore } from "@/store";

export const AlarmsTable = () => {
  const [selected, setSelected] = useState(0);

  const alarms = useStore((s) => s.alarms);

  const sorted = alarms.slice().sort((a, b) => {
    // First, sort by type: ERRORs before WARNINGs
    if (a.type !== b.type) {
      return a.type.toUpperCase() === "ERROR" ? -1 : 1;
    }
    // Then, sort by timestamp: newest first
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const acknowledgeAll = () => {
    sorted.forEach((alarm) => {
      if (!alarm.acknowledged) {
        useStore.setState((state) => ({
          alarms: state.alarms.map((a) =>
            a.id === alarm.id ? { ...a, acknowledged: true } : a,
          ),
        }));
      }
    });
  };

  const acknowledgeSelected = () => {
    const selectedId = sorted[selected]?.id;
    if (!selectedId) return;
    useStore.setState((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === selectedId ? { ...a, acknowledged: true } : a,
      ),
    }));
  };

  const selectionDown = () => {
    if (selected < alarms.length - 1) setSelected((s) => s + 1);
  };

  const selectionUp = () => {
    if (selected > 0) setSelected((s) => s - 1);
  };

  useKeybind("A", () => acknowledgeAll());
  useKeybind("a", () => acknowledgeSelected());
  useKeybind("ArrowUp", () => selectionUp());
  useKeybind("ArrowDown", () => selectionDown());

  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="flex flex-col flex-1 min-h-0 bg-white border">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col span={1} className="w-[180px]" />
              <col span={1} className="w-[80px]" />
              <col span={1} className="w-[70px]" />
            </colgroup>
            <thead className="text-left border-b bg-gradient-to-b from-zinc-100 to-zinc-300 sticky top-0 z-10">
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
                    {e.type.toUpperCase() !== "WARNING" &&
                      e.type.toUpperCase() !== "ERROR" && (
                        <div
                          className={`text-sm text-center border mx-2 bg-zinc-200`}
                        >
                          ???
                        </div>
                      )}
                  </td>
                  <td>{e.id}</td>
                  <td>{e.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length <= 0 && (
          <div className="bg-gradient-to-b from-lime-200 to-lime-500 px-2 border-t mt-auto">
            No active alarms. Enjoy this moment! ☺️
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <NavButton onClick={selectionUp}>
          <ChevronUp />
        </NavButton>
        <NavButton onClick={selectionDown}>
          <ChevronDown />
        </NavButton>
        <button
          onClick={acknowledgeSelected}
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
          onClick={acknowledgeAll}
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
        <div className="flex  gap-6 items-center bg-white border px-2">
          <p className="font-bold">
            {alarms.filter((e) => !e.acknowledged).length} Not Acknowledged
          </p>
          <p>{alarms.length} Total</p>
        </div>
      </div>
    </div>
  );
};
