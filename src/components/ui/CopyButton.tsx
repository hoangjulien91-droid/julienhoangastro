"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = "Copier le texte",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API indisponible (contexte non sécurisé ou permission refusée)
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full border border-accent text-accent font-semibold px-4 py-2 text-sm hover:bg-accent/10 transition-colors ${className}`}
    >
      {copied ? (
        <>
          <Check className="size-4" /> Copié !
        </>
      ) : (
        <>
          <Copy className="size-4" /> {label}
        </>
      )}
    </button>
  );
}

export default CopyButton;
