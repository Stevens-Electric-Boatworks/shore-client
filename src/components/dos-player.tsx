"use client";

import { DosFn } from "@/types/js-dos";
import { useEffect, useRef, useState } from "react";

// Tell TS this global exists at runtime (injected by the <script> tag)
declare const Dos: DosFn;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // already loaded
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function DosPlayer() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    let instance: ReturnType<DosFn> | null = null;

    const run = async () => {
      await loadScript("https://v8.js-dos.com/latest/js-dos.js");

      await new Promise<void>((resolve) => {
        const check = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof (window as any).Dos === "function") resolve();
          else setTimeout(check, 50);
        };
        check();
      });

      if (!rootRef.current) return;

      const shadow =
        rootRef.current.shadowRoot ??
        rootRef.current.attachShadow({ mode: "open" });

      shadow.innerHTML = "";

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "https://v8.js-dos.com/latest/js-dos.css";
      shadow.appendChild(styleLink);

      const container = document.createElement("div");
      container.style.width = "100%";
      container.style.height = "100%";
      shadow.appendChild(container);

      instance = Dos(container, {
        url: "/bundle.jsdos",
      });
      instance.setAutoStart(true);
    };

    run();

    return () => {
      instance?.stop();
    };
  }, []);

  return <div ref={rootRef} style={{ width: "800px", height: "600px" }} />;
}
