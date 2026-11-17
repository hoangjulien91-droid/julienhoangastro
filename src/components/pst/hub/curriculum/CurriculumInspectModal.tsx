"use client";

import { BookOpen, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/common/Link";
import type { ModuleProgress } from "@/lib/pst/data/curriculum-rncp7";

interface CurriculumInspectModalProps {
  module: ModuleProgress | null;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

export function CurriculumInspectModal({
  module,
  onClose,
  onToggleStatus,
}: CurriculumInspectModalProps) {
  if (!module) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Détails de l'unité ${module.code}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30">
              {module.code}
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2 leading-snug">
              {module.title}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
              Volume Crédits
            </span>
            <span className="font-black text-sm font-mono text-slate-900 dark:text-slate-100">
              {module.ects} ECTS
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
              Statut Actuel
            </span>
            <span className="font-bold text-sm">
              {module.status === "valide" ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  ✓ Validé
                </span>
              ) : module.status === "en_cours" ? (
                <span className="text-amber-600 dark:text-amber-400">
                  ⏳ En cours
                </span>
              ) : (
                <span className="text-slate-500">○ À venir</span>
              )}
            </span>
          </div>
        </div>

        {module.prereq && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-950 dark:text-amber-200 space-y-1">
            <span className="font-bold block flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-amber-600" />
              <span>Pré-requis &amp; Recommandations CNAM :</span>
            </span>
            <p className="m-0 leading-relaxed text-[11px] opacity-90 font-serif">
              {module.prereq}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onToggleStatus(module.id)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Changer de statut
          </button>

          {module.sitePath && (
            <Link
              href={module.sitePath}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 active:scale-95"
            >
              <span>Ouvrir l&apos;Atelier</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
