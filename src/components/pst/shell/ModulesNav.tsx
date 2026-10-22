"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  LayoutDashboard,
  GraduationCap,
  Zap,
  Swords,
  ShieldCheck,
  Printer,
  Flame,
  ShieldAlert,
  HeartHandshake,
  Layers,
  Headphones,
  History,
  Compass,
  Search,
  ChevronDown,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { CnamLink, ThemeToggle } from "./ThemeToggle";
import {
  MODULES as HUB_MODULES,
  moduleStats,
  INDEX,
} from "@/lib/pst/hub-stats";
import { getUnitSemesterStatus } from "@/lib/pst/planning-stats";

const MODULE_IDS = ["106", "108", "120", "123", "124"] as const;

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  // Mobile dropdown states
  const [mobilePstOpen, setMobilePstOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const mobilePstRef = useRef<HTMLDivElement>(null);
  const mobileToolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobilePstOpen && !mobileToolsOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (mobilePstRef.current && !mobilePstRef.current.contains(target)) {
        setMobilePstOpen(false);
      }
      if (mobileToolsRef.current && !mobileToolsRef.current.contains(target)) {
        setMobileToolsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobilePstOpen, mobileToolsOpen]);

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
        className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── VERSION MOBILE (< md) : ERGONOMIE TACTILE SANS DÉFILEMENT ─────── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex md:hidden flex-col gap-2 w-full">
          {/* Ligne 1 : Les 2 piliers majeurs (Pilotage & Planning) + Thème & ENF */}
          <div className="flex items-center gap-2 w-full">
            {/* Bouton Pilotage */}
            <Link
              href="/pst/"
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border active:scale-95 min-h-[42px] ${
                active === "hub"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700/80"
              }`}
              title="Poste de Pilotage PST (Hub central)"
            >
              <LayoutDashboard className="size-4 shrink-0" />
              <span>Pilotage</span>
            </Link>

            {/* Bouton Planning */}
            <Link
              href="/pst/planning/"
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border active:scale-95 min-h-[42px] ${
                active === "planning"
                  ? "bg-amber-600 text-white border-amber-600 shadow-xs shadow-amber-600/30"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700/80"
              }`}
              title="Planning officiel et séances de cours"
            >
              <Calendar className="size-4 shrink-0 text-amber-500" />
              <span>Planning</span>
            </Link>

            {/* Actions secondaires : Thème & Espace ENF */}
            <div className="flex items-center gap-1 shrink-0">
              <ThemeToggle />
              <CnamLink />
            </div>
          </div>

          {/* Ligne 2 : Sélecteur de PST & Boîte à Outils 18/20 */}
          <div className="flex items-center gap-2 w-full pt-1.5 border-t border-slate-200/70 dark:border-slate-800/70">
            {/* Sélecteur de PST Dropdown */}
            <div ref={mobilePstRef} className="flex-1 relative">
              <button
                type="button"
                onClick={() => {
                  setMobilePstOpen((v) => !v);
                  setMobileToolsOpen(false);
                }}
                aria-expanded={mobilePstOpen}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer active:scale-95 min-h-[40px] ${
                  active && active.startsWith("pst")
                    ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-xs"
                    : "bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700"
                }`}
                title="Sélectionner un module PST"
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <BookOpen className="size-4 shrink-0 text-amber-500" />
                  <span className="truncate">
                    {active && active.startsWith("pst")
                      ? `Module ${active.toUpperCase()}`
                      : "Choisir PST"}
                  </span>
                </div>
                <ChevronDown
                  className={`size-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                    mobilePstOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobilePstOpen && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-80 mt-2 p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn space-y-1.5">
                  <div className="px-2.5 py-1.5 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>Ateliers Cursus PST</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      5 Modules
                    </span>
                  </div>

                  {MODULE_IDS.map((id) => {
                    const isCurrent = id === activeId;
                    const pct = progressMap[id] ?? 0;
                    const semStatus = getUnitSemesterStatus(`pst${id}`);
                    const moduleMeta =
                      INDEX.modules[`pst${id}` as keyof typeof INDEX.modules];

                    return (
                      <Link
                        key={id}
                        href={`/pst/${id}/`}
                        onClick={() => setMobilePstOpen(false)}
                        className={`flex items-center justify-between p-2.5 rounded-xl transition-all border ${
                          isCurrent
                            ? "bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 font-bold shadow-xs"
                            : "bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`px-2 py-1 rounded-lg font-mono font-black text-xs shrink-0 ${
                              isCurrent
                                ? "bg-amber-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            PST{id}
                          </div>
                          <div className="min-w-0 text-left">
                            <div className="text-xs font-bold truncate">
                              {moduleMeta?.title ?? `Atelier PST ${id}`}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {semStatus.isDormant
                                ? `Semestre 2 · Rentrée ${semStatus.firstSessionLabel}`
                                : "Semestre 1 · En cours"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 font-mono text-xs pl-2">
                          <span className="font-bold">{pct}%</span>
                          <span
                            className={`size-2.5 rounded-full ${
                              pct >= 75
                                ? "bg-emerald-500 ring-2 ring-emerald-500/20"
                                : pct > 20
                                  ? "bg-amber-500 ring-2 ring-amber-500/20"
                                  : "bg-slate-300 dark:bg-slate-600"
                            }`}
                          />
                        </div>
                      </Link>
                    );
                  })}

                  <Link
                    href="/pst/#pyramide"
                    onClick={() => setMobilePstOpen(false)}
                    className="flex items-center justify-center gap-2 p-2 mt-1 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <GraduationCap className="size-3.5 text-indigo-500" />
                    <span>Voir la maquette pédagogique RNCP 7</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Bouton Boîte à Outils 18/20 */}
            <div ref={mobileToolsRef} className="flex-1 relative">
              <button
                type="button"
                onClick={() => {
                  setMobileToolsOpen((v) => !v);
                  setMobilePstOpen(false);
                }}
                aria-expanded={mobileToolsOpen}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer active:scale-95 min-h-[40px] ${
                  mobileToolsOpen
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                    : "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/30 hover:bg-amber-500/20"
                }`}
                title="Ateliers et outils d'entraînement d'examen"
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <Sparkles className="size-4 shrink-0 text-amber-500" />
                  <span className="truncate">Outils 18/20</span>
                </div>
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform duration-200 ${
                    mobileToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileToolsOpen && (
                <div className="absolute right-0 w-72 sm:w-80 mt-2 p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fadeIn space-y-1 text-xs">
                  <div className="px-2 py-1 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                    <span>Ateliers d'Entraînement 18/20</span>
                    <Sparkles className="size-3.5 text-amber-500" />
                  </div>

                  {/* Ponts Transversaux */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-ponts-transversaux"),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 transition-colors text-left font-bold"
                  >
                    <div className="size-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-amber-900 dark:text-amber-200">
                        Ponts Transversaux Inter-PST
                      </div>
                      <div className="text-[10px] text-amber-700/80 dark:text-amber-400/80 font-normal">
                        17 passerelles théoriques & matrice 7 écoles
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-command-palette"),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-slate-500/10 flex items-center justify-center shrink-0">
                      <Search className="size-3.5 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        Recherche Rapide (⌘K)
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Concepts, auteurs, fiches
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-match-auteurs"),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-rose-500/15 flex items-center justify-center shrink-0">
                      <Swords className="size-3.5 text-rose-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-rose-900 dark:text-rose-200">
                        Duels 1v1 Auteurs
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Matchs dialectiques et controverses
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-definitions"),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-indigo-500/10 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                      <ShieldCheck className="size-3.5 text-indigo-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-indigo-900 dark:text-indigo-200">
                        Coffre des Définitions
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Critères d'évaluation 18/20
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-fiche-poche", {
                          detail:
                            active && active.startsWith("pst")
                              ? { module: active }
                              : undefined,
                        }),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-500/10 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <Printer className="size-3.5 text-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200">
                        Fiche Mémo A4
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Synthèse imprimable recto-verso
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-speed-run"),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                      <Flame className="size-3.5 text-amber-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-amber-900 dark:text-amber-200">
                        Sprint Chrono 3 Min
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Flash cards rapides contre la montre
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(new CustomEvent("pst:open-schemas"));
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-cyan-500/10 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-cyan-500/15 flex items-center justify-center shrink-0">
                      <Layers className="size-3.5 text-cyan-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-cyan-900 dark:text-cyan-200">
                        11 Schémas SVG
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Matrices visuelles vectorielles
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-briefing-30s", {
                          detail:
                            active && active.startsWith("pst")
                              ? { module: active }
                              : undefined,
                        }),
                      );
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 transition-colors text-left"
                  >
                    <div className="size-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                      <Zap className="size-3.5 text-amber-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-amber-900 dark:text-amber-200">
                        Synthèse Tactique Flash 30s
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Briefing essentiel avant l'examen
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── VERSION DESKTOP (>= md) : DOUBLE ÉTAGE PLEIN ÉCRAN FLUIDE ─────── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="hidden md:flex flex-col gap-1.5 w-full">
          {/* ÉTAGE 1 : PILIERS PRINCIPAUX (PILOTAGE, PLANNING, 5 MODULES PST) + CONTRÔLES */}
          <div className="flex items-center justify-between gap-3 w-full">
            {/* Ruban des cours et planning plein format sur desktop avec scroll horizontal fluide */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
              {/* Raccourci Poste de Pilotage & Planning */}
              <Link
                href="/pst/"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
                  active === "hub"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                    : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
                }`}
                title="Poste de Pilotage PST (Hub central)"
              >
                <LayoutDashboard className="size-3.5 shrink-0" />
                <span>Pilotage</span>
              </Link>

              <Link
                href="/pst/planning/"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
                  active === "planning"
                    ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
                    : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
                }`}
                title="Planning officiel et séances"
              >
                <Calendar className="size-3.5 shrink-0 text-amber-500" />
                <span>Planning</span>
              </Link>

              {/* Séparateur vertical fin */}
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" />

              {/* Ateliers UE PST (106, 108, 120, 123, 124) */}
              {MODULE_IDS.map((id) => {
                const isCurrent = id === activeId;
                const pct = progressMap[id] ?? 0;
                const semesterStatus = getUnitSemesterStatus(`pst${id}`);
                const isDormant = semesterStatus.isDormant;

                return (
                  <Link
                    key={id}
                    href={`/pst/${id}/`}
                    title={
                      isDormant
                        ? `Atelier PST${id} (Semestre 2 · Rentrée ${semesterStatus.firstSessionLabel}) — ${pct}% maîtrisé`
                        : `Atelier PST${id} — ${pct}% des fiches/cartes maîtrisées`
                    }
                    className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 border active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                      isCurrent
                        ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30 scale-[1.02]"
                        : isDormant
                          ? "bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border-slate-200/50 dark:border-slate-800 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/60"
                          : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/90 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 leading-none">
                      <span
                        className={isDormant && !isCurrent ? "opacity-75" : ""}
                      >
                        PST{id}
                      </span>
                      {isDormant && !isCurrent ? (
                        <span
                          className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 leading-tight"
                          title="Semestre 2"
                        >
                          S2
                        </span>
                      ) : (
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
                      )}
                    </div>

                    {/* Micro barre de progression (1.5px) */}
                    <div className="w-full h-[2px] bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCurrent
                            ? "bg-white"
                            : isDormant
                              ? "bg-slate-400/50"
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
            </div>

            {/* Actions fixes à droite : Ponts Transversaux direct, Cnam & Theme */}
            <div className="shrink-0 flex items-center gap-1.5 pl-2 border-l border-slate-200/80 dark:border-slate-800">
              {/* Bouton Ponts Transversaux mis en avant */}
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("pst:open-ponts-transversaux"),
                  )
                }
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl border transition-all cursor-pointer active:scale-95 shrink-0 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 hover:from-amber-500/25 hover:to-indigo-500/25 text-amber-950 dark:text-amber-200 border-amber-500/30 shadow-2xs"
                title="Ponts Transversaux & Synergies Inter-PST (17 passerelles théoriques)"
              >
                <Sparkles className="size-3.5 text-amber-500 shrink-0" />
                <span className="hidden lg:inline">Ponts Transversaux</span>
                <span className="inline lg:hidden">Ponts</span>
                <span className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  17
                </span>
              </button>

              <CnamLink />
              <ThemeToggle />
            </div>
          </div>

          {/* ÉTAGE 2 : BANDEAU DES OUTILS & ATELIERS D'ENTRAÎNEMENT 18/20 */}
          <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/70 dark:border-slate-800/70 w-full overflow-x-auto no-scrollbar whitespace-nowrap text-xs py-0.5">
            {/* Recherche Globale ⌘K */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("pst:open-command-palette"),
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold bg-slate-500/10 text-slate-800 dark:text-slate-200 border border-slate-500/25 hover:bg-slate-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Recherche globale et raccourcis (⌘K)"
            >
              <Search className="size-3 text-slate-600 dark:text-slate-400 shrink-0" />
              <span>Recherche</span>
              <kbd className="font-mono text-[9px] px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-bold ml-0.5">
                ⌘K
              </kbd>
            </button>

            {/* Duels 1v1 Auteurs */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-rose-500/10 text-rose-900 dark:text-rose-200 border border-rose-500/25 hover:bg-rose-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Matchs dialectiques et controverses (1 vs 1)"
            >
              <Swords className="size-3 text-rose-500 shrink-0" />
              <span>Duels 1v1</span>
            </button>

            {/* Coffre des Définitions */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-definitions"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25 hover:bg-indigo-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Définitions exactes critères 18/20"
            >
              <ShieldCheck className="size-3 text-indigo-500 shrink-0" />
              <span>Définitions</span>
            </button>

            {/* Fiche de poche A4 */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("pst:open-fiche-poche", {
                    detail:
                      active && active.startsWith("pst")
                        ? { module: active }
                        : undefined,
                  }),
                )
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Mémo A4 imprimable recto-verso"
            >
              <Printer className="size-3 text-emerald-500 shrink-0" />
              <span>Mémo A4</span>
            </button>

            {/* Sprint Chrono 3 Min */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-speed-run"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Sprint Flash Cards en 3 minutes"
            >
              <Flame className="size-3 text-amber-500 shrink-0" />
              <span>Sprint 3min</span>
            </button>

            {/* 11 Schémas SVG */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-schemas"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-cyan-500/10 text-cyan-900 dark:text-cyan-200 border border-cyan-500/25 hover:bg-cyan-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="11 Matrices visuelles vectorielles mémorisables"
            >
              <Layers className="size-3 text-cyan-500 shrink-0" />
              <span>Schémas SVG</span>
            </button>

            {/* Détective des Pièges */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-detective"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/25 hover:bg-purple-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Identifier les confusions courantes d'examen"
            >
              <ShieldAlert className="size-3 text-purple-500 shrink-0" />
              <span>Pièges</span>
            </button>

            {/* Dissertation & Plans */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("pst:open-sujets-dissertation"),
                )
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25 hover:bg-indigo-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Générateur de problématiques et plans"
            >
              <GraduationCap className="size-3 text-indigo-500 shrink-0" />
              <span>Dissertation</span>
            </button>

            {/* Jeu de Rôle Clinique */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-roleplay"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-teal-500/10 text-teal-900 dark:text-teal-200 border border-teal-500/25 hover:bg-teal-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Simulateur de posture professionnelle & négociation"
            >
              <HeartHandshake className="size-3 text-teal-500 shrink-0" />
              <span>Jeu de Rôle</span>
            </button>

            {/* Quiz Audio */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-blind-test"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-violet-500/10 text-violet-900 dark:text-violet-200 border border-violet-500/25 hover:bg-violet-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Quiz sonore et écoute audio"
            >
              <Headphones className="size-3 text-violet-500 shrink-0" />
              <span>Audio</span>
            </button>

            {/* Frise Historique */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-chronologie"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Frise historique 1880-2026"
            >
              <History className="size-3 text-emerald-500 shrink-0" />
              <span>Frise</span>
            </button>

            {/* Palais de la Mémoire */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"))
              }
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/25 hover:bg-purple-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
              title="Méthode des loci (PST 106-108-123)"
            >
              <Compass className="size-3 text-purple-500 shrink-0" />
              <span>Palais</span>
            </button>

            {/* RNCP 7 */}
            <Link
              href="/pst/#pyramide"
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold transition-all border shrink-0 active:scale-95 bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
              title="Cursus RNCP 7 (Maquette pédagogique)"
            >
              <GraduationCap className="size-3 shrink-0" />
              <span>RNCP 7</span>
            </Link>

            {/* Synthèse Flash 30s */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("pst:open-briefing-30s", {
                    detail:
                      active && active.startsWith("pst")
                        ? { module: active }
                        : undefined,
                  }),
                );
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 hover:bg-amber-500/25 cursor-pointer transition-all shrink-0 active:scale-95 ml-auto"
              title="Synthèse Tactique Flash 30s"
            >
              <Zap className="size-3 text-amber-500 shrink-0" />
              <span>Synthèse 30s</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
