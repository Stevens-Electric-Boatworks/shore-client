import { Dispatcher } from "@/dispatcher";
import { StoreState } from "@/store";
import { StateCreator } from "zustand";

export type Alarm = {
  id: number;
  type: "ERROR" | "WARNING" | "UNKNOWN";
  message: string;
  raisedAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
};

export type AlarmsSlice = {
  alarms: Alarm[];
  acknowledgeAlarm: (id: number) => void;
};

export const registerAlarmsSlice = (
  dispatcher: Dispatcher,
  set: (
    partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>),
  ) => void,
  get: () => StoreState,
) => {
  dispatcher.on("alarm", (_ws, msg) => {
    if (msg.action == "set") {
      const alarm: Alarm = {
        ...(msg.payload as Alarm),
        raisedAt: new Date((msg.payload as { raisedAt: string }).raisedAt),
        acknowledgedAt: (msg.payload as { acknowledgedAt?: string })
          .acknowledgedAt
          ? new Date((msg.payload as { acknowledgedAt: string }).acknowledgedAt)
          : undefined,
        resolvedAt: (msg.payload as { resolvedAt?: string }).resolvedAt
          ? new Date((msg.payload as { resolvedAt: string }).resolvedAt)
          : undefined,
      };
      set((state) => ({
        alarms: [alarm, ...state.alarms].slice(-500),
      }));
    } else if (msg.action == "resolve") {
    } else if (msg.action == "acknowledge") {
      const id = msg.id as number;
      const now = new Date();
      set((state) => {
        const alarms = Array.from(state.alarms);
        alarms
          .filter((e) => e.id == id)
          .filter((e) => !e.acknowledgedAt || !e.resolvedAt)
          .forEach((e) => {
            e.acknowledgedAt = now;
          });
        return { alarms };
      });
    }
  });
};

export const createAlarmsSlice: StateCreator<
  StoreState,
  [],
  [],
  AlarmsSlice
> = (set, get): AlarmsSlice => ({
  alarms: [],
  acknowledgeAlarm: (id: number) => {
    const ws = get().ws;
    if (!ws) return;
    ws.send(
      JSON.stringify({
        type: "alarm",
        action: "acknowledge",
        id,
      }),
    );
  },
});
