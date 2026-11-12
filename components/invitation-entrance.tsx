"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lotus } from "./ornaments";

export default function InvitationEntrance({ soundtrack, children }: {
  soundtrack: string;
  children: ReactNode;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");

  function openInvitation() {
    if (stage !== "closed") return;
    void audio.current?.play().catch(() => {});
    setStage("opening");
  }

  useEffect(() => {
    if (stage === "open") document.getElementById("main")?.focus({ preventScroll: true });
  }, [stage]);

  return (
    <>
      <audio ref={audio} src={soundtrack} loop preload="auto" />
      <div inert={stage !== "open"}>{children}</div>
      {stage !== "open" && (
        <div
          className="invitation-envelope"
          data-stage={stage}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && stage === "opening") setStage("open");
          }}
        >
          <button
            type="button"
            className="envelope-paper"
            onClick={openInvitation}
            aria-label="Open invitation and play music"
            aria-disabled={stage === "opening"}
          >
            <span className="envelope-folds" aria-hidden="true" />
            <span className="envelope-flap" aria-hidden="true" />
            <span className="envelope-content" aria-hidden="true">
              <span className="envelope-seal">
                <Image src="/art/abhilash-and-harsha.webp" alt="" width={768} height={768}
                  className="portrait-facing" sizes="(max-width: 540px) 140px, 176px" loading="eager" />
              </span>
              <span className="envelope-welcome">Welcome</span>
              <span className="envelope-hint"><Lotus /> Open invitation</span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
