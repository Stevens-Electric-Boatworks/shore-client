"use client";

import { useEffect, useState } from "react";
import { useError } from "./contexts/error-provider";
import { useSocket } from "./contexts/socket-provider";

export const StatusBar = () => {
  const [now, setNow] = useState(new Date());
  const { errors } = useError();
  const { socket, latency, isConnecting, isFailed } = useSocket();

  useEffect(() => {
    const handle = setInterval(() => {
      setNow(new Date());
    }, 200);
    return () => clearInterval(handle);
  }, []);

  const isError = errors.filter((e) => e.type === "ERROR").length > 0;

  const connectionColor = () => {
    const green = "from-lime-200 to-lime-500";
    const yellow = "from-yellow-100 to-yellow-300";
    const red = "from-red-300 to-red-600 text-white";

    if (isFailed) return red;
    if (isConnecting) return yellow;
    if ((latency || 0) > 1000) return yellow;

    return green;
  };

  const connectionText = () => {
    if (isConnecting) return "CONNECTING";
    if (isFailed) return "CONNECTION ERR";
    return "CONNECTION OK";
  };

  return (
    <div className="flex px-2 border-b-1 shadow-md bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="lg:flex flex-1 hidden">
        <p>SIT Electric Boatworks</p>
      </div>

      <div className="flex flex-1/2 justify-center gap-2">
        <div className="bg-gradient-to-b from-lime-200 to-lime-500 px-2 border-x">
          <p className="">POWER ON</p>
        </div>

        {isError ? (
          <div className="bg-gradient-to-b from-red-300 to-red-600 text-white border-black px-2 border-x">
            <p>ACTIVE FAULTS</p>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-lime-200 to-lime-500 px-2 border-x">
            <p>SYSTEMS OK</p>
          </div>
        )}

        <div
          className={`px-2 border-x bg-gradient-to-b  border-black
            ${connectionColor()}
            `}
        >
          <p>
            {connectionText()} {latency ? `[${latency} ms]` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-end">
        <p suppressHydrationWarning>{now.toLocaleString()}</p>
      </div>
    </div>
  );
};
