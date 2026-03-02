"use client";

import { useSettingsStore } from "@/settings-store";
import "./styles.css";

export const AudioSettings = () => {
  const { settings, setSetting } = useSettingsStore();

  return (
    <div className="flex flex-col">
      <label htmlFor="audio.enabled">Enable Audio</label>
      <input
        type="checkbox"
        id="audio.enabled"
        className="mx-4"
        checked={settings.get("audio.enabled") as boolean}
        onChange={(e) => setSetting("audio.enabled", e.target.checked)}
      />

      <label htmlFor="audio.alarms.tone">Alarms Tone</label>
      <select
        id="audio.alarms.tone"
        value={settings.get("audio.alarms.tone") as string}
        onChange={(e) => setSetting("audio.alarms.tone", e.target.value)}
      >
        <option value={"honda"}>Honda</option>
      </select>

      <label htmlFor="audio.volume">Master Audio Volume</label>
      <input
        type="range"
        min={0}
        max={100}
        value={settings.get("audio.volume") as number}
        onChange={(e) => setSetting("audio.volume", e.target.value)}
      />
      <p>{settings.get("audio.volume") as number}</p>
    </div>
  );
};
