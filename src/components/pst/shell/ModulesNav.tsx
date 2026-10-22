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
} from "lucide-react";
import { CnamLink, ThemeToggle } from "./ThemeToggle";
import { AnneauxRevisionPst } from "@/components/pst/study-tools/AnneauxRevisionPst";
import { MODULES as HUB_MODULES, moduleStats } from "@/lib/pst/hub-stats";
import { getUnitSemesterStatus } from "@/lib/pst/planning-stats";

const MODULE_IDS = ["106", "108", "120", "123", "124"] as const;

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    if (toolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [toolsOpen]);

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
    return () => window.removeEventListener("pst:storage-updated", refreshProgress);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full pt-1 sm:pt-2 pb-1.5 bg-transparent transition-all">
      <nav
        className="modules-nav flex flex-col gap-1.5 p-1.5 sm:p-2 rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        {/* ── ÉTAGE 1 : NAVIGATION PRINCIPALE (Pilotage, Planning, 5 Modules PST & Contrôles) ── */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 w-full">
          {/* Ruban des cours et planning (scrollable horizontalement sur mobile, plein format sur desktop) */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none no-scrollbar flex-1 min-w-0 py-0.5 scroll-smooth">
            {/* Raccourci Poste de Pilotage & Planning */}
            <Link
              href="/pst/"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
                active === "hub"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                  : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
              }`}
              title="Poste de Pilotage PST"
            >
              <LayoutDashboard className="size-3.5 shrink-0" />
              <span>Pilotage</span>
            </Link>

            <Link
              href="/pst/planning/"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
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
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

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
                  <div className="flex items-center gap-1 leading-none">
                    <span className={isDormant && !isCurrent ? "opacity-75" : ""}>PST{id}</span>
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

            {/* Sur Mobile uniquement (< md), petit bouton déroulant pour afficher les outils sans encombrer */}
            <div ref={toolsRef} className="md:hidden relative shrink-0">
              <button
                type="button"
                onClick={() => setToolsOpen((prev) => !prev)}
                aria-expanded={toolsOpen}
                className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer active:scale-95 ${
                  toolsOpen
                    ? "bg-amber-500 text-white border-amber-600 shadow-2xs"
                    : "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/25 hover:bg-amber-500/20"
                }`}
                title="Ateliers et outils d'étude"
              >
                <Sparkles className="size-3.5 text-amber-500 shrink-0" />
                <span>Outils</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              {toolsOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 animate-fadeIn grid grid-cols-1 gap-1 text-xs">
                  <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                    Ateliers d'Entraînement 18/20
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-500/10 transition-colors text-left"
                  >
                    <Search className="size-4 text-slate-500 shrink-0" />
                    <div className="font-bold">Palette de Recherche (⌘K)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"));
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <Swords className="size-4 text-rose-500 shrink-0" />
                    <div>
                      <div className="font-bold">Duels 1v1 Auteurs</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Matchs dialectiques et controverses</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      window.dispatchEvent(new CustomEvent("pst:open-definitions"));
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 transition-colors text-left"
                  >
                    <ShieldCheck className="size-4 text-indigo-500 shrink-0" />
                    <div>
                      <div className="font-bold">Coffre des Définitions</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Critères 18/20</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      window.dispatchEvent(new CustomEvent("pst:open-speed-run"));
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-amber-500/10 transition-colors text-left"
                  >
                    <Flame className="size-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-bold">Sprint Chrono 3 Min</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Flash cards rapides</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      window.dispatchEvent(new CustomEvent("pst:open-schemas"));
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-cyan-500/10 transition-colors text-left"
                  >
                    <Layers className="size-4 text-cyan-500 shrink-0" />
                    <div className="font-bold">11 Schémas Vectoriels SVG</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("pst:open-briefing-30s", {
                          detail: active && active.startsWith("pst") ? { module: active } : undefined,
                        }),
                      );
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-amber-900 dark:text-amber-200 hover:bg-amber-500/10 transition-colors text-left font-bold"
                  >
                    <Zap className="size-4 text-amber-500 shrink-0" />
                    <span>Synthèse Flash 30s</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Actions fixes à droite : anneaux de progression, lien ENF, et sélecteur de thème */}
          <div className="shrink-0 flex items-center gap-1.5 pl-1.5 border-l border-slate-200/80 dark:border-slate-800">
            <AnneauxRevisionPst />
            <CnamLink />
            <ThemeToggle />
          </div>
        </div>

        {/* ── ÉTAGE 2 : BANDEAU DES OUTILS & ATELIERS ACTIFS (Visible sur Desktop dès md: >= 768px) ── */}
        <div className="hidden md:flex items-center gap-1.5 pt-1.5 border-t border-slate-200/70 dark:border-slate-800/70 flex-wrap text-xs">
          {/* Recherche Globale ⌘K */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-command-palette"))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold bg-slate-500/10 text-slate-800 dark:text-slate-200 border border-slate-500/25 hover:bg-slate-500/20 cursor-pointer transition-all active:scale-95"
            title="Recherche globale et raccourcis (⌘K)"
          >
            <Search className="size-3 text-slate-600 dark:text-slate-400 shrink-0" />
            <span>Recherche</span>
            <kbd className="font-mono text-[9px] px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-bold ml-0.5">⌘K</kbd>
          </button>

          {/* Duels 1v1 Auteurs */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-rose-500/10 text-rose-900 dark:text-rose-200 border border-rose-500/25 hover:bg-rose-500/20 cursor-pointer transition-all active:scale-95"
            title="Matchs dialectiques et controverses (1 vs 1)"
          >
            <Swords className="size-3 text-rose-500 shrink-0" />
            <span>Duels 1v1</span>
          </button>

          {/* Coffre des Définitions */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-definitions"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25 hover:bg-indigo-500/20 cursor-pointer transition-all active:scale-95"
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
                  detail: active && active.startsWith("pst") ? { module: active } : undefined,
                }),
              )
            }
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer transition-all active:scale-95"
            title="Mémo A4 imprimable recto-verso"
          >
            <Printer className="size-3 text-emerald-500 shrink-0" />
            <span>Mémo A4</span>
          </button>

          {/* Sprint Chrono 3 Min */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-speed-run"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all active:scale-95"
            title="Sprint Flash Cards en 3 minutes"
          >
            <Flame className="size-3 text-amber-500 shrink-0" />
            <span>Sprint 3min</span>
          </button>

          {/* Détective des Pièges */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-detective"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/25 hover:bg-purple-500/20 cursor-pointer transition-all active:scale-95"
            title="Identifier les confusions courantes d'examen"
          >
            <ShieldAlert className="size-3 text-purple-500 shrink-0" />
            <span>Pièges</span>
          </button>

          {/* Dissertation & Plans */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-sujets-dissertation"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25 hover:bg-indigo-500/20 cursor-pointer transition-all active:scale-95"
            title="Générateur de problématiques et plans"
          >
            <GraduationCap className="size-3 text-indigo-500 shrink-0" />
            <span>Dissertation</span>
          </button>

          {/* Jeu de Rôle Clinique */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-roleplay"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-teal-500/10 text-teal-900 dark:text-teal-200 border border-teal-500/25 hover:bg-teal-500/20 cursor-pointer transition-all active:scale-95"
            title="Simulateur de posture professionnelle & négociation"
          >
            <HeartHandshake className="size-3 text-teal-500 shrink-0" />
            <span>Jeu de Rôle</span>
          </button>

          {/* 11 Schémas SVG */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-schemas"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-cyan-500/10 text-cyan-900 dark:text-cyan-200 border border-cyan-500/25 hover:bg-cyan-500/20 cursor-pointer transition-all active:scale-95"
            title="11 Matrices visuelles vectorielles mémorisables"
          >
            <Layers className="size-3 text-cyan-500 shrink-0" />
            <span>Schémas SVG</span>
          </button>

          {/* Quiz Audio */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-blind-test"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-violet-500/10 text-violet-900 dark:text-violet-200 border border-violet-500/25 hover:bg-violet-500/20 cursor-pointer transition-all active:scale-95"
            title="Quiz sonore et écoute audio"
          >
            <Headphones className="size-3 text-violet-500 shrink-0" />
            <span>Audio</span>
          </button>

          {/* Frise Historique */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-chronologie"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer transition-all active:scale-95"
            title="Frise historique 1880-2026"
          >
            <History className="size-3 text-emerald-500 shrink-0" />
            <span>Frise</span>
          </button>

          {/* Palais de la Mémoire */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"))}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/25 hover:bg-purple-500/20 cursor-pointer transition-all active:scale-95"
            title="Méthode des loci (PST 106-108-123)"
          >
            <Compass className="size-3 text-purple-500 shrink-0" />
            <span>Palais</span>
          </button>

          {/* RNCP 7 */}
          <Link
            href="/pst/#pyramide"
            className={`flex items-center gap-1 px-2 py-1 rounded-xl font-bold transition-all border active:scale-95 ${
              active === "pyramide"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
            }`}
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
                  detail: active && active.startsWith("pst") ? { module: active } : undefined,
                }),
              );
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-xl font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 hover:bg-amber-500/25 cursor-pointer transition-all ml-auto active:scale-95"
            title="Synthèse Tactique Flash 30s"
          >
            <Zap className="size-3 text-amber-500 shrink-0" />
            <span>Synthèse 30s</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
