"use client";

import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  BookOpen,
  Target,
  GraduationCap,
  Grid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
  /** Famille d'onglets (libellé affiché comme séparateur dans la barre). */
  group?: string;
}

/**
 * Familles d'onglets communes à tous les modules.
 */
const TAB_GROUP_ORDER = ["Suivi", "Apprendre", "S'entraîner", "Examen"];

const GROUP_BY_ID: Record<string, string> = {
  accueil: "Suivi",
  parcours: "Suivi",
  errors: "Suivi",
  outils: "Suivi",
  fiches: "Apprendre",
  lexique: "Apprendre",
  frise: "Apprendre",
  mindmap: "Apprendre",
  recits: "Apprendre",
  debats: "Apprendre",
  bonus: "Apprendre",
  cartes: "S'entraîner",
  qcm: "S'entraîner",
  qui: "S'entraîner",
  pieges: "S'entraîner",
  distinguer: "S'entraîner",
  cloze: "S'entraîner",
  feynman: "S'entraîner",
  simulateur: "S'entraîner",
  cas: "S'entraîner",
  protocole: "S'entraîner",
  redac: "Examen",
  atelier: "Examen",
  examen: "Examen",
  exam: "Examen",
  antiseche: "Examen",
  sosie: "Examen",
  buhler: "Apprendre",
  thermo: "S'entraîner",
  deonto: "Examen",
  tribunal: "Examen",
  audit: "Examen",
};

/**
 * Annote chaque onglet avec sa famille et regroupe les familles dans un
 * ordre pédagogique stable.
 */
export function groupTabs(tabs: TabDef[]): TabDef[] {
  const annotated = tabs.map((t) => ({
    ...t,
    group: t.group ?? GROUP_BY_ID[t.id] ?? "S'entraîner",
  }));
  return annotated
    .slice()
    .sort(
      (a, b) =>
        TAB_GROUP_ORDER.indexOf(a.group) - TAB_GROUP_ORDER.indexOf(b.group),
    );
}

