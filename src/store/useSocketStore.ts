/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type WebSocketState = {
  data: Map<
    string,
    {
      value: any;
      timestamp: Date;
    }
  >;
  logs: any[];
  alarms: any[];
  latencies: {
    value: number;
    timestamp: Date;
  }[];
  ws: WebSocket | null;
  can_bus_state: number;
  connected_clients: number;
  connect: (url: string) => void;
  disconnect: () => void;
};

export const useSocketStore = create<WebSocketState>((set, get) => ({
  data: new Map(),
  logs: [],
  alarms: [],
  latencies: [],
  can_bus_state: -1,
  ws: null,
  connected_clients: 0,

  connect: (url: string) => {
    if (get().ws) return;

    const ws = new WebSocket(url);

    // send a ping object every 3 seconds (include timestamp so server can pong back)
    const ping = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "ping",
            timestamp: Date.now().toString(),
          }),
        );
      }
    };
    const pingInterval = setInterval(ping, 3000);

    // ensure the interval is cleared and store cleared when the socket closes
    ws.addEventListener("close", () => {
      clearInterval(pingInterval);
      set({ ws: null });
    });

    ws.onopen = () => {
      console.log(`Connected to WebSocket on ${ws.url}`);
      ping();
      ws.send(
        JSON.stringify({
          type: "ident",
          message: "client",
        }),
      );
    };

    ws.onmessage = (e) => {
      const parsed = JSON.parse(e.data);

      const type = parsed.type;

      if (type === "pong") {
        const startTime = parseInt(parsed.timestamp);
        const delta = Date.now() - startTime;
        set((state) => ({
          latencies: [
            {
              value: delta,
              timestamp: new Date(startTime),
            },
            ...state.latencies,
          ].slice(0, 30),
        }));
      }

      if (type === "data") {
        const payload = parsed.payload;
        const receivedAt = new Date();

        set((state) => {
          // 1. Create a new Map from the old one to ensure immutability
          const newDataMap = new Map(state.data);

          // 2. Iterate over each key in the received payload (e.g., "voltage", "rpm")
          for (const key in payload) {
            newDataMap.set(key, {
              value: payload[key],
              timestamp: receivedAt,
            });
          }

          // 4. Return the new state with the updated map
          return { data: newDataMap };
        });
      }

      if (type === "alarm") {
        const alarm = {
          ...parsed.payload,
          acknowledged: false,
          timestamp: new Date(parsed.payload.timestamp),
        };
        set((state) => ({
          alarms: [alarm, ...state.alarms].slice(-300),
        }));
      }

      if (type === "log") {
        const parsedAgain = parsed.payload.map((e: any) => ({
          ...e,
          timestamp: new Date(e.timestamp),
          id: uuidv4(),
        }));
        console.log(JSON.stringify(parsedAgain));
        set((state) => ({
          logs: [...parsedAgain, ...state.logs].slice(-10000),
        }));
      }

      if (type === "can_bus") {
        set(() => ({
          can_bus_state: parsed.state,
        }));
      }

      if (type === "clients") {
        set(() => ({
          connected_clients: parsed.payload.count,
        }));
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (ws) {
        ws.close();
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");

      console.log("Attempting new connection...");
      const reconnectDelay = 2000 + Math.floor(Math.random() * 2000);
      setTimeout(() => {
        if (!get().ws) {
          console.log(`Reconnecting to ${url} after ${reconnectDelay}ms...`);
          get().connect(url);
        }
      }, reconnectDelay);
    };

    // expose the socket in the store
    set({ ws });
  },

  disconnect: () => {
    const ws = get().ws;
    if (ws) {
      ws.close();
      set({ ws: null });
    }
  },
}));
