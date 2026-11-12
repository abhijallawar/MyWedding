"use client";

import { useEffect, useRef } from "react";

export default function WeddingMusic({ src }: { src: string }) {
  const player = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = player.current;
    if (!audio) return;

    // Browsers may require a guest interaction before playing audible media.
    function start() {
      void audio?.play().catch(() => {});
    }
    function removeFallback() {
      document.removeEventListener("click", start, true);
      document.removeEventListener("keydown", start, true);
    }

    document.addEventListener("click", start, true);
    document.addEventListener("keydown", start, true);
    audio.addEventListener("playing", removeFallback, { once: true });
    start();

    return () => {
      removeFallback();
      audio.removeEventListener("playing", removeFallback);
    };
  }, [src]);

  return <audio ref={player} src={src} autoPlay loop preload="auto" />;
}
