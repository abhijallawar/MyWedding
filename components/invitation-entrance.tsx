"use client";

import Image from "next/image";
import { ChevronsDown } from "lucide-react";
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
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    void audio.current?.play().catch(() => {});
    setStage("opening");
  }

  useEffect(() => {
    if (stage !== "open") return;
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [stage]);

  return (
    <>
      <audio ref={audio} src={soundtrack} loop preload="auto" />
      <div inert={stage !== "open"}>{children}</div>
      {stage !== "open" && (
        <div
          className="invitation-cover"
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
            className="cover-surface"
            onClick={openInvitation}
            aria-label="Reveal wedding invitation and play music"
            aria-disabled={stage === "opening"}
          >
            <span className="cover-flap cover-flap-top" aria-hidden="true">
              <span className="cover-rule" /><Lotus className="cover-lotus" />
            </span>
            <span className="cover-flap cover-flap-bottom" aria-hidden="true">
              <span className="cover-rule" /><Lotus className="cover-lotus" />
            </span>
            <span className="cover-content" aria-hidden="true">
              <span className="cover-seal">
                <Image src="/art/abhilash-and-harsha.webp" alt="" width={768} height={768}
                  className="portrait-facing" sizes="(max-width: 540px) 215px, 295px" loading="eager" />
              </span>
              <span className="cover-welcome">Welcome</span>
              <ChevronsDown className="cover-chevron" size={22} strokeWidth={1.35} />
            </span>
          </button>
        </div>
      )}
    </>
  );
}
