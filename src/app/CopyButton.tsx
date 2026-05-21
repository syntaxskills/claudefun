"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  copyLabel: string;
  copiedLabel: string;
};

export function CopyButton({ text, copyLabel, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button type="button" onClick={copyText} aria-live="polite">
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
