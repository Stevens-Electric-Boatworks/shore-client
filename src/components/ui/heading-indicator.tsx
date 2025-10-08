"use client";

export const HeadingIndicator = ({ data }: { data?: {value: number; timestamp: Date} }) => {
  return (
    <div className="w-[200px] h-[200px]  relative overflow-hidden">
      <p className="absolute inset-0 flex items-center justify-center text-white text-xl z-10 top-[80px]">
        {data?.value !== undefined ? `${data.value}°` : "—"}
      </p>
      <img
        src="/compass.png"
        alt="Compass"
        className="absolute w-[200px] h-[200px] transition-transform duration-500 ease-in-out"
        style={{ transform: `rotate(-${data?.value}deg)` }}
      />
      <img
        src="/overlay.png"
        alt="Overlay"
        className="absolute w-[200px] h-[200px]"
      />
      {(data === undefined || data.value === undefined || new Date().getTime() - data.timestamp.getTime() > 500) && (
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
