import { Dispatcher } from "@/dispatcher";
import { StoreState } from "@/store";
import { v4 } from "uuid";
import { StateCreator } from "zustand";

export type LogEntry = {
  id: string;
  message: string;
  level: number;
  timestamp: Date;
  emitter: string;
  file?: string;
  line?: number;
  function?: string;
};

export type LogsSlice = {
  logs: LogEntry[];
};

export const registerLogsSlice = (
  dispatcher: Dispatcher,
  set: (
    partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>),
  ) => void,
  get: () => StoreState,
) => {
  dispatcher.on("log", (_ws, msg) => {
    const logs = (msg.payload as LogEntry[]).map((e) => ({
      ...e,
      id: v4(),
    }));
    set((state) => ({
      logs: [...logs, ...state.logs].slice(-5000),
    }));
  });
};

export const createLogsSlice: StateCreator<StoreState, [], [], LogsSlice> = (
  set,
  get,
): LogsSlice => ({
  logs: [],
});
