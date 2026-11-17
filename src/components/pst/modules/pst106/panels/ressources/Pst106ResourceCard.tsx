"use client";

import React from "react";
import {
  FileCode,
  Sparkles,
  Headphones,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import type { Pst106OfficialResource } from "@/lib/pst/data/pst106-ressources";

interface Pst106ResourceCardProps {
  resource: Pst106OfficialResource;
  isCopied: boolean;
  isTakeawayCopied: boolean;
  onCopyApa: (id: string, apa: string) => void;
  onCopyTakeaway: (id: string, takeaway: string) => void;
}

export const Pst106ResourceCard: React.FC<Pst106ResourceCardProps> = ({
  resource: res,
  isCopied,
  isTakeawayCopied,
  onCopyApa,
  onCopyTakeaway,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition flex flex-col justify-between">
      <div className="space-y-3">
        {/* Badges: Category & Seance */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
              {res.categoryLabel}
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800/60">
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
          {res.sourceOrPublisher && <span> · {res.sourceOrPublisher}</span>}
        </div>

        {/* Local file indicator */}
        {res.localFile && (
          <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            <FileCode className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">
              Fichier source : <b>{res.localFile}</b>
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
          {res.description}
        </p>

        {/* Key takeaway for exam */}
        <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="size-3 text-emerald-500" />
              <span>Rôle d&apos;examen Cnam :</span>
            </div>
            <button
              type="button"
              onClick={() => onCopyTakeaway(res.id, res.keyTakeaway)}
              className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
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

        {/* Audio Player if audioUrl is present */}
        {res.audioUrl && (
          <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <Headphones className="size-3.5 text-teal-600 dark:text-teal-400" />
                <span>Podcast Officiel Intégré (Lecture directe)</span>
              </div>
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                Audio HD
              </span>
            </div>
            <audio
              controls
              preload="metadata"
              className="w-full h-8 rounded-lg"
              src={res.audioUrl}
            >
              Votre navigateur ne supporte pas l&apos;élément audio.
            </audio>
          </div>
        )}

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
              className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition"
              title="Consulter l'article en ligne (PISTES / OpenEdition)"
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
};
