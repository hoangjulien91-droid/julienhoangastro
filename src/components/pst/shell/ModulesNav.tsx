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
      className="modules-nav flex items-center justify-between gap-1.5 p-1.5 sm:p-2 md:p-2.5 rounded-2xl md:rounded-3xl w-full max-w-full overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all sticky top-2 z-40"
      aria-label="Sélection du module PST"
    >
      {/* Conteneur fluide horizontal unique sur mobile, flex-wrap propre sur desktop */}
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none w-full max-w-full py-0.5">
        {/* Raccourci Cockpit & Planning en tête de ruban sur mobile */}
        <Link
          href="/pst/"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "hub"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Cockpit PST"
        >
          <LayoutDashboard className="size-3.5 shrink-0" />
          <span>Cockpit</span>
        </Link>

        <Link
          href="/pst/planning/"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "planning"
              ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Planning officiel"
        >
          <Calendar className="size-3.5 shrink-0" />
          <span>Planning</span>
        </Link>

        {/* Séparateur vertical fin */}
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* Modules UE (106, 108, 120, 123, 124) */}
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
          UE :
        </span>
        {MODULES.map((id) => {
          const isCurrent = id === activeId;
          return (
            <Link
              key={id}
              href={`/pst/${id}/`}
              className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 border active:scale-95 ${
                isCurrent
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30 scale-[1.02]"
                  : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/90 dark:hover:bg-slate-700"
              }`}
            >
              PST{id}
            </Link>
          );
        })}

        {/* Séparateur vertical fin */}
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* Outils secondaires : RNCP 7, 30s, Recherche, Thème */}
        <Link
          href="/pst/pyramide/"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "pyramide"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Cursus RNCP 7"
        >
          <GraduationCap className="size-3.5 shrink-0" />
          <span>RNCP 7</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/pst?open=pst:open-briefing-30s";
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Briefing Tactique 30s"
        >
          <Zap className="size-3.5 text-amber-500 shrink-0" />
          <span>30s</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Palette ⌘K"
        >
          <Search className="size-3.5 shrink-0" />
          <kbd className="text-[10px] font-mono opacity-80">⌘K</kbd>
        </button>

        <div className="shrink-0 flex items-center gap-1 ml-auto">
          <CnamLink />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
