"use client";

import { Link } from "@/components/common/Link";
import { Calendar, LayoutDashboard, GraduationCap, Zap, Search } from "lucide-react";
import { CnamLink, ThemeToggle } from "./ThemeToggle";

const MODULES = ["106", "108", "120", "123", "124"] as const;

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");

  return (
    <nav
      className="modules-nav flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-2xl w-full max-w-full overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all sticky top-2 z-40"
      aria-label="Sélection du module PST"
    >
      <div className="modules-nav-links flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none max-w-full">
        <span className="modules-nav-title text-[10.5px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1.5 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
          UE :
        </span>
        {MODULES.map((id) => {
          const isCurrent = id === activeId;
          return (
            <Link
              key={id}
              href={`/pst/${id}/`}
              className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 border ${
                isCurrent
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30 scale-[1.02]"
                  : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/90 dark:hover:bg-slate-700"
              }`}
            >
              PST{id}
            </Link>
          );
        })}
      </div>

      <div className="pst-nav-actions flex items-center justify-between sm:justify-end gap-1.5 flex-wrap max-w-full pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800">
        <Link
          href="/pst/"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
            active === "hub"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
              : "bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Accéder au Cockpit / Command Center PST"
        >
          <LayoutDashboard className="size-3.5 shrink-0" />
          <span>Cockpit</span>
        </Link>
        <Link
          href="/pst/planning/"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
            active === "planning"
              ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
              : "bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Consulter le calendrier et planning des cours"
        >
          <Calendar className="size-3.5 shrink-0" />
          <span>Planning</span>
        </Link>
        <Link
          href="/pst/pyramide/"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
            active === "pyramide"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Consulter la Pyramide RNCP 7 (120 ECTS)"
        >
          <GraduationCap className="size-3.5 shrink-0" />
          <span>RNCP 7</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/pst?open=pst:open-briefing-30s";
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all"
          title="Ouvrir le Briefing Tactique 30s avant épreuve"
        >
          <Zap className="size-3.5 text-amber-500 shrink-0" />
          <span>30s</span>
        </button>
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold bg-slate-100/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200 cursor-pointer transition-all"
          title="Ouvrir la Palette de Commandes (⌘K)"
        >
          <Search className="size-3.5 shrink-0" />
          <kbd className="text-[10px] font-mono opacity-80">⌘K</kbd>
        </button>
        <CnamLink />
        <ThemeToggle />
      </div>
    </nav>
  );
}
