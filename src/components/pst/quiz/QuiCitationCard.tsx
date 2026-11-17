"use client";

import React from "react";
import { Quote } from "lucide-react";
import type { AMap, QuiItem } from "@/lib/pst/types";

interface QuiCitationCardProps {
  q: QuiItem;
  idx: number;
  total: number;
  answer: string | null;
  authors: AMap;
  authorKeys: string[];
  mode: "list" | "focus" | "errors";
  onAnswer: (authorKey: string) => void;
  keyPrefix?: string;
}

export function QuiCitationCard({
  q,
  idx,
  total,
  answer,
  authors,
  authorKeys,
  mode,
  onAnswer,
  keyPrefix = "",
}: QuiCitationCardProps) {
  const isAnswered = answer !== null;

  return (
    <div className="qcard" key={`${keyPrefix}-${idx}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
          <Quote className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>
            Qui a dit quoi ? · #{idx + 1} / {total}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
            Attribution d&apos;auteur
          </span>
        </div>
      </div>
      <div className="qtext">« {q[0]} »</div>
      <div className="opts">
        {authorKeys.map((key, kIdx) => {
          const cls = isAnswered
            ? key === q[1]
              ? "opt correct"
              : answer === key
                ? "opt wrong"
                : "opt"
            : "opt";
          return (
            <button
              key={key}
              className={cls}
              disabled={isAnswered}
              onClick={() => onAnswer(key)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{authors[key]}</span>
                {mode === "focus" && !isAnswered && (
                  <span className="text-[10px] font-mono opacity-60 ml-2">
                    [{kIdx + 1}]
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div
          className={`explain show${answer !== q[1] ? " miss" : ""}`}
          dangerouslySetInnerHTML={{ __html: q[2] }}
        />
      )}
    </div>
  );
}
