"use client";

import { useRef, useCallback, useEffect } from "react";

export function useLoopingSound(src: string, volume = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop if component unmounts while playing
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) return; // already playing

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.play().catch(console.error);
    audioRef.current = audio;
  }, [src, volume]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
  }, []);

  return { play, stop };
}
