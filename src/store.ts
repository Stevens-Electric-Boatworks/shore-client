import { create } from "zustand";
import {
  createConnectionSlice,
  ConnectionSlice,
  registerConnectionSlice,
} from "./slices/connectionSlice";
import {
  createDataSlice,
  DataSlice,
  registerDataSlice,
} from "./slices/dataSlice";
import {
  createLogsSlice,
  LogsSlice,
  registerLogsSlice,
} from "./slices/logsSlice";
import {
  createAlarmsSlice,
  AlarmsSlice,
  registerAlarmsSlice,
} from "./slices/alarmsSlice";
import { Dispatcher } from "./dispatcher";

type SliceRegister = (
  dispatcher: Dispatcher,
  set: (
    partial: Partial<StoreState> | ((state: StoreState) => Partial<StoreState>),
  ) => void,
  get: () => StoreState,
) => void;

const sliceRegisters: SliceRegister[] = [
  registerConnectionSlice,
  registerDataSlice,
  registerLogsSlice,
  registerAlarmsSlice,
];

export type StoreState = ConnectionSlice &
  DataSlice &
  LogsSlice &
  AlarmsSlice & {
    dispatcher: Dispatcher;
    registerAll: () => void;
  };

export const useStore = create<StoreState>()((...args) => {
  const [set, get] = args;
  return {
    dispatcher: new Dispatcher(),
    registerAll: () => {
      const d = get().dispatcher;
      for (const register of sliceRegisters) {
        register(d, set, get);
      }
    },
    ...createConnectionSlice(...args),
    ...createDataSlice(...args),
    ...createLogsSlice(...args),
    ...createAlarmsSlice(...args),
  };
});
