/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatcher } from "@/dispatcher";
import { StoreState } from "@/store";
import { StateCreator } from "zustand";

export type DataValue = { value: any; timestamp: Date; replay: boolean };

export type DataSlice = {
  data: Map<string, DataValue>;
  can_bus_state: number;
  setData: (payload: Record<string, any>, replay: boolean) => void;
  clearData: () => void;
};

function flattenObject(obj: unknown, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj as Record<string, unknown>) {
    const value = (obj as Record<string, unknown>)[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(result, flattenObject(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }

  return result;
}

export const registerDataSlice = (
  dispatcher: Dispatcher,
  set: (
    partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>),
  ) => void,
  get: () => StoreState,
) => {
  dispatcher.on("data", (_ws, msg) => {
    const receivedAt = new Date();
    const payload = msg.payload as unknown[];
    const flattened = flattenObject(payload);

    set((state) => {
      // 1. Create a new Map from the old one to ensure immutability
      const newDataMap = new Map(state.data);

      // 2. Iterate over each key in the received payload (e.g., "voltage", "rpm")
      for (const key in flattened) {
        newDataMap.set(key, {
          value: flattened[key],
          timestamp: receivedAt,
          replay: (msg.replay as boolean) || false,
        });
      }

      console.log(newDataMap);

      // 4. Return the new state with the updated map
      return { data: newDataMap };
    });
  });

  dispatcher.on("can_bus", (_ws, msg) => {
    set(() => ({
      can_bus_state: msg.state as number,
    }));
  });
};

export const createDataSlice: StateCreator<StoreState, [], [], DataSlice> = (
  set,
  get,
): DataSlice => ({
  data: new Map<string, DataValue>(),
  can_bus_state: -1,
  setData: (payload, replay) =>
    set((state) => {
      const newMap = new Map(state.data);
      const receivedAt = new Date();
      for (const key in payload) {
        newMap.set(key, { value: payload[key], timestamp: receivedAt, replay });
      }
      return { data: newMap };
    }),
  clearData: () => set({ data: new Map() }),
});
