"use client";

import { Play, Sparkles } from "lucide-react";
import { useId, useRef, useState } from "react";

export default function WeddingFireworks() {
  const player = useRef<HTMLVideoElement>(null);
  const playerId = useId();
  const [open, setOpen] = useState(false);

  function toggleFireworks() {
    const video = player.current;
    if (!video) return;

    if (open) {
      video.pause();
    } else {
      video.currentTime = 0;
      // Keep the native controls available if the browser blocks playback.
      void video.play().catch(() => {});
    }
    setOpen(!open);
  }

  return (
    <div className="wedding-fireworks">
      <button type="button" className="wedding-fireworks-button"
        aria-expanded={open} aria-controls={playerId} onClick={toggleFireworks}>
        {open ? <Sparkles size={17} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        {open ? "Hide fireworks" : "Play fireworks"}
      </button>
      <div id={playerId} className="wedding-fireworks-player" hidden={!open}>
        <video ref={player} controls muted playsInline preload="none"
          width={720} height={480}
          poster="/art/wedding-fireworks-poster.webp"
          src="/art/wedding-fireworks.mp4"
          aria-label="Illustrated fireworks slowly rising and blooming over a moonlit temple">
          Your browser does not support video playback.
        </video>
      </div>
    </div>
  );
}
