"use client";

import "./gauge.css";

export const Gauge = ({
  // value,
  data,
  size = 200,
  low = 0,
  high = 100,
  danger,
  label,
  suffix,
}: {
  // value?: number; #
  data?: {
    value: number;
    timestamp: Date;
  }
  size?: number;
  low?: number;
  high?: number;
  danger?: number;
  label?: string;
  suffix?: string;
}) => {
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
              Math.min(1, (data?.value || 0 - low) / (high - low))
            ),
            "--color":
              danger !== undefined
                ? (data?.value || 0) > danger
                  ? "red"
                  : "lime"
                : "lime",
          } as React.CSSProperties
        }
      >
        {data?.value.toFixed()}
        {suffix}
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
      {(data === undefined || data.value === undefined || new Date().getTime() - data.timestamp.getTime() > 500) && (
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
