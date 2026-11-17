"use client";

import { useEffect, useState, useRef, useMemo } from "react";
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
import { CnamLink, ThemeToggle } from "./ThemeToggle";
import {
  MODULES as HUB_MODULES,
  moduleStats,
} from "@/lib/pst/hub-stats";
import {
  getNextEvent,
  formatShortFrDate,
} from "@/lib/pst/planning-stats";
import { MODULE_LABELS } from "@/lib/pst/data/ponts";
import { type UeId } from "@/lib/pst/data/outils-par-ue";
import { NavPstDropdown } from "./nav/NavPstDropdown";
import { NavToolsDropdown } from "./nav/NavToolsDropdown";

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");
  const isUeActive = active && /^pst(106|108|120|123|124)$/.test(active);
  const [toolsUeFilter, setToolsUeFilter] = useState<UeId | "global">(
    isUeActive ? (active as UeId) : "pst106",
  );
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (active && /^pst(106|108|120|123|124)$/.test(active)) {
      setToolsUeFilter(active as UeId);
    }
  }, [active]);

  // Mobile & Desktop dropdown states
  const [mobilePstOpen, setMobilePstOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [desktopToolsOpen, setDesktopToolsOpen] = useState(false);
  const [desktopPstOpen, setDesktopPstOpen] = useState(false);

  const mobilePstRef = useRef<HTMLDivElement>(null);
  const mobileToolsRef = useRef<HTMLDivElement>(null);
  const desktopToolsRef = useRef<HTMLDivElement>(null);
  const desktopPstRef = useRef<HTMLDivElement>(null);

  const nextEvent = useMemo(() => getNextEvent(), []);

  const activeCourseLabel = useMemo(() => {
    if (active && active.startsWith("pst")) {
      const id = active.replace("pst", "");
      const label = MODULE_LABELS[active];
      return label ? `PST${id} · ${label}` : `PST${id}`;
    }
    return "PST...";
  }, [active]);

  useEffect(() => {
    if (!mobilePstOpen && !mobileToolsOpen && !desktopToolsOpen && !desktopPstOpen) return;

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (mobilePstRef.current && !mobilePstRef.current.contains(target)) {
        setMobilePstOpen(false);
      }
      if (mobileToolsRef.current && !mobileToolsRef.current.contains(target)) {
        setMobileToolsOpen(false);
      }
      if (
        desktopToolsRef.current &&
        !desktopToolsRef.current.contains(target)
      ) {
        setDesktopToolsOpen(false);
      }
      if (
        desktopPstRef.current &&
        !desktopPstRef.current.contains(target)
      ) {
        setDesktopPstOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobilePstOpen(false);
        setMobileToolsOpen(false);
        setDesktopToolsOpen(false);
        setDesktopPstOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobilePstOpen, mobileToolsOpen, desktopToolsOpen, desktopPstOpen]);

  useEffect(() => {
    function refreshProgress() {
      const nextMap: Record<string, number> = {};
      HUB_MODULES.forEach((m) => {
        const stats = moduleStats(m);
        nextMap[m.id.replace("pst", "")] = stats.pctCards;
      });
      setProgressMap(nextMap);
    }

    refreshProgress();
    window.addEventListener("pst:storage-updated", refreshProgress);
    return () =>
      window.removeEventListener("pst:storage-updated", refreshProgress);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full pt-1 sm:pt-2 pb-1.5 bg-transparent transition-all">
      <nav
        className="relative p-1.5 sm:p-2 md:py-2 md:px-3 rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── VERSION MOBILE (< md) : 1 SEULE LIGNE FLUIDE ET ULTRA-COMPACTE ── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── VERSION DESKTOP (>= md) : LIGNE UNIQUE ULTRA-ÉPURÉE & ÉLÉGANTE ── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
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

            {/* MODE 1 : Menu Déroulant Élégant (sur écrans moyens < xl pour garantir un espace généreux) */}
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
      </nav>
    </header>
  );
}
