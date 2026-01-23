"use client";

import { useEffect, useRef, useState } from "react";
import { useSocketStore } from "@/store/useSocketStore";
import { NavButton } from "./ui/nav-button";

export const LogTable = () => {
  // const [data, setData] = useState<LogData[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { logs } = useSocketStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedLog = logs.find((e) => e.id === selected);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 5;
    setIsAtBottom(nearBottom);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el && isAtBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs, isAtBottom]);

  return (
    <div className="flex flex-1 gap-2 min-h-0">
      <div className={`flex-2 min-h-0 border ${isAtBottom && "border-b-2"}`}>
        <div className="flex flex-col h-full">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto bg-white"
          >
            <table className="w-full border-separate border-spacing-0">
              <colgroup>
                <col span={1} width={200} />
                <col span={1} width={80} />
              </colgroup>
              <thead className="sticky top-0 bg-gradient-to-b from-zinc-100 to-zinc-300 text-left border-b">
                <tr>
                  <th className="px-2 border-b font-normal">Timestamp</th>
                  <th className="border-b font-normal">Level</th>
                  <th className="border-b font-normal">Message</th>
                </tr>
              </thead>
              <tbody>
                {[...logs]
                  .slice(-3000)
                  .sort(
                    (a, b) =>
                      new Date(a.timestamp).getTime() -
                      new Date(b.timestamp).getTime(),
                  )
                  .map((log, idx) => (
                    <tr
                      key={log.id}
                      className={`cursor-pointer ${
                        log.id === selected
                          ? "bg-blue-600 text-white"
                          : log.level === 40
                            ? "bg-red-300 font-semibold hover:bg-red-500"
                            : log.level == 30
                              ? "bg-yellow-300 hover:bg-yellow-500 hover:italic"
                              : idx % 2 == 0
                                ? "bg-gray-100 hover:bg-blue-200 "
                                : "bg-gray-0 hover:bg-blue-200"
                      }`}
                      onClick={() => setSelected(log.id)}
                    >
                      <td className="px-2 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-2 text-right font-mono">{log.level}</td>
                      <td className="px-2">{log.message}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex-1 min-h-0 overflow-y-auto border bg-white">
          <div className="sticky top-0 border-b bg-gradient-to-b from-zinc-100 to-zinc-300 px-2">
            Log Detail
          </div>
          {selectedLog ? (
            <div className="p-2 flex flex-col gap-2">
              <div className="border p-2 bg-zinc-200/50">
                <p className="underline">Timestamp</p>
                <p>
                  {selectedLog.timestamp.toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "long",
                  })}
                </p>
              </div>
              <div
                className={`border p-2 ${
                  selectedLog.level === 40
                    ? "bg-red-400/50"
                    : selectedLog.level == 30
                      ? "bg-yellow-400/50"
                      : "bg-zinc-200/50"
                }`}
              >
                {" "}
                <p className="underline">Level</p>
                <p className="font-mono">{selectedLog.level}</p>
              </div>
              <div className="border p-2 bg-zinc-200/50">
                <p className="underline">Message</p>
                <p>{selectedLog.message}</p>
              </div>
              <div className="border p-2 bg-zinc-200/50">
                <p className="underline">File</p>
                <p
                  className={`font-mono wrap-anywhere  ${
                    selectedLog.file ?? "text-zinc-500"
                  }`}
                >
                  {selectedLog.file ?? "undefined"}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 border p-2 bg-zinc-200/50">
                  <p className="underline">Function</p>
                  <p
                    className={`font-mono  ${
                      selectedLog.function ?? "text-zinc-500"
                    }`}
                  >
                    {selectedLog.function ?? "undefined"}
                  </p>
                </div>
                <div className="flex-1 border p-2 bg-zinc-200/50">
                  <p className="underline">Line</p>
                  <p
                    className={`font-mono  ${
                      selectedLog.line ?? "text-zinc-500"
                    }`}
                  >
                    {selectedLog.line ?? "undefined"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex py-8 justify-center text-zinc-500">
              No log selected.
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <NavButton
            onClick={() => {
              const idx = logs.findIndex((e) => e.id === selected);
              if (idx < 1) return;
              setSelected(logs[idx - 1].id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <polygon points="11.5,2.5 4,8 11.5,13.5" fill="#ffffff" />
            </svg>
          </NavButton>
          <NavButton
            onClick={() => {
              const idx = logs.findIndex((e) => e.id === selected);
              if (idx >= logs.length - 1) return;
              setSelected(logs[idx + 1].id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <polygon points="4.5,2.5 12,8 4.5,13.5" fill="#ffffff" />
            </svg>
          </NavButton>
          <div className="flex gap-2 ml-auto">
            <NavButton
              onClick={() => {
                setSelected(null);
                useSocketStore.setState((e) => ({ logs: [] }));
              }}
            >
              CLEAR LOGS
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  );
};
