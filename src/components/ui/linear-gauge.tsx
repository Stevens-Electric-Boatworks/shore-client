"use client";

import "./linear-gauge.css";

type LinearGaugeProps = {
  data?: {
    value: number;
    timestamp: Date;
  }
  value?: number;
  low?: number;
  high?: number;
  dangerLow?: number;
  dangerHigh?: number;
  label?: string;
  suffix?: string;
  direction?: "vertical" | "horizontal";
  centered?: boolean;
  thickness?: number;
};

export const LinearGauge = ({
  // value,
  data,
  low = 0,
  high = 100,
  dangerLow,
  dangerHigh,
  label,
  suffix,
  direction = "vertical",
  centered = false,
  thickness = 20,
}: LinearGaugeProps) => {
  // Normalize value between 0 and 100
  const normalizedValue =
    data?.value === undefined
      ? 0
      : centered
      ? Math.max(
          -100,
          Math.min(100, ((data.value - (low + high) / 2) / ((high - low) / 2)) * 100)
        )
      : Math.max(0, Math.min(100, ((data.value - low) / (high - low)) * 100));

  return (
    <div className="flex flex-col items-center gap-2 ">
      {label && direction === "vertical" && (
        <p
          className={`text-sm font-bold max-w-[${thickness * 2}px] wrap-normal`}
        >
          {label}
        </p>
      )}
      <div
        className={`base ${direction}`}
        style={
          {
            "--thickness": `${thickness}px`,
          } as React.CSSProperties
        }
      >
        <div
          className={`inner ${centered ? "centered" : ""}`}
          style={{
            ...(centered
              ? direction === "horizontal"
                ? {
                    left: "50%",
                    width: `${Math.abs(normalizedValue) / 2}%`,
                    transform:
                      normalizedValue >= 0
                        ? "translateX(0)"
                        : "translateX(-100%)",
                  }
                : {
                    bottom: "50%",
                    height: `${Math.abs(normalizedValue) / 2}%`,
                    transform:
                      normalizedValue >= 0
                        ? "translateY(0)"
                        : "translateY(100%)",
                  }
              : direction === "horizontal"
              ? { width: `${normalizedValue}%` }
              : { height: `${normalizedValue}%` }),
            backgroundColor:
              (dangerLow && data?.value && data?.value <= dangerLow) ||
              (dangerHigh && data?.value && data?.value >= dangerHigh)
                ? "red"
                : "lime",
          }}
        />
      </div>
      <div className="flex gap-2">
        {label && direction === "horizontal" && (
          <p className={`relative text-sm font-bold`}>{label}</p>
        )}
        <p className="text-sm">
          {data?.value?.toFixed()}
          {suffix}
        </p>
      </div>
    </div>
  );
};
