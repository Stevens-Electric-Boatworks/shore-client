"use client";

import { useEffect, useState } from "react";
import { useSocket } from "./contexts/socket-provider";
import { useSocketStore } from "@/store/useSocketStore";

type LogData = {
  timestamp: Date;
  level: number;
  name?: string;
  msg: string;
  file?: string;
  function?: string;
  line?: number;
};

export const LogTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [data, setData] = useState<LogData[]>([]);
  const [selected, setSelected] = useState(0);
  const { logs } = useSocketStore();

  // useEffect(() => {
  //   setData([
  //     {
  //       timestamp: new Date(1757239034923),
  //       level: 20,
  //       msg: "This is a test log message",
  //     },
  //     {
  //       timestamp: new Date(1757239038923),
  //       level: 20,
  //       msg: "This is a test log message",
  //     },
  //     {
  //       timestamp: new Date(1757239033923),
  //       level: 40,
  //       msg: "This is a test error message",
  //     },
  //     {
  //       timestamp: new Date(1757239036923),
  //       level: 40,
  //       msg: "SDFJLKSDFKSDFFDS",
  //     },
  //     {
  //       timestamp: new Date(1757239034923),
  //       level: 20,
  //       msg: "This is a test log message",
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;

  //   const handleSocketMessage = (event: MessageEvent) => {
  //     const data = event.data as string;
  //     try {
  //       const parsed = JSON.parse(data);

  //       if (parsed.type !== "log") return;
  //       if (!parsed.payload) return;

  //       if (Array.isArray(parsed.payload)) {
  //         const logs = parsed.payload.map((p: LogData) => ({
  //           timestamp: p.timestamp ? new Date(p.timestamp) : new Date(),
  //           level: p.level,
  //           name: p.name,
  //           msg: p.msg ?? String(p),
  //           file: p.file,
  //           function: p.function,
  //           line: p.line,
  //         }));
  //         setData((prev) => [...prev, ...logs]);
  //         return;
  //       }
  //       const payload = parsed.payload;
  //       const log: LogData = {
  //         timestamp: payload.timestamp
  //           ? new Date(payload.timestamp)
  //           : new Date(),
  //         level: payload.level,
  //         name: payload.name,
  //         msg: payload.msg ?? String(payload),
  //         file: payload.file,
  //         function: payload.function,
  //         line: payload.line,
  //       };
  //       setData((prev) => [...prev, log]);
  //     } catch {}
  //   };

  //   socket.addEventListener("message", handleSocketMessage);
  //   return () => socket.removeEventListener("message", handleSocketMessage);
  // }, [socket]);

  const selectedLog = logs[selected];

  return (
    <div className="flex gap-2">
      <div className="border flex-2 h-full">
        <table className="w-full">
          <colgroup>
            <col span={1} className="w-[180px]" />
            <col span={1} className="w-[80px]" />
          </colgroup>
          <thead className="text-left border-b bg-gradient-to-b from-zinc-100 to-zinc-300">
            <tr>
              <td>Timestamp</td>
              <td>Level</td>
              <td>Message</td>
            </tr>
          </thead>
          <tbody>
            {logs.map((e, idx) => (
              <tr
                key={idx}
                className={
                  idx === selected
                    ? "cursor-pointer text-white bg-blue-600"
                    : `hover:cursor-pointer hover:bg-blue-200`
                }
                onClick={() => setSelected(idx)}
              >
                <td>{e.timestamp.toLocaleString()}</td>
                <td>{e.level}</td>
                <td>{e.msg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border flex-1">
        <div className="px-2 border-b bg-gradient-to-b from-zinc-100 to-zinc-300">
          Log Detail
        </div>
        {selectedLog && selected !== undefined ? (
          <div className="flex flex-col gap-2 p-2">
            <div className="p-2 bg-zinc-200/50 border border-zinc-400 ">
              <p className="underline">Timestamp</p>
              <p>
                {selectedLog.timestamp.toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "long",
                })}
              </p>
            </div>
            <div className="p-2 bg-zinc-200/50 border border-zinc-400 ">
              <p className="underline">Level</p>
              <p className="font-mono">{selectedLog.level}</p>
            </div>
            <div className="p-2 bg-zinc-200/50 border border-zinc-400 ">
              <p className="underline">Message</p>
              <p>{selectedLog.msg}</p>
            </div>
            <div className="p-2 bg-zinc-200/50 border border-zinc-400 ">
              <p className="underline">File</p>
              <p
                className={`font-mono ${
                  selectedLog.file ? "" : "text-zinc-500"
                }`}
              >
                {selectedLog.file || "undefined"}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 p-2 bg-zinc-200/50 border border-zinc-400 ">
                <p className="underline">Function</p>
                <p
                  className={`font-mono ${
                    selectedLog.function ? "" : "text-zinc-500"
                  }`}
                >
                  {selectedLog.function || "undefined"}
                </p>
              </div>
              <div className="flex-1 p-2 bg-zinc-200/50 border border-zinc-400 ">
                <p className="underline">Line</p>
                <p
                  className={`font-mono ${
                    selectedLog.line ? "" : "text-zinc-500"
                  }`}
                >
                  {selectedLog.line || "undefined"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
