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
    <header className="sticky top-0 z-40 w-full pt-1 sm:pt-2 pb-1.5 bg-background/90 dark:bg-slate-950/90 backdrop-blur-md transition-all">
      <nav
        className="modules-nav relative flex items-center justify-between gap-1.5 p-1.5 sm:p-2 md:p-2.5 rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        {/* Conteneur fluide horizontal scrollable avec scroll doux et propre sur tous écrans */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none no-scrollbar w-full py-0.5 scroll-smooth pr-1 sm:pr-2">
        {/* Raccourci Poste de Pilotage & Planning en tête de ruban */}
        <Link
          href="/pst/"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "hub"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Poste de Pilotage PST"
        >
          <LayoutDashboard className="size-3.5 shrink-0" />
          <span>Pilotage</span>
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
                {/* Micro-indicateur d'état visuel */}
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

        {/* Séparateur vertical fin */}
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* Palette de Commandes Rapide ⌘K */}
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-500/10 text-slate-800 dark:text-slate-200 border border-slate-500/25 hover:bg-slate-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Palette de Commandes Globale (Raccourci : ⌘K ou Ctrl+K)"
        >
          <Search className="size-3.5 text-slate-600 dark:text-slate-400 shrink-0" />
          <span className="hidden sm:inline">Recherche</span>
          <kbd className="hidden md:inline font-mono text-[9px] px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-bold ml-0.5">⌘K</kbd>
        </button>

        {/* Dropdown Menu Outils d'Étude (évite que la barre s'étire à l'infini sur Desktop) */}
        <div ref={toolsRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setToolsOpen((prev) => !prev)}
            aria-expanded={toolsOpen}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer active:scale-95 ${
              toolsOpen
                ? "bg-amber-500 text-white border-amber-600 shadow-2xs"
                : "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/25 hover:bg-amber-500/20"
            }`}
            title="Outils & Ateliers d'Étude PST (Duels, Définitions, Dissert, Pièges...)"
          >
            <Sparkles className="size-3.5 text-amber-500 shrink-0" />
            <span>Outils d'Étude</span>
            <ChevronDown className={`size-3 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
          </button>

          {toolsOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 sm:w-80 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 animate-fadeIn grid grid-cols-1 gap-1 text-xs">
              <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                Ateliers d'Entraînement 18/20
              </div>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-rose-500/10 hover:text-rose-900 dark:hover:text-rose-200 transition-colors text-left"
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
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors text-left"
              >
                <ShieldCheck className="size-4 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold">Coffre des Définitions</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Définitions exactes critères 18/20</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(
                    new CustomEvent("pst:open-fiche-poche", {
                      detail: active && active.startsWith("pst") ? { module: active } : undefined,
                    }),
                  );
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors text-left"
              >
                <Printer className="size-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold">Mémo A4 Imprimable</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Fiche de poche recto-verso</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-speed-run"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-amber-500/10 hover:text-amber-900 dark:hover:text-amber-200 transition-colors text-left"
              >
                <Flame className="size-4 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold">Sprint Chrono 3 Min</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Flash cards en cadence rapide</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-detective"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-900 dark:hover:text-purple-200 transition-colors text-left"
              >
                <ShieldAlert className="size-4 text-purple-500 shrink-0" />
                <div>
                  <div className="font-bold">Détective des Pièges</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Identifier les confusions courantes</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-sujets-dissertation"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors text-left"
              >
                <GraduationCap className="size-4 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold">Dissertation & Plans</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Générateur de problématiques et plans</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-roleplay"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-teal-500/10 hover:text-teal-900 dark:hover:text-teal-200 transition-colors text-left"
              >
                <HeartHandshake className="size-4 text-teal-500 shrink-0" />
                <div>
                  <div className="font-bold">Jeu de Rôle Entretien</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Simulateur d'intervention & négociation</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-schemas"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-900 dark:hover:text-cyan-200 transition-colors text-left"
              >
                <Layers className="size-4 text-cyan-500 shrink-0" />
                <div>
                  <div className="font-bold">Schémas Vectoriels SVG</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Matrices visuelles mémorisables</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-blind-test"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-violet-500/10 hover:text-violet-900 dark:hover:text-violet-200 transition-colors text-left"
              >
                <Headphones className="size-4 text-violet-500 shrink-0" />
                <div>
                  <div className="font-bold">Écoute Audio</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Quiz sonore et voix des théoriciens</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-chronologie"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors text-left"
              >
                <History className="size-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold">Frise Historique</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Généalogie 1880-2026</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToolsOpen(false);
                  window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"));
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-900 dark:hover:text-purple-200 transition-colors text-left"
              >
                <Compass className="size-4 text-purple-500 shrink-0" />
                <div>
                  <div className="font-bold">Palais de la Mémoire</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Méthode des loci (106, 108, 123)</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Outils secondaires rapides : RNCP 7, 30s */}
        <Link
          href="/pst/#pyramide"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "pyramide"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Cursus RNCP 7 (Maquette pédagogique)"
        >
          <GraduationCap className="size-3.5 shrink-0" />
          <span>RNCP 7</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("pst:open-briefing-30s", {
                detail: active && active.startsWith("pst") ? { module: active } : undefined,
              }),
            );
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Synthèse Tactique 30s"
        >
          <Zap className="size-3.5 text-amber-500 shrink-0" />
          <span>Synthèse 30s</span>
        </button>

        <div className="shrink-0 flex items-center gap-1.5 ml-auto">
          <AnneauxRevisionPst />
          <CnamLink />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>
  );
}
