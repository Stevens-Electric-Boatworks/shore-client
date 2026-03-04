"use client";

import { useEffect, useState } from "react";
import "./gauge.css";

export const Gauge = ({
  // value,
  data,
  size = 200,
  low = 0,
  high = 100,
  warn,
  danger,
  label,
  suffix,
  valueString,
  staleDelay = 1500,
}: {
  // value?: number; #
  data?: {
    value: number;
    timestamp: Date;
  };
  size?: number;
  low?: number;
  high?: number;
  warn?: number;
  danger?: number;
  label?: string;
  suffix?: string;
  valueString?: string;
  staleDelay?: number;
}) => {
  const isDanger =
    danger !== undefined && data?.value !== undefined && data.value >= danger;
  const isWarn =
    warn !== undefined && data?.value !== undefined && data.value >= warn;

  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (!data) {
      setIsStale(true);
      return;
    }

    setIsStale(false);

    const timeSinceUpdate = Date.now() - new Date(data.timestamp).getTime();
    const timeUntilStale = staleDelay - timeSinceUpdate;

    if (timeUntilStale <= 0) {
      setIsStale(true);
      return;
    }

    const timeout = setTimeout(() => setIsStale(true), timeUntilStale);
    return () => clearTimeout(timeout);
  }, [data, staleDelay]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayValue = (data: any) => {
    if (typeof data === "number") return data.toFixed();
    if (!data) return "";
    return "" + data;
  };

  const scaleFontSize = (baseFontSize: number, text: string, maxChars = 4) => {
    const len = text.length;
    if (len <= maxChars) return baseFontSize;
    return Math.max(baseFontSize * 0.5, baseFontSize * (maxChars / len));
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      <div
        className="gauge"
        style={
          {
            "--size": `${size}px`,
            "--value": Math.max(
              0,
              Math.min(1, (data?.value || 0 - low) / (high - low)),
            ),
            "--color": isDanger ? "red" : isWarn ? "orange" : "lime",
          } as React.CSSProperties
        }
      >
        <div className="flex gap-1 w-full justify-center">
          <span
            style={{
              fontSize: scaleFontSize(
                size <= 100 ? 16 : 36,
                valueString ?? displayValue(data?.value),
              ),
            }}
          >
            {valueString ? valueString : displayValue(data?.value)}
          </span>
          <span
            style={{
              fontSize: scaleFontSize(
                size <= 100 ? 16 : 24,
                (valueString ?? displayValue(data?.value)) + (suffix ?? ""),
                6, // combined value+suffix can be a bit longer before shrinking
              ),
            }}
          >
            {suffix}
          </span>
        </div>
      </div>
      <p
        className={`absolute text-center`}
        style={{
          width: `${size}px`,
          bottom: size <= 100 ? 10 : 20,
          fontWeight: size <= 100 ? "bold" : "normal",
          fontSize: size <= 100 ? 12 : 16,
        }}
      >
        {label}
      </p>
      {isStale && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: `${size}px`,
            height: `${size}px`,
          }}
          viewBox="0 0 100 100"
        >
          <line x1="10" y1="10" x2="90" y2="90" stroke="red" strokeWidth="4" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="red" strokeWidth="4" />
        </svg>
      )}
    </div>
  );
};
