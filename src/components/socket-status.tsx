"use client";

import { useRef } from "react";
import Cookies from "js-cookie";
import { useStore } from "@/store";

export const SocketStatus = () => {
  const { ws, latencies, connected_clients, disconnect, connect } = useStore();

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="border bg-white p-2 flex-1 w-[400px]">
      <p className="font-bold uppercase">Socket Status</p>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Connected?</td>
            <td className=" text-end">{ws?.readyState === 1 ? "YES" : "NO"}</td>
          </tr>
          <tr>
            <td>Socket URL</td>
            <td className="text-end flex justify-end gap-1">
              <input
                type="text"
                className=" border px-2"
                defaultValue={ws?.url}
                ref={inputRef}
              />
              <button
                className="px-1 text-xs font-bold cursor-pointer bg-blue-600 border-t-blue-400 border-l-blue-400 border-b-blue-800 border-r-blue-800 border text-white hover:bg-blue-700"
                onClick={() => {
                  const val = inputRef.current?.value;
                  if (!val) return;
                  if (ws?.url === val) return;
                  if (ws) {
                    disconnect();
                    useStore.setState({ url: val });
                    connect();
                    Cookies.set("ws-url", val);
                    return;
                  }
                  connect();
                  Cookies.set("ws-url", val);
                  return;
                }}
              >
                CHNG
              </button>
            </td>
          </tr>
          <tr>
            <td>Ready State</td>
            <td className="text-end font-mono">{ws?.readyState}</td>
          </tr>
          <tr>
            <td>Is Connecting?</td>
            <td className="text-end">
              {ws?.readyState === WebSocket.CONNECTING ? "YES" : "NO"}
            </td>
          </tr>
          <tr>
            <td>Is Closed?</td>
            <td className="text-end">
              {ws?.readyState === WebSocket.CLOSED ? "YES" : "NO"}
            </td>
          </tr>
          <tr>
            <td>Last Ping</td>
            <td className="text-end">
              {latencies[0]?.timestamp.toLocaleTimeString() ?? "---"}
            </td>
          </tr>
          <tr>
            <td>Connected Clients</td>
            <td className="text-end">{connected_clients}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
