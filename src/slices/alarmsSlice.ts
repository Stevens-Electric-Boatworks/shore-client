import { Dispatcher } from "@/dispatcher";
import { StoreState } from "@/store";
import { StateCreator } from "zustand";

export type Alarm = {
  timestamp: Date;
  id: number;
  type: "ERROR" | "WARNING";
  message: string;
  acknowledged: boolean;
};

export type AlarmsSlice = {
  alarms: Alarm[];
};

export const registerAlarmsSlice = (
  dispatcher: Dispatcher,
  set: (
    partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>),
  ) => void,
  get: () => StoreState,
) => {
  dispatcher.on("alarm", (_ws, msg) => {
    const alarm: Alarm = {
      ...(msg.payload as Alarm),
      timestamp: new Date((msg.payload as { timestamp: string }).timestamp),
    };
    set((state) => ({
      alarms: [alarm, ...state.alarms].slice(-500),
    }));
  });
};

export const createAlarmsSlice: StateCreator<
  StoreState,
  [],
  [],
  AlarmsSlice
> = (set, get): AlarmsSlice => ({
  alarms: [],
});
