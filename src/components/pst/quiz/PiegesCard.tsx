"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import type { PiegesItem } from "@/lib/pst/types";

interface PiegesCardProps {
  p: PiegesItem;
  idx: number;
  total: number;
  answer: boolean | null;
  mode: "list" | "focus" | "errors";
  onAnswer: (val: boolean) => void;
  keyPrefix?: string;
}

export function PiegesCard({
  p,
  idx,
  total,
  answer,
  mode,
  onAnswer,
  keyPrefix = "",
}: PiegesCardProps) {
  const isAnswered = answer !== null;

  return (
    <div className="qcard" key={`${keyPrefix}-${idx}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
          <AlertTriangle className="size-3 text-amber-600" />
          <span>
            Piège d&apos;Examen · #{idx + 1} / {total}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
            Vrai ou Faux ?
          </span>
        </div>
      </div>
      <div className="qtext">{p[0]}</div>
      <div className="opts flex flex-row gap-2.5">
        {[true, false].map((val) => {
          const cls = isAnswered
            ? val === p[1]
              ? "btn opt correct"
              : answer === val
                ? "btn opt wrong"
                : "btn opt"
            : "btn opt";
          return (
            <button
              key={String(val)}
              className={`${cls} flex-1 justify-center`}
              disabled={isAnswered}
              onClick={() => onAnswer(val)}
            >
              {val
                ? mode === "focus"
                  ? "Vrai [V]"
                  : "Vrai"
                : mode === "focus"
                  ? "Faux [F]"
                  : "Faux"}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div
          className={`explain show${answer !== p[1] ? " miss" : ""}`}
          dangerouslySetInnerHTML={{ __html: p[2] }}
        />
      )}
    </div>
  );
}
