"use client";

import type { RefObject, Dispatch, SetStateAction } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  LayoutDashboard,
  Search,
  ChevronDown,
  BookOpen,
  Lock,
  Wrench,
} from "lucide-react";
import { CnamLink, ThemeToggle } from "../ThemeToggle";
import { formatShortFrDate, type getNextEvent } from "@/lib/pst/planning-stats";
import { type UeId } from "@/lib/pst/data/outils-par-ue";
import { NavPstDropdown } from "./NavPstDropdown";
import { NavToolsDropdown } from "./NavToolsDropdown";

interface DesktopNavBarProps {
  active?: string;
  activeId?: string;
  activeCourseLabel: string;
  isUeActive: boolean;
  progressMap: Record<string, number>;
  toolsUeFilter: UeId | "global";
  setToolsUeFilter: (filter: UeId | "global") => void;
  desktopToolsOpen: boolean;
  setDesktopToolsOpen: Dispatch<SetStateAction<boolean>>;
  desktopPstOpen: boolean;
  setDesktopPstOpen: Dispatch<SetStateAction<boolean>>;
  desktopToolsRef: RefObject<HTMLDivElement>;
  desktopPstRef: RefObject<HTMLDivElement>;
  nextEvent: ReturnType<typeof getNextEvent>;
}

