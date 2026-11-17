"use client";

import type { RefObject, Dispatch, SetStateAction } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  LayoutDashboard,
  ChevronDown,
  BookOpen,
  Lock,
  Wrench,
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { type UeId } from "@/lib/pst/data/outils-par-ue";
import { NavPstDropdown } from "./NavPstDropdown";
import { NavToolsDropdown } from "./NavToolsDropdown";

interface MobileNavBarProps {
  active?: string;
  activeId?: string;
  activeCourseLabel: string;
  progressMap: Record<string, number>;
  toolsUeFilter: UeId | "global";
  setToolsUeFilter: (filter: UeId | "global") => void;
  mobilePstOpen: boolean;
  setMobilePstOpen: Dispatch<SetStateAction<boolean>>;
  mobileToolsOpen: boolean;
  setMobileToolsOpen: Dispatch<SetStateAction<boolean>>;
  mobilePstRef: RefObject<HTMLDivElement>;
  mobileToolsRef: RefObject<HTMLDivElement>;
}

export function MobileNavBar({
  active,
  activeId,
  activeCourseLabel,
  progressMap,
  toolsUeFilter,
  setToolsUeFilter,
  mobilePstOpen,
  setMobilePstOpen,
  mobileToolsOpen,
  setMobileToolsOpen,
  mobilePstRef,
  mobileToolsRef,
}: MobileNavBarProps) {
  return (
    <div className="mobile-nav-bar flex md:hidden items-center justify-between gap-1 sm:gap-1.5 w-full">
      {/* Bouton Pilotage compact */}
      <Link
        href="/pst/"
        className={`size-9 rounded-xl flex items-center justify-center border transition-all active:scale-95 shrink-0 ${
          active === "hub"
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
            : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100"
        }`}
        title="Poste de Pilotage PST (Hub central)"
        aria-label="Poste de Pilotage PST (Hub central)"
      >
        <LayoutDashboard className="size-4 shrink-0" />
      </Link>

      {/* Bouton Planning avec libellé visible */}
      <Link
        href="/pst/planning/"
        className={`h-9 px-2 sm:px-2.5 rounded-xl flex items-center gap-1.5 border text-xs font-bold transition-all active:scale-95 shrink-0 ${
          active === "planning"
            ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
            : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100"
        }`}
        title="Planning officiel et séances de cours"
      >
        <Calendar className="size-3.5 text-amber-500 shrink-0" />
        <span>Planning</span>
      </Link>

      {/* Sélecteur de PST Dropdown (centre extensible avec intitulé lisible) */}
      <div ref={mobilePstRef} className="flex-1 min-w-0">
        <button
          type="button"
          onClick={() => {
            setMobilePstOpen((v) => !v);
            setMobileToolsOpen(false);
          }}
          aria-expanded={mobilePstOpen}
          className={`w-full flex items-center justify-between px-2 sm:px-2.5 h-9 rounded-xl text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
            active && active.startsWith("pst")
              ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-2xs"
              : "bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700"
          }`}
          title="Sélectionner un module PST"
        >
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <BookOpen className="size-3.5 shrink-0 text-amber-500" />
            <span className="truncate font-bold">{activeCourseLabel}</span>
          </div>
          <ChevronDown
            className={`size-3 shrink-0 text-slate-500 transition-transform duration-200 ${
              mobilePstOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobilePstOpen && (
          <>
            <div
              className="fixed inset-x-0 bottom-0 top-[56px] z-40 bg-black/15 backdrop-blur-2xs animate-fadeIn md:hidden"
              onClick={() => setMobilePstOpen(false)}
              aria-hidden="true"
            />
            <div
              className="absolute left-2 right-2 top-full mt-2 max-w-sm mx-auto p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn space-y-1.5 overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <NavPstDropdown
                activeId={activeId}
                progressMap={progressMap}
                onClose={() => setMobilePstOpen(false)}
              />
            </div>
          </>
        )}
      </div>

      {/* Bouton Outils 18/20 compact (icône seule) */}
      <div ref={mobileToolsRef} className="shrink-0">
        <button
          type="button"
          onClick={() => {
            setMobileToolsOpen((v) => !v);
            setMobilePstOpen(false);
          }}
          aria-expanded={mobileToolsOpen}
          className={`size-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer active:scale-95 shadow-2xs ${
            mobileToolsOpen
              ? "bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-500/30"
              : "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/30 hover:bg-amber-500/20"
          }`}
          title="Ateliers et outils d'entraînement d'examen 18/20"
          aria-label="Ateliers et outils d'entraînement d'examen 18/20"
        >
          <Wrench
            className={`size-4 shrink-0 transition-colors ${
              mobileToolsOpen ? "text-white" : "text-amber-600 dark:text-amber-400"
            }`}
          />
        </button>

        {mobileToolsOpen && (
          <>
            <div
              className="fixed inset-x-0 bottom-0 top-[56px] z-40 bg-black/15 backdrop-blur-2xs animate-fadeIn md:hidden"
              onClick={() => setMobileToolsOpen(false)}
              aria-hidden="true"
            />
            <div
              className="absolute left-2 right-2 top-full mt-2 max-w-md mx-auto p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn max-h-[75vh] overflow-y-auto overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <NavToolsDropdown
                toolsUeFilter={toolsUeFilter}
                onSelectFilter={setToolsUeFilter}
                onClose={() => setMobileToolsOpen(false)}
              />
            </div>
          </>
        )}
      </div>

      {/* Bouton Toggle Thème & Verrouillage */}
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("pst:lock"))}
          title="Verrouiller l'accès PST"
          aria-label="Verrouiller l'accès PST"
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-[#891B29] dark:hover:text-rose-300 hover:border-[#891B29]/40 transition-colors cursor-pointer"
        >
          <Lock className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
