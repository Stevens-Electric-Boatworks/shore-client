import { useEffect, useState } from "react";

export const NumberGauge = ({
  data,
  size = 200,
  low = 0,
  high = 100,
  warn,
  danger,
  label,
  suffix,
  valueString,
  precision = 0,
  staleDelay = 1500,
}: {
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
  precision?: number;
  valueString?: string;
  staleDelay?: number;
}) => {
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

  return (
    <div
      className={`flex flex-col items-center justify-center aspect-square relative`}
      style={{ width: size }}
    >
      <div className="flex items-end gap-1 mb-8">
        <p className="font-bold text-4xl">{data?.value.toFixed(precision)}</p>
        <p>{suffix}</p>
      </div>
      <p className="text-xs">VOLTAGE</p>
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
