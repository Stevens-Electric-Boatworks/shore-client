import { Dispatcher, SocketMessage } from "@/dispatcher";
import { StoreState } from "@/store";
import { StateCreator } from "zustand";

export type ConnectionSlice = {
  ws: WebSocket | null;
  url?: string;
  connected_clients: number;
  reconnect_delay: number;
  latencies: { value: number; timestamp: Date }[];
  connect: () => void;
  disconnect: () => void;
};

export const registerConnectionSlice = (
  dispatcher: Dispatcher,
  set: (
    partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>),
  ) => void,
  get: () => StoreState,
) => {
  dispatcher.on("pong", (_ws, msg) => {
    const startTime = parseInt(msg.timestamp as string);
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
  });

  dispatcher.on("session", () => {
    set(() => ({
      data: new Map(),
      logs: [],
      alarms: [],
    }));
  });

  dispatcher.on("clients", (_ws, msg) => {
    set(() => ({
      connected_clients: (msg.payload as { count: number }).count,
    }));
  });
};

export const createConnectionSlice: StateCreator<
  StoreState,
  [],
  [],
  ConnectionSlice
> = (set, get): ConnectionSlice => ({
  ws: null,
  connected_clients: 0,
  reconnect_delay: 2000,
  latencies: [],
  connect: () => {
    const url = get().url;
    if (!url) {
      console.log("Attempted to connect but no URL was set.");
      return;
    }
    if (get().ws) return;

    const ws = new WebSocket(url);

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
    let pingInterval: NodeJS.Timeout | null;

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
      if (pingInterval) clearInterval(pingInterval);
      set({ ws: null });
      console.log(
        `Will attempt new connection in ${get().reconnect_delay} ms.`,
      );

      setTimeout(() => {
        if (!get().ws) {
          console.log(`Reconnecting to ${url}...`);
          get().connect();
        }
      }, get().reconnect_delay);
    });

    ws.addEventListener("open", () => {
      console.log(`Connected to WebSocket on ${ws.url}`);
      ping();
      pingInterval = setInterval(ping, 3000);
      ws.send(
        JSON.stringify({
          type: "ident",
          message: "client",
        }),
      );

      get().registerAll();
    });

    ws.addEventListener("message", (e) => {
      const parsed = JSON.parse(e.data) as SocketMessage;
      get().dispatcher.dispatch(ws, parsed);
    });

    set({ ws });
  },
  disconnect: () => {
    const ws = get().ws;
    if (ws) {
      ws.close();
      set({ ws: null });
    }
  },
});
