/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type WebSocketState = {
  data: any[];
  logs: any[];
  alarms: any[];
  latencies: any[];
  connect: () => void;
  disconnect: () => void;
};

export const useSocketStore = create<WebSocketState>((set, get) => ({
  data: [],
  logs: [],
  alarms: [],
  latencies: [],

  connect: () => {
    if ((get() as any).ws) return;

    const ws = new WebSocket("wss://eboat.thiagoja.com/api");

    // send a ping object every 3 seconds (include timestamp so server can pong back)
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "ping",
            timestamp: Date.now().toString(),
          })
        );
      }
    }, 3000);

    // ensure the interval is cleared when the socket closes
    ws.addEventListener("close", () => {
      clearInterval(pingInterval);
    });

    ws.onopen = (e) => {
      console.log(`Connected to WebSocket on ${ws.url}`);
      ws.send(
        JSON.stringify({
          type: "ident",
          message: "client",
        })
      );
    };

    ws.onmessage = (e) => {
      const parsed = JSON.parse(e.data);

      const type = parsed.type;

      if (type === "pong") {
        const startTime = parseInt(parsed.timestamp);
        const delta = Date.now() - startTime;
        set((state) => ({
          latencies: [delta, ...state.latencies].slice(0, 30),
        }));
      }

      if (type === "data") {
        set((state) => ({ data: [parsed.payload, ...state.data] }));
      }

      if (type === "log") {
        const parsedAgain = parsed.payload.map((e: any) => ({
          ...e,
          timestamp: new Date(e.timestamp),
          id: uuidv4(),
        }));
        console.log(JSON.stringify(parsedAgain));
        set((state) => ({ logs: [...parsedAgain, ...state.logs] }));
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    (get() as any).ws = ws;
  },

  disconnect: () => {
    const ws = (get() as any).ws;
    console.log(JSON.stringify(ws));
    if (ws) {
      ws.close();
      (get() as any).ws = null;
    }
  },
}));
