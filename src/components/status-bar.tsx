"use client";

import { useEffect, useState } from "react";
import { useSocketStore } from "@/store/useSocketStore";
import { clearInterval } from "timers";

export const StatusBar = () => {
  const { alarms, ws, latencies, can_bus_state, data } = useSocketStore();

  const [isBoatTime, setIsBoatTime] = useState(false);

  const [isFailed, setIsFailed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    if (ws) {
      setIsConnecting(ws.readyState === WebSocket.OPEN);

      ws.addEventListener("open", () => {
        setIsFailed(false);
        setIsConnecting(false);
      });

      ws.addEventListener("error", () => {
        setIsFailed(false);
        setIsConnecting(true);
      });

      ws.addEventListener("close", () => {
        setIsFailed(false);
        setIsConnecting(true);
      });
    }
  }, [ws]);

  useEffect(() => {
    const handle = setInterval(() => {
      setIsBoatTime((e) => !e);
    });
    return () => clearInterval(handle);
  }, [setIsBoatTime]);

  useEffect(() => {
    const handle = setInterval(() => {});
    return () => clearInterval(handle);
  }, []);

  const isError = alarms.filter((e) => e.type === "error").length > 0;

  const green = "from-lime-200 to-lime-500 text-black";
  const blue = "from-blue-300 to-indigo-600 text-white border-black";
  const red = "from-red-300 to-red-600 text-white border-black";
  const grey = "from-gray-200 to-gray-400 text-black";
  const yellow = "from-yellow-100 to-yellow-300 text-black";

  const connectionColor = () => {
    if (isFailed) return red;
    if (isConnecting) return yellow;
    if ((latencies[0]?.value || 0) > 1000) return yellow;

    return green;
  };

  const can_bus_color = () => {
    if (isConnecting || isFailed) return grey;
    if (can_bus_state == 0) return red;
    if (can_bus_state == 1) return green;
    if (can_bus_state == 2) return blue;
    return grey;
  };

  const can_connection_state = () => {
    if (isConnecting || isFailed) return "CAN BUS UNAVAIL";
    if (can_bus_state == 0) return "CAN BUS OFFLINE";
    if (can_bus_state == 1) return "CAN BUS ON";
    if (can_bus_state == 2) return "CAN BUS TEST";

    return "CAN BUS UNAVAIL";
  };

  const connectionText = () => {
    if (isConnecting) return "CONNECTING";
    if (isFailed) return "CONNECTION ERR";
    return "CONNECTION OK";
  };

  const systemStatus = () => {
    if (can_bus_state < 0) return "SYSTEMS UNAVAIL";
    if (isError) return "ACTIVE ALARMS";
    return "SYSTEMS OK";
  };

  const systemStatusColor = () => {
    if (can_bus_state < 0) return grey;
    if (isError) return red;
    return green;
  };

  const timeString = () => {
    const latestTimeDelta =
      Date.now() - (data.get("boat_time")?.timestamp.getTime() || 0);
    if (!data.get("boat_time") || latestTimeDelta > 5000)
      return new Date().toLocaleString();
    const boatTime = new Date(data.get("boat_time")?.value);
    return boatTime.toLocaleString();
  };

  const timeColor = () => {
    const latestTimeDelta =
      Date.now() - (data.get("boat_time")?.timestamp.getTime() || 0);
    if (!data.get("boat_time") || latestTimeDelta > 5000) return grey;
    if (latestTimeDelta > 1500) return yellow;
    if (data.get("boat_time")?.replay) return blue;
    return green;
  };

  return (
    <div className="text-sm md:text-base flex px-2 border-b-1 shadow-md bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="lg:flex hidden">
        <p>SIT Electric Boatworks</p>
      </div>

      <div className="flex flex-1/2 justify-center gap-2">
        <div className={`bg-gradient-to-b px-2 border-x ${can_bus_color()}`}>
          <p className="">{can_connection_state()}</p>
        </div>

        <div
          className={`border-black px-2 border-x bg-gradient-to-b ${systemStatusColor()}`}
        >
          <p>{systemStatus()}</p>
        </div>

        <div
          className={`px-2 border-x bg-gradient-to-b  border-black ${connectionColor()}`}
        >
          <p>
            {connectionText()}{" "}
            {!isConnecting && !isFailed && latencies[0]
              ? `[${latencies[0].value} ms]`
              : ""}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <div className={`border-x px-2 bg-gradient-to-b ${timeColor()}`}>
          <p suppressHydrationWarning>{timeString()}</p>
        </div>
      </div>
    </div>
  );
};
