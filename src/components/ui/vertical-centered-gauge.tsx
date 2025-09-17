"use client";

import "./vertical-centered-gauge.css";

export const VerticalCenteredGauge = ({
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
    <div className="relative">
      <div
        className="base"
        style={
          {
            "--value": Math.max(
              -1,
              Math.min(1, ((value || 0) - low) / (high - low))
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
        <p className="label">
          {value?.toFixed(1)}
          {suffix}
        </p>
      </div>
      {value === undefined && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="0" x2="100" y2="100" stroke="red" strokeWidth="12" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="red" strokeWidth="12" />
        </svg>
      )}
    </div>
  );
};
