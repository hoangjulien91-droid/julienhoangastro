"use client";

import {
  FileCode,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import type { Pst123OfficialResource } from "@/lib/pst/data/pst123-ressources";

interface RessourceCard123Props {
  res: Pst123OfficialResource;
  isCopied: boolean;
  isTakeawayCopied: boolean;
  onCopyApa: (id: string, apa: string) => void;
  onCopyTakeaway: (id: string, takeaway: string) => void;
}

export function RessourceCard123({
  res,
  isCopied,
  isTakeawayCopied,
  onCopyApa,
  onCopyTakeaway,
}: RessourceCard123Props) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between">
      <div className="space-y-3">
        {/* Badges: Category & Seance */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60">
              {res.categoryLabel}
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60">
              {res.seanceNumber}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
            {res.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
          {res.title}
        </h3>

        {/* Authors & Publisher */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {res.authors}
          </span>
          {res.sourceOrPublisher && (
            <span> · {res.sourceOrPublisher}</span>
          )}
        </div>

        {/* Local file indicator */}
        {res.localFile && (
          <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            <FileCode className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate">
              Dossier bureau : <b>{res.localFile}</b>
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
          {res.description}
        </p>

        {/* Key takeaway for exam */}
        <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
              <Sparkles className="size-3 text-indigo-500" />
              <span>Argument d&apos;examen Cnam :</span>
            </div>
            <button
              type="button"
              onClick={() => onCopyTakeaway(res.id, res.keyTakeaway)}
              className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {isTakeawayCopied ? (
                <>
                  <Check className="size-2.5 text-emerald-600" />
                  <span className="text-emerald-600">Copié</span>
                </>
              ) : (
                <>
                  <Copy className="size-2.5" />
                  <span>Copier argument</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium m-0">
            {res.keyTakeaway}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {res.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom APA Citation, Web Link & Copy Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full sm:max-w-[65%]">
          <span className="font-bold">APA 7 :</span> {res.apa7Citation}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {res.url && (
            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1 transition"
              title="Consulter l'article en ligne (Cairn / Persée)"
            >
              <ExternalLink className="size-3" />
              <span>Consulter</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onCopyApa(res.id, res.apa7Citation)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              isCopied
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
            }`}
            title="Copier la citation académique APA 7e"
          >
            {isCopied ? (
              <>
                <Check className="size-3 text-white" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copier APA</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
