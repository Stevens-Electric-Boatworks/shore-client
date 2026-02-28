"use client";

import { FitAddon } from "@xterm/addon-fit";
import { useXTerm, XTerm } from "react-xtermjs";

export const Terminal = () => {
  const { instance, ref } = null;
  const fitAddon = new FitAddon();
  instance?.loadAddon(fitAddon);
  instance?.writeln("Hello from react-xtermjs!");
  instance?.onData((data) => instance.write(data));

  fitAddon.fit();

  return (
    <div className="flex flex-col h-full gap-2">
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
