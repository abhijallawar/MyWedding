"use client";

import { useEffect, useState } from "react";
import { countdown } from "../lib/wedding";

const units = ["Days", "Hours", "Minutes", "Seconds"];

export default function Countdown({ target, date, started }: { target: number | null; date: string; started: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (target === null) return;
    let timer: number | undefined;
    const refresh = () => {
      window.clearTimeout(timer);
      const current = Date.now();
      setNow(current);
      const remaining = target - current;
      if (remaining > 0) timer = window.setTimeout(refresh, remaining % 1000 || 1000);
    };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [target]);
  const remaining = target !== null && now !== null ? countdown(target, now) : null;
  if (target === null) return <p className="count-message">{date}</p>;
  if (remaining?.ended) return <p className="count-message" role="status">{started}</p>;
  return <div className="count-grid" role="group" aria-label={`Time until the wedding: ${date}`}>
    {units.map((unit, index) => <div key={unit} className="count-unit">
      <span className="count-value">{remaining ? String(remaining.units[index]).padStart(2, "0") : "–"}</span>
      <span className="count-label">{unit}</span>
    </div>)}
  </div>;
}
