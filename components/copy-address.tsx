"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CopyAddress({ address }: { address: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(address); setStatus("success"); }
    catch { setStatus("error"); }
  }
  return <div className="copy-wrap">
    <button className="text-action" type="button" onClick={copy}>
      {status === "success" ? <Check size={15} aria-hidden="true"/> : <Copy size={15} aria-hidden="true"/>}
      {status === "success" ? "Copied" : "Copy address"}
    </button>
    <span className={status === "error" ? "copy-error" : "sr-only"} role="status">
      {status === "success" ? "Address copied to clipboard." : status === "error" ? "Couldn’t copy. You can select the address above." : ""}
    </span>
  </div>;
}
