"use client";

import "./gauge.css";

export const Gauge = ({
  value,
  size = 200,
  low = 0,
  high = 100,
  danger,
  label,
  suffix,
}: {
  value?: number;
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
              Math.min(1, (value || 0 - low) / (high - low))
            ),
            "--color":
              danger !== undefined
                ? (value || 0) > danger
                  ? "red"
                  : "lime"
                : "lime",
          } as React.CSSProperties
        }
      >
        {value?.toFixed()}
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
      {value === undefined && (
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
