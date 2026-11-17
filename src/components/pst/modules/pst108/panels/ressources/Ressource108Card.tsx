"use client";

import {
  Copy,
  Check,
  FileText,
  ExternalLink,
  Sparkles,
  FileCode,
} from "lucide-react";
import type { Pst108OfficialResource } from "@/lib/pst/data/pst108";

interface Ressource108CardProps {
  res: Pst108OfficialResource;
  isCopied: boolean;
  onCopyApa: (id: string, apa: string) => void;
}

export function Ressource108Card({ res, isCopied, onCopyApa }: Ressource108CardProps) {
  const isProf = res.category === "article_prof";
  const isMedia = res.category === "media_audio_video";
  const isCas = res.category === "etude_cas";

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-2xs flex flex-col justify-between ${
        isProf
          ? "border-indigo-500/35 hover:border-indigo-500/60 hover:shadow-indigo-500/5 ring-1 ring-indigo-500/15"
          : isMedia
          ? "border-emerald-500/35 hover:border-emerald-500/60 hover:shadow-emerald-500/5 ring-1 ring-emerald-500/15"
          : isCas
          ? "border-rose-500/35 hover:border-rose-500/60 hover:shadow-rose-500/5 ring-1 ring-rose-500/15"
          : "border-amber-500/35 hover:border-amber-500/60 hover:shadow-amber-500/5 ring-1 ring-amber-500/15"
      }`}
    >
      <div className="space-y-3">
        {/* Header tags */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                isProf
                  ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                  : isMedia
                  ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                  : isCas
                  ? "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30"
                  : "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
              }`}
            >
              {res.categoryLabel}
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {res.prof}
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {res.year}
          </span>
        </div>

        {/* Title & Authors */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
            {res.title}
          </h3>
          <p className="text-[11px] font-mono font-semibold text-amber-700 dark:text-amber-400 mt-0.5 m-0">
            {res.authors} · <span className="text-slate-500 dark:text-slate-400">{res.sourceOrPublisher}</span>
          </p>
        </div>

        {/* Local file tag if present */}
        {res.localFile && (
          <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            <FileCode className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate">Fichier prof : <b>{res.localFile}</b></span>
          </div>
        )}

        {/* Platform Notice badge if any */}
        {res.platformNotice && (
          <div className="text-[11px] font-medium text-amber-900 dark:text-amber-200 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            <FileText className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{res.platformNotice}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
          {res.description}
        </p>

        {/* Key takeaway for exam */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
            <Sparkles className="size-3 text-indigo-500" />
            <span>Rôle stratégique pour l&apos;examen Cnam :</span>
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
              title="Ouvrir la ressource en ligne (Cairn, Persée, INA, YouTube, France Culture)"
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
            title="Copier la citation APA 7e"
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
