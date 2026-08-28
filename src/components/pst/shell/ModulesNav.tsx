"use client";

import { Link } from "next-view-transitions";
import { Calendar, LayoutDashboard } from "lucide-react";
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
      className="modules-nav flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-3 rounded-2xl w-full max-w-full overflow-hidden"
      aria-label="Sélection du module PST"
    >
      <div className="modules-nav-links flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none max-w-full">
        <span className="modules-nav-title text-[11px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Modules :
        </span>
        {MODULES.map((id) => (
          <Link
            key={id}
            href={`/pst/${id}/`}
            className={`modules-nav-link text-xs px-2 py-1 rounded-md font-bold transition-all shrink-0${id === activeId ? " active bg-amber-600 text-white" : ""}`}
          >
            PST{id}
          </Link>
        ))}
      </div>

      <div className="pst-nav-actions flex items-center justify-between sm:justify-end gap-1.5 flex-wrap max-w-full pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800">
        <Link
          href="/pst/"
          className={`pst-cnam-link flex items-center gap-1 px-2.5 py-1 text-xs${active === "hub" ? " active" : ""}`}
          title="Accéder au Hub / Command Center PST"
        >
          <LayoutDashboard className="size-3.5 shrink-0" />
          <span>Hub</span>
        </Link>
        <Link
          href="/pst/planning/"
          className={`pst-cnam-link flex items-center gap-1 px-2.5 py-1 text-xs${active === "planning" ? " active" : ""}`}
          title="Consulter le calendrier et planning des cours"
        >
          <Calendar className="size-3.5 shrink-0" />
          <span>Planning</span>
        </Link>
        <CnamLink />
        <ThemeToggle />
      </div>
    </nav>
  );
}