export function DesktopNavBar({
  active,
  activeId,
  activeCourseLabel,
  isUeActive,
  progressMap,
  toolsUeFilter,
  setToolsUeFilter,
  desktopToolsOpen,
  setDesktopToolsOpen,
  desktopPstOpen,
  setDesktopPstOpen,
  desktopToolsRef,
  desktopPstRef,
  nextEvent,
}: DesktopNavBarProps) {
  return (
    <div className="desktop-nav-bar max-md:hidden flex items-center justify-between gap-1.5 lg:gap-2.5 w-full">
      {/* Gauche : Cursus PST (Pilotage, Planning, Modules) */}
      <div className="flex items-center gap-1 lg:gap-1.5 shrink-0">
        {/* Raccourci Poste de Pilotage */}
        <Link
          href="/pst/"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "hub"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
          }`}
          title="Poste de Pilotage PST (Hub central)"
        >
          <LayoutDashboard className="size-3.5 shrink-0" />
          <span className="hidden 2xl:inline">Pilotage</span>
        </Link>

        {/* Raccourci Planning */}
        <Link
          href="/pst/planning/"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "planning"
              ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
          }`}
          title="Planning officiel et séances de cours"
        >
          <Calendar className="size-3.5 shrink-0 text-amber-500" />
          <span className="hidden 2xl:inline">Planning</span>
        </Link>

        {/* Séparateur vertical fin */}
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* MODE 1 : Menu Déroulant Élégant (sur écrans moyens < xl) */}
        <div ref={desktopPstRef} className="relative xl:hidden">
          <button
            type="button"
            onClick={() => setDesktopPstOpen((v) => !v)}
            aria-expanded={desktopPstOpen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer active:scale-95 shrink-0 ${
              active?.startsWith("pst")
                ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
                : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
            }`}
            title="Choisir un atelier PST (5 modules)"
          >
            <BookOpen className="size-3.5 shrink-0" />
            <span className="font-bold max-w-[130px] truncate">{activeCourseLabel}</span>
            <ChevronDown
              className={`size-3.5 transition-transform duration-200 ${
                desktopPstOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {desktopPstOpen && (
            <div
              className="absolute left-0 top-full mt-2 w-80 p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <NavPstDropdown
                activeId={activeId}
                progressMap={progressMap}
                onClose={() => setDesktopPstOpen(false)}
              />
            </div>
          )}
        </div>

        {/* MODE 2 : Sur écrans larges (>= xl), les 3 UE actives du Semestre 1 (106, 108, 123) + Bouton compact S2 */}
        <div className="hidden xl:flex items-center gap-1 shrink-0">
          {(["106", "108", "123"] as const).map((id) => {
            const isCurrent = id === activeId;
            const pct = progressMap[id] ?? 0;

            return (
              <Link
                key={id}
                href={`/pst/${id}/`}
                title={`Atelier PST${id} (Semestre 1) — ${pct}% maîtrisé`}
                className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 border active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                  isCurrent
                    ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30 scale-[1.02]"
                    : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/90 dark:hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center gap-1.5 leading-none">
                  <span>PST{id}</span>
                  <span
                    className={`size-1.5 rounded-full shrink-0 ${
                      pct >= 75
                        ? "bg-emerald-400 shadow-xs"
                        : pct > 20
                          ? "bg-amber-400 shadow-xs"
                          : "bg-slate-400/60 dark:bg-slate-500/60"
                    }`}
                    aria-label={`${pct}% maîtrisé`}
                  />
                </div>
                {/* Micro barre de progression */}
                <div className="w-full h-[2px] bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCurrent
                        ? "bg-white"
                        : pct >= 75
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                    }`}
                    style={{ width: `${Math.max(pct, 4)}%` }}
                  />
                </div>
              </Link>
            );
          })}

          {/* Bouton Semestre 2 déroulant (PST120 & PST124) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDesktopPstOpen((v) => !v)}
              className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all shrink-0 border active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                activeId === "120" || activeId === "124"
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
                  : "bg-slate-100/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-800 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60"
              }`}
              title="Modules du Semestre 2 (PST120 & PST124 · Rentrée Février 2027)"
            >
              <span>
                {activeId === "120"
                  ? "PST120"
                  : activeId === "124"
                    ? "PST124"
                    : "S2"}
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/15">
                {activeId === "120" || activeId === "124" ? "S2" : "120·124"}
              </span>
              <ChevronDown className="size-3 shrink-0 opacity-70" />
            </button>

            {desktopPstOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-80 p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn space-y-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <NavPstDropdown
                  activeId={activeId}
                  progressMap={progressMap}
                  onClose={() => setDesktopPstOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Centre : Barre de Recherche Rapide (Notion / Linear style) */}
      <div className="flex-1 min-w-[70px] max-w-[140px] lg:max-w-[190px] xl:max-w-[250px] mx-1">
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("pst:open-command-palette"),
            )
          }
          className="w-full flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 text-xs transition-all shadow-2xs group cursor-pointer active:scale-98"
          title="Recherche instantanée notions, auteurs, fiches (⌘K)"
        >
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <Search className="size-3.5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
            <span className="truncate text-[11px] lg:text-xs">
              Rechercher...
            </span>
          </div>
          <kbd className="hidden lg:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Droite : Prochaine séance, Menu Boîte 18/20, Cnam & Thème */}
      <div className="shrink-0 flex items-center gap-1 lg:gap-1.5">
        {/* Prochaine séance Cnam Bègles si disponible */}
        {nextEvent && (
          <Link
            href="/pst/planning/"
            className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/25 transition-all shrink-0 active:scale-95"
            title={`Prochaine séance : ${nextEvent.unit.toUpperCase()} avec ${nextEvent.teacher} (${nextEvent.date} de ${nextEvent.start} à ${nextEvent.end})`}
          >
            <Calendar className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-[11px] font-bold">
              {nextEvent.unit.toUpperCase()} ·{" "}
              {formatShortFrDate(nextEvent.date)}
            </span>
          </Link>
        )}

        {/* Menu Popover Déroulant : Boîte à Outils 18/20 */}
        <div ref={desktopToolsRef} className="relative">
          <button
            type="button"
            onClick={() => setDesktopToolsOpen((v) => !v)}
            aria-expanded={desktopToolsOpen}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer active:scale-95 shrink-0 shadow-2xs ${
              desktopToolsOpen
                ? "bg-amber-500 text-white border-amber-600"
                : "bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 hover:from-amber-500/25 hover:to-indigo-500/25 text-amber-950 dark:text-amber-200 border-amber-500/30"
            }`}
            title="Ateliers d'entraînement et outils d'examen 18/20"
          >
            <Wrench
              className={`size-3.5 shrink-0 transition-colors ${
                desktopToolsOpen ? "text-white" : "text-amber-600 dark:text-amber-400"
              }`}
            />
            <span className="hidden lg:inline">
              Outils 18/20{isUeActive ? ` · ${activeId}` : ""}
            </span>
            <span className="lg:hidden">
              18/20{isUeActive ? `·${activeId}` : ""}
            </span>
            <ChevronDown
              className={`size-3.5 transition-transform duration-200 ${
                desktopToolsOpen ? "rotate-180 text-white" : ""
              }`}
            />
          </button>

          {desktopToolsOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 lg:w-96 p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn max-h-[82vh] overflow-y-auto overscroll-contain no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <NavToolsDropdown
                toolsUeFilter={toolsUeFilter}
                onSelectFilter={setToolsUeFilter}
                onClose={() => setDesktopToolsOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Lien Cnam ENF, Toggle Thème Jour/Nuit & Verrouillage */}
        <CnamLink />
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