interface TabsShellProps {
  tabs: TabDef[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabsShell({ tabs, activeTab, onChange }: TabsShellProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navTopRef = useRef<HTMLDivElement | null>(null);
  const [selectedPole, setSelectedPole] = useState<string>("all");

  // Lazy keep-alive : un panel est rendu à sa première activation puis conservé monté
  const visitedRef = useRef<Set<string>>(new Set());
  visitedRef.current.add(activeTab);

  const pendingHashRef = useRef<string | null>(null);

  // Adoption du hash initial (#cartes → onglet Cartes)
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (
      fromHash &&
      fromHash !== activeTab &&
      tabs.some((t) => t.id === fromHash)
    ) {
      pendingHashRef.current = fromHash;
      onChange(fromHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation par hash après le chargement (liens internes, historique)
  useEffect(() => {
    function onHashChange() {
      const h = window.location.hash.slice(1);
      if (h && tabs.some((t) => t.id === h)) {
        pendingHashRef.current = h;
        onChange(h);
      }
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  });

  // Miroir de l'onglet actif dans le hash
  useEffect(() => {
    if (pendingHashRef.current) {
      if (pendingHashRef.current !== activeTab) return;
      pendingHashRef.current = null;
    }
    if (window.location.hash.slice(1) !== activeTab) {
      window.history.replaceState(null, "", `#${activeTab}`);
    }
  }, [activeTab]);

  // Sur mobile, garde l'onglet actif visible
  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [activeTab]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, idx: number) {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = tabs.length - 1;
    if (nextIdx !== null) {
      e.preventDefault();
      const next = tabs[nextIdx];
      if (next) {
        onChange(next.id);
        tabRefs.current[next.id]?.focus();
      }
    }
  }

  const poleCounts = useMemo(() => {
    let apprendre = 0;
    let entrainer = 0;
    let examen = 0;
    for (const t of tabs) {
      const grp = t.group ?? GROUP_BY_ID[t.id];
      if (grp === "Apprendre" || grp === "Suivi") apprendre++;
      else if (grp === "S'entraîner") entrainer++;
      else if (grp === "Examen") examen++;
    }
    return { apprendre, entrainer, examen };
  }, [tabs]);

  const filteredTabs =
    selectedPole === "all"
      ? tabs
      : tabs.filter((t) => {
          const grp = t.group ?? GROUP_BY_ID[t.id];
          if (selectedPole === "Apprendre")
            return grp === "Apprendre" || grp === "Suivi";
          if (selectedPole === "S'entraîner") return grp === "S'entraîner";
          if (selectedPole === "Examen") return grp === "Examen";
          return true;
        });

  const activeFullIdx = tabs.findIndex((t) => t.id === activeTab);
  const prevTab = activeFullIdx > 0 ? tabs[activeFullIdx - 1] : null;
  const nextTab =
    activeFullIdx >= 0 && activeFullIdx < tabs.length - 1
      ? tabs[activeFullIdx + 1]
      : null;

  function selectTabWithFeedback(id: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(6);
      } catch {
        // ignore
      }
    }
    onChange(id);
  }

  function jumpToTab(id: string) {
    selectTabWithFeedback(id);
    navTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div ref={navTopRef}>
      {/* Segmented Control macOS / iOS par Pôles Pédagogiques */}
      <div className="mb-4 overflow-x-auto pb-1 scrollbar-none">
        <div
          role="group"
          aria-label="Filtrer par pôle pédagogique"
          className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-300/60 dark:border-slate-700/60 text-xs font-semibold shadow-inner"
        >
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedPole("all");
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              selectedPole === "all"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Grid className="size-3.5 text-amber-600" />
            <span>Toutes les rubriques ({tabs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedPole("Apprendre");
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              selectedPole === "Apprendre"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="size-3.5 text-amber-600" />
            <span>1. Assimiler ({poleCounts.apprendre})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedPole("S'entraîner");
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              selectedPole === "S'entraîner"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Target className="size-3.5 text-amber-600" />
            <span>2. S&apos;entraîner ({poleCounts.entrainer})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedPole("Examen");
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              selectedPole === "Examen"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="size-3.5 text-amber-600" />
            <span>3. Examen ({poleCounts.examen})</span>
          </button>
        </div>
      </div>

      {/* Navigation mobile iOS : ruban horizontal tactile + sélecteur rapide */}
      <div className="mobile-tab-select-wrap">
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1.5"
          role="tablist"
          aria-label="Accès rapide mobile aux sections"
        >
          {filteredTabs.map((t) => {
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectTabWithFeedback(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                    : "bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <select
          className="mobile-tab-select"
          value={activeTab}
          onChange={(e) => selectTabWithFeedback(e.target.value)}
          aria-label="Sélectionner une section"
        >
          {filteredTabs.map((t) => (
            <option key={t.id} value={t.id}>
              {t.group ? `${t.group} — ` : ""}
              {t.label.replace(" ◆", "").replace(" ✦", "")}
            </option>
          ))}
        </select>
      </div>

      <nav className="tabs" role="tablist" aria-label="Sections du module">
        {filteredTabs.map((t, idx) => {
          const prev = filteredTabs[idx - 1];
          const showGroupLabel =
            selectedPole === "all" &&
            Boolean(t.group) &&
            t.group !== prev?.group;
          return (
            <Fragment key={t.id}>
              {showGroupLabel && idx > 0 && (
                <span className="tabbreak" aria-hidden="true" />
              )}
              {showGroupLabel && (
                <span className="tabgroup" aria-hidden="true">
                  {t.group}
                </span>
              )}
              <button
                ref={(el) => {
                  tabRefs.current[t.id] = el;
                }}
                id={`tab-${t.id}`}
                className="tab"
                role="tab"
                aria-selected={activeTab === t.id}
                aria-controls={t.id}
                tabIndex={activeTab === t.id ? 0 : -1}
                onClick={() => selectTabWithFeedback(t.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                {t.label}
              </button>
            </Fragment>
          );
        })}
      </nav>
      {tabs.map((t) => (
        <section
          key={t.id}
          id={t.id}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          className={`panel${activeTab === t.id ? " on" : ""}`}
        >
          {visitedRef.current.has(t.id) ? t.content : null}
        </section>
      ))}

      {/* Barre de navigation séquentielle en pied de section */}
      {tabs.length > 1 && activeFullIdx !== -1 && (
        <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          {prevTab ? (
            <button
              type="button"
              onClick={() => jumpToTab(prevTab.id)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-amber-500/50 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <ChevronLeft className="size-4 text-amber-600" />
              <span>
                {prevTab.label.replace(" ◆", "").replace(" ✦", "")}
              </span>
            </button>
          ) : (
            <div />
          )}

          <span className="text-[11px] font-mono text-slate-400">
            Section {activeFullIdx + 1} / {tabs.length}
          </span>

          {nextTab ? (
            <button
              type="button"
              onClick={() => jumpToTab(nextTab.id)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            >
              <span>
                {nextTab.label.replace(" ◆", "").replace(" ✦", "")}
              </span>
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
