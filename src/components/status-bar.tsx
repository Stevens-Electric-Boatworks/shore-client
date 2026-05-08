"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { useAuth } from "./contexts/AuthContext";
import { UsernameStatusBar } from "./username-status-bar";
import { StatusBarConnectionStatus } from "./status-bar-connection";

export const StatusBar = () => {
  const { alarms, ws, latencies, can_bus_state, data } = useStore();

  const isConnecting = ws?.readyState === WebSocket.CONNECTING;
  const isConnected = ws?.readyState === WebSocket.OPEN;
  const isFailed = !isConnected && !isConnecting;

  useEffect(() => {
    const handle = setInterval(() => {});
    return () => clearInterval(handle);
  }, []);

  const isError = alarms.filter((e) => e.type === "ERROR").length > 0;

  const green = "from-lime-200 to-lime-500 text-black";
  const blue = "from-blue-300 to-indigo-600 text-white border-black";
  const red = "from-red-300 to-red-600 text-white border-black";
  const grey = "from-gray-200 to-gray-400 text-black";
  const yellow = "from-yellow-100 to-yellow-300 text-black";

  const latestTimeDelta =
    Date.now() - (data.get("boat_time")?.timestamp.getTime() || 0);

  const can_bus_color = () => {
    if (isConnecting || isFailed || latestTimeDelta > 5000) return grey;
    if (can_bus_state == 0) return red;
    if (can_bus_state == 1) return green;
    if (can_bus_state == 2) return blue;
    return grey;
  };

  const can_connection_state = () => {
    if (isConnecting || isFailed || latestTimeDelta > 5000)
      return "CAN BUS UNAVAIL";
    if (can_bus_state == 0) return "CAN BUS OFFLINE";
    if (can_bus_state == 1) return "CAN BUS OK";
    if (can_bus_state == 2) return "CAN BUS TEST";

    return "CAN BUS UNAVAIL";
  };

  const systemStatus = () => {
    if (can_bus_state < 0 || latestTimeDelta > 5000) return "SYSTEMS UNAVAIL";
    if (isError) return "ACTIVE ALARMS";
    return "SYSTEMS OK";
  };

  const systemStatusColor = () => {
    if (can_bus_state < 0 || latestTimeDelta > 5000) return grey;
    if (isError) return red;
    return green;
  };

  const timeString = () => {
    if (!data.get("boat_time") || latestTimeDelta > 5000)
      return new Date().toLocaleString();
    const boatTime = new Date(data.get("boat_time")?.value);
    return boatTime.toLocaleString();
  };

  const timeColor = () => {
    if (!data.get("boat_time") || latestTimeDelta > 5000) return grey;
    if (latestTimeDelta > 1500) return yellow;
    if (data.get("boat_time")?.replay) return blue;
    return green;
  };

  return (
    <div className="text-sm md:text-base flex px-2 border-b-1 shadow-md bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="lg:flex hidden">
        <UsernameStatusBar />
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

        <StatusBarConnectionStatus />
      </div>

      <div className="flex justify-end">
        <div className={`border-x px-2 bg-gradient-to-b ${timeColor()}`}>
          <p suppressHydrationWarning>{timeString()}</p>
        </div>
      </div>
    </div>
  );
};
