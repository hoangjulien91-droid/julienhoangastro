"use client";

import React from "react";
import { Link } from "@/components/common/Link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import type { ModuleProgress } from "@/lib/pst/data/curriculum-rncp7";

export interface CurriculumPyramidBlockProps {
  item?: ModuleProgress | undefined;
  onToggle: (id: string) => void;
  onInspect?: (item: ModuleProgress) => void;
  bgClass: string;
  isSiteModule?: boolean;
}

export function CurriculumPyramidBlock({
  item,
  onToggle,
  onInspect,
  bgClass,
  isSiteModule = false,
}: CurriculumPyramidBlockProps) {
  if (!item) return null;

  const isValidated = item.status === "valide";
  const isInProgress = item.status === "en_cours";

  const statusLabel = isValidated
    ? "Validé"
    : isInProgress
      ? "En cours"
      : "À venir";

  // Les briques ont des bordures strictes et pas de rounded
  const activeClass = isValidated
    ? "bg-emerald-600 text-white border-emerald-700"
    : isInProgress
      ? "bg-amber-600 text-white border-amber-700"
      : `${bgClass} opacity-95 hover:opacity-100`;

  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`p-2 sm:p-2.5 border border-black/20 dark:border-white/10 transition-all cursor-pointer relative group flex flex-col justify-between h-full select-none active:scale-[0.98] ${activeClass}`}
      title={`${item.code} — ${item.title} (${item.ects} ECTS) · Statut : ${statusLabel}. Cliquez pour basculer le statut.`}
    >
      {/* En-tête : Badge UE (nowrap) et Crédits ECTS séparés proprement */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] font-black tracking-tight mb-1">
          <span className="inline-flex items-center gap-1 font-mono whitespace-nowrap">
            <span>{item.code}</span>
            {isValidated && (
              <CheckCircle2 className="size-3 text-white shrink-0" />
            )}
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] opacity-90 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/20 dark:bg-white/20 font-bold">
            {item.ects} ECTS
          </span>
        </div>

        {/* Titre : line-clamp-2 ou line-clamp-3 sans troncature brutale */}
        <div
          className="text-[10px] sm:text-[11px] font-bold leading-tight line-clamp-2 sm:line-clamp-3 break-words text-left"
          title={item.title}
        >
          {item.title}
        </div>

        {item.note && (
          <div
            className="text-[9px] font-medium opacity-85 italic line-clamp-1 mt-0.5 text-left"
            title={item.note}
          >
            {item.note}
          </div>
        )}
      </div>

      {/* Barre basse : bouton info ℹ + lien atelier */}
      <div className="mt-1.5 pt-1 flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInspect?.(item);
          }}
          className="size-5 rounded flex items-center justify-center text-[10px] font-mono font-bold bg-black/15 hover:bg-black/30 dark:bg-white/15 dark:hover:bg-white/30 transition-colors cursor-pointer"
          title="Inspecter pré-requis et crédits"
          aria-label={`Détails et pré-requis de ${item.code}`}
        >
          ℹ
        </button>

        {isSiteModule && item.sitePath && (
          <Link
            href={item.sitePath}
            onClick={(e) => e.stopPropagation()}
            className="text-[9px] sm:text-[10px] font-black uppercase hover:underline flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/15 hover:bg-black/25 dark:bg-white/15 dark:hover:bg-white/25 transition-colors whitespace-nowrap ml-auto"
          >
            <span>Atelier</span>
            <ArrowUpRight className="size-2.5 sm:size-3" />
          </Link>
        )}
      </div>

      {/* Infobulle / Tooltip Popover riche au survol (Desktop) */}
      <div className="hidden lg:block opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-2xl bg-slate-950/95 text-slate-100 shadow-2xl border border-slate-700/80 backdrop-blur-xl z-50 text-left text-xs space-y-1.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="font-mono font-black text-amber-400 text-xs">
            {item.code}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 font-bold text-slate-300">
            {item.ects} ECTS
          </span>
        </div>
        <div className="font-bold text-white text-xs leading-snug">
          {item.title}
        </div>
        <div className="text-[11px] text-slate-300 leading-snug">
          <span className="font-semibold text-amber-400">Statut : </span>
          <span
            className={
              isValidated
                ? "text-emerald-400 font-bold"
                : isInProgress
                  ? "text-amber-300 font-bold"
                  : "text-slate-400"
            }
          >
            {statusLabel}
          </span>
        </div>
        {item.prereq && (
          <div className="text-[10px] text-slate-300 leading-relaxed bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
            <span className="font-bold text-slate-200 block mb-0.5">
              Pré-requis officiels :
            </span>
            {item.prereq}
          </div>
        )}
        <div className="text-[10px] text-amber-300/80 italic pt-0.5">
          💡 Clic pour changer le statut (Validé / En cours / À venir)
        </div>
      </div>
    </div>
  );
}
