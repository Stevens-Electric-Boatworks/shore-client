import { create } from "zustand";

import defaults from "./settings-defaults.json";

export type SettingsStoreState = {
  settings: Map<string, unknown>;
  loaded: boolean;
  setSetting: (key: string, value: unknown) => void;
  loadSettings: () => void;
};

export const useSettingsStore = create<SettingsStoreState>()((...args) => {
  const [set, get] = args;
  return {
    settings: new Map(Object.entries(defaults)),
    loaded: false,
    setSetting: (key: string, value: unknown) => {
      localStorage.setItem(key, JSON.stringify(value));
      set((state) => {
        const updated = new Map(state.settings);
        updated.set(key, value);
        return { settings: updated };
      });
    },
    loadSettings: () => {
      console.log("Loading settings...");
      const newSettings = new Map<string, unknown>(Object.entries(defaults));

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        const value = localStorage.getItem(key);
        newSettings.set(key, value ? JSON.parse(value) : null);
      }
      console.log(newSettings);

      set({ settings: newSettings, loaded: true });
    },
  };
});
