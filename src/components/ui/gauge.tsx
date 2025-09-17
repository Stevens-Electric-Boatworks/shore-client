"use client";

import "./gauge.css";

export const Gauge = ({
  value,
  low = 0,
  high = 100,
  danger,
  label,
  suffix,
}: {
  value?: number;
  low?: number;
  high?: number;
  danger?: number;
  label?: string;
  suffix?: string;
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        className="gauge"
        style={
          {
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
      <p className="absolute -translate-y-[50px] w-[200px] text-center">
        {label}
      </p>
      {value === undefined && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
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
