"use client";

import { cn } from "@/lib/cn";
import { Pause, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChronoState = "STOPPED" | "RUNNING" | "PAUSED";

const pad = (n: number, digits = 2) => String(n).padStart(digits, "0");

export const ChronoDisplay = () => {
  const [state, setState] = useState<ChronoState>("STOPPED");
  const [time, setTime] = useState(0);
  const lastTime = useRef(0);

  const hours = Math.floor(time / 3_600_000);
  const minutes = Math.floor((time % 3_600_000) / 60_000);
  const seconds = Math.floor((time % 60_000) / 1_000);

  const startTime = useRef(0);
  const accumulatedTime = useRef(0);

  useEffect(() => {
    if (state === "RUNNING") {
      startTime.current = Date.now();
      const handle = setInterval(() => {
        setTime(accumulatedTime.current + (Date.now() - startTime.current));
      }, 100); // can tick more frequently since it's cheap
      return () => clearInterval(handle);
    } else if (state === "STOPPED") {
      accumulatedTime.current = 0;
      setTime(0);
    } else if (state === "PAUSED") {
      accumulatedTime.current = time; // snapshot current time on pause
    }
  }, [state]);

  return (
    <div className="border bg-white p-2 flex gap-2">
      <p className="font-bold">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </p>
      <div className="ml-auto flex gap-2">
        {(state === "STOPPED" || state === "PAUSED") && (
          <button
            onClick={() => setState("RUNNING")}
            className={cn(
              "flex items-center justify-center w-6 h-6 bg-blue-600 border border-t-blue-400 border-l-blue-400 border-b-blue-700 border-r-blue-700 hover:bg-blue-700 hover:cursor-pointer",
            )}
          >
            <Play className="text-white w-4 h-4" />
          </button>
        )}
        {state === "RUNNING" && (
          <button
            onClick={() => setState("PAUSED")}
            className={cn(
              "flex items-center justify-center w-6 h-6 bg-blue-600 border border-t-blue-400 border-l-blue-400 border-b-blue-700 border-r-blue-700 hover:bg-blue-700 hover:cursor-pointer",
            )}
          >
            <Pause className="text-white w-4 h-4" />
          </button>
        )}
        {state !== "STOPPED" && (
          <button
            onClick={() => setState("STOPPED")}
            className={cn(
              "flex items-center justify-center w-6 h-6 bg-red-600 border border-t-red-400 border-l-red-400 border-b-red-700 border-r-red-700 hover:bg-red-700 hover:cursor-pointer",
            )}
          >
            <Square className="text-white w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
