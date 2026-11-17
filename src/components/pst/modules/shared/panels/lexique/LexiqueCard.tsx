"use client";

import type { AMap, LexiqueItem } from "@/lib/pst/types";
import { SmartBridgeBadge } from "@/components/pst/bridges/SmartBridgeBadge";

interface LexiqueCardProps {
  item: LexiqueItem;
  index: number;
  authors: AMap;
  isBookmarked: boolean;
  isRevealed: boolean;
  testMode: boolean;
  isCopied: boolean;
  onToggleReveal: (index: number) => void;
  onToggleBookmark: (word: string, ev: React.MouseEvent) => void;
  onCopyTerm: (item: LexiqueItem, index: number, ev: React.MouseEvent) => void;
}

export function LexiqueCard({
  item,
  index,
  authors,
  isBookmarked,
  isRevealed,
  testMode,
  isCopied,
  onToggleReveal,
  onToggleBookmark,
  onCopyTerm,
}: LexiqueCardProps) {
  return (
    <div
      className={`lex-card${testMode && isRevealed ? " revealed" : ""}`}
      style={{ borderTop: `4px solid var(--${item.a}, var(--line))` }}
      onClick={() => onToggleReveal(index)}
    >
      <div className="lex-header">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="lex-title">{item.w}</span>
          <SmartBridgeBadge conceptQuery={item.w} />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(ev) => onCopyTerm(item, index, ev)}
            className="px-1.5 py-0.5 rounded text-[10px] font-semibold cursor-pointer border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            title="Copier le concept et sa définition"
          >
            {isCopied ? "✓ Copié" : "Copier"}
          </button>
          <button
            type="button"
            onClick={(ev) => onToggleBookmark(item.w, ev)}
            className={`px-1.5 py-0.5 rounded text-xs font-bold cursor-pointer border transition-colors ${
              isBookmarked
                ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"
                : "text-slate-400 border-transparent hover:text-amber-500"
            }`}
            title={
              isBookmarked
                ? "Retirer des concepts à revoir"
                : "Marquer ce concept à revoir"
            }
          >
            {isBookmarked ? "★" : "☆"}
          </button>
          <span
            className="lex-badge"
            style={{
              color: `var(--${item.a})`,
              border: `1px solid var(--${item.a})`,
            }}
          >
            {authors[item.a]}
          </span>
        </div>
      </div>
      <div className="lex-def-box">{item.def}</div>
      <div className="lex-eg-box">
        <b>Application :</b> {item.eg || "Non spécifiée"}
      </div>
    </div>
  );
}
