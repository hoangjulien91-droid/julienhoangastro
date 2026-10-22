"use client";

import { useEffect, useState, useRef, useMemo } from "react";
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
  X,
} from "lucide-react";
import { CnamLink, ThemeToggle } from "./ThemeToggle";
import {
  MODULES as HUB_MODULES,
  moduleStats,
  INDEX,
} from "@/lib/pst/hub-stats";
import {
  getUnitSemesterStatus,
  getNextEvent,
  formatShortFrDate,
} from "@/lib/pst/planning-stats";
import { MODULE_LABELS } from "@/lib/pst/data/ponts";

const MODULE_IDS = ["106", "108", "120", "123", "124"] as const;

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

const COLOR_CLASSES: Record<string, string> = {
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  indigo: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  cyan: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  purple: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  teal: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
};

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  // Mobile & Desktop dropdown states
  const [mobilePstOpen, setMobilePstOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [desktopToolsOpen, setDesktopToolsOpen] = useState(false);

  const mobilePstRef = useRef<HTMLDivElement>(null);
  const mobileToolsRef = useRef<HTMLDivElement>(null);
  const desktopToolsRef = useRef<HTMLDivElement>(null);

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
    if (!mobilePstOpen && !mobileToolsOpen && !desktopToolsOpen) return;

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
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobilePstOpen, mobileToolsOpen, desktopToolsOpen]);

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

  const toolCategories = useMemo(
    () => [
      {
        name: "Passerelles & Dialectique",
        tools: [
          {
            id: "ponts",
            name: "Ponts Transversaux Inter-PST",
            badge: "17 Passerelles",
            desc: "Liens conceptuels, synergies et matrice des 7 écoles",
            icon: Sparkles,
            color: "amber",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-ponts-transversaux"),
              ),
          },
          {
            id: "match",
            name: "Duels 1v1 Auteurs",
            badge: "Dialectique",
            desc: "Matchs théoriques, controverses & synthèses d'examen",
            icon: Swords,
            color: "rose",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-match-auteurs")),
          },
        ],
      },
      {
        name: "Méthodologie & Copie 18/20",
        tools: [
          {
            id: "dissertation",
            name: "Dissertation & Plans 18/20",
            badge: "Plans Types",
            desc: "Problématiques ciselées, plans en 2 parties & citations",
            icon: GraduationCap,
            color: "indigo",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-sujets-dissertation"),
              ),
          },
          {
            id: "definitions",
            name: "Coffre des Définitions Clés",
            badge: "Critères 18/20",
            desc: "Définitions canoniques exactes au mot près",
            icon: ShieldCheck,
            color: "blue",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-definitions")),
          },
          {
            id: "schemas",
            name: "11 Schémas SVG Vectoriels",
            badge: "Mémoire Visuelle",
            desc: "Matrices visuelles mémorisables à redessiner",
            icon: Layers,
            color: "cyan",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-schemas")),
          },
          {
            id: "pieges",
            name: "Détective des Pièges",
            badge: "Anti-Faute",
            desc: "Identifier les confusions courantes d'examen",
            icon: ShieldAlert,
            color: "purple",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-detective")),
          },
          {
            id: "fiche-poche",
            name: "Fiche Mémo A4 Imprimable",
            badge: "Synthèse",
            desc: "Synthèse recto-verso prête à imprimer",
            icon: Printer,
            color: "emerald",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-fiche-poche", {
                  detail:
                    active && active.startsWith("pst")
                      ? { module: active }
                      : undefined,
                }),
              ),
          },
        ],
      },
      {
        name: "Entraînement & Mémoire",
        tools: [
          {
            id: "speed-run",
            name: "Sprint Chrono 3 Min",
            badge: "Mode Réflexe",
            desc: "Flashcards rapides sous pression du chrono",
            icon: Flame,
            color: "amber",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-speed-run")),
          },
          {
            id: "roleplay",
            name: "Jeu de Rôle Clinique",
            badge: "Posture",
            desc: "Simulateur de posture professionnelle & négociation",
            icon: HeartHandshake,
            color: "teal",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-roleplay")),
          },
          {
            id: "blind-test",
            name: "Quiz Audio & Citations",
            badge: "Écoute",
            desc: "Quiz sonore et reconnaissance de concepts",
            icon: Headphones,
            color: "violet",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-blind-test")),
          },
          {
            id: "chronologie",
            name: "Frise Historique (1880-2026)",
            badge: "Chronologie",
            desc: "Genèse des écoles de psychologie du travail",
            icon: History,
            color: "emerald",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-chronologie")),
          },
          {
            id: "palais-memoire",
            name: "Palais de la Mémoire",
            badge: "Loci Tri-Module",
            desc: "Ancrage spatial tri-module (PST 106-108-123)",
            icon: Compass,
            color: "purple",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-palais-memoire")),
          },
          {
            id: "briefing-30s",
            name: "Synthèse Flash 30s",
            badge: "Express",
            desc: "Briefing d'urgence avant d'entrer en salle",
            icon: Zap,
            color: "amber",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-briefing-30s", {
                  detail:
                    active && active.startsWith("pst")
                      ? { module: active }
                      : undefined,
                }),
              ),
          },
        ],
      },
    ],
    [active],
  );

  const renderToolsContent = (onClose: () => void) => (
    <div className="space-y-3">
      <div className="px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-6 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 truncate">
            Ateliers & Outils 18/20
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
            12 Ateliers
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer le menu"
            title="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {toolCategories.map((cat) => (
        <div key={cat.name} className="space-y-1">
          <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {cat.name}
          </div>
          <div className="space-y-0.5">
            {cat.tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    tool.action();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left group cursor-pointer active:scale-98"
                >
                  <div
                    className={`size-7 rounded-lg ${COLOR_CLASSES[tool.color] ?? "bg-slate-500/15 text-slate-500"} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate text-xs">
                        {tool.name}
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                        {tool.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 truncate">
                      {tool.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full pt-1 sm:pt-2 pb-1.5 bg-transparent transition-all">
      <nav
        className="relative p-1.5 sm:p-2 md:py-2 md:px-3 rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── VERSION MOBILE (< md) : 1 SEULE LIGNE FLUIDE ET ULTRA-COMPACTE ── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex md:hidden items-center justify-between gap-1 sm:gap-1.5 w-full">
          {/* Bouton Pilotage compact */}
          <Link
            href="/pst/"
            className={`size-9 rounded-xl flex items-center justify-center border transition-all active:scale-95 shrink-0 ${
              active === "hub"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100"
            }`}
            title="Poste de Pilotage PST (Hub central)"
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
                        onClick={() => {
                          if (isCurrent) setMobilePstOpen(false);
                        }}
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

                  <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-[11px]">
                    <Link
                      href="/pst/#pyramide"
                      onClick={() => setMobilePstOpen(false)}
                      className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <GraduationCap className="size-3.5 text-indigo-500" />
                      <span>Maquette RNCP 7</span>
                    </Link>
                    <a
                      href="https://lecnam.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <span>Espace ENF ↗</span>
                    </a>
                  </div>
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
            >
              <Sparkles
                className={`size-4 shrink-0 transition-colors ${
                  mobileToolsOpen ? "text-white" : "text-amber-500"
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
                  {renderToolsContent(() => setMobileToolsOpen(false))}
                </div>
              </>
            )}
          </div>

          {/* Bouton Toggle Thème */}
          <ThemeToggle />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── VERSION DESKTOP (>= md) : LIGNE UNIQUE ULTRA-ÉPURÉE & ÉLÉGANTE ── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="hidden md:flex items-center justify-between gap-2 lg:gap-3 w-full">
          {/* Gauche : Cursus PST (Pilotage, Planning, 5 Modules) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Raccourci Poste de Pilotage */}
            <Link
              href="/pst/"
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
                active === "hub"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                  : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
              }`}
              title="Poste de Pilotage PST (Hub central)"
            >
              <LayoutDashboard className="size-3.5 shrink-0" />
              <span className="hidden xl:inline">Pilotage</span>
            </Link>

            {/* Raccourci Planning */}
            <Link
              href="/pst/planning/"
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
                active === "planning"
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
                  : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80"
              }`}
              title="Planning officiel et séances de cours"
            >
              <Calendar className="size-3.5 shrink-0 text-amber-500" />
              <span className="hidden xl:inline">Planning</span>
            </Link>

            {/* Séparateur vertical fin */}
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

            {/* Les 5 Ateliers UE PST (106, 108, 120, 123, 124) */}
            <div className="flex items-center gap-1 shrink-0">
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
                    className={`text-xs px-2 lg:px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 border active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
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
          </div>

          {/* Centre : Barre de Recherche Rapide (Notion / Linear style) */}
          <div className="flex-1 max-w-[200px] lg:max-w-[240px] xl:max-w-[300px] mx-1">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("pst:open-command-palette"),
                )
              }
              className="w-full flex items-center justify-between gap-2 px-2.5 lg:px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 text-xs transition-all shadow-2xs group cursor-pointer active:scale-98"
              title="Recherche instantanée notions, auteurs, fiches (⌘K)"
            >
              <div className="flex items-center gap-2 min-w-0 truncate">
                <Search className="size-3.5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
                <span className="truncate text-[11px] lg:text-xs">
                  Rechercher...
                </span>
              </div>
              <kbd className="hidden sm:inline font-mono text-[9px] px-1.5 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Droite : Prochaine séance, Menu Boîte 18/20, Cnam & Thème */}
          <div className="shrink-0 flex items-center gap-1.5">
            {/* Prochaine séance Cnam Bègles si disponible */}
            {nextEvent && (
              <Link
                href="/pst/planning/"
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/25 transition-all shrink-0 active:scale-95"
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
                <Sparkles
                  className={`size-3.5 shrink-0 transition-colors ${
                    desktopToolsOpen ? "text-white" : "text-amber-500"
                  }`}
                />
                <span className="hidden sm:inline">Outils 18/20</span>
                <span className="sm:hidden">18/20</span>
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
                  {renderToolsContent(() => setDesktopToolsOpen(false))}
                </div>
              )}
            </div>

            {/* Lien Cnam ENF & Toggle Thème Jour/Nuit */}
            <CnamLink />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
