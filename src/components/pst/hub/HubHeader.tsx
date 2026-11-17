"use client";

import { Link } from "@/components/common/Link";
import { Smartphone, Sparkles } from "lucide-react";

interface HubHeaderProps {
  resumeModule: { id: string; label: string };
  onOpenSyncModal: () => void;
}

export function HubHeader({ resumeModule, onOpenSyncModal }: HubHeaderProps) {
  return (
    <div className="mt-2 sm:mt-4 mb-6 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              Titre RNCP Niveau 7 · Bac+5
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Conservatoire National des Arts et Métiers
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
            Poste de Pilotage PST
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
            5 Unités d&apos;Enseignement · Répétition Espacée SM-2 · Planning
            Bègles &amp; Visio
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={onOpenSyncModal}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700 cursor-pointer shadow-xs"
            title="Synchroniser vos révisions entre Mac et iPhone"
          >
            <Smartphone className="size-3.5 text-indigo-500" />
            <span>Synchro Mac ↔ Mobile</span>
          </button>
          <Link
            href={`/pst/${resumeModule.id}/`}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="size-3.5 text-white" />
            <span>Reprendre {resumeModule.label} →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
