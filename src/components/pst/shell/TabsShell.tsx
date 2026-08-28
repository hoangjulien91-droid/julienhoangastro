"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { BookOpen, Target, GraduationCap, Grid } from "lucide-react";

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

  return (
    <>
      {/* Barre de filtrage par Pôles Pédagogiques (S-Tier Architecture) */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline">
          Pôles :
        </span>
        <button
          onClick={() => setSelectedPole("all")}
          className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
            selectedPole === "all"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-500/50"
          }`}
        >
          <Grid className="size-3.5" />
          <span>Tous ({tabs.length})</span>
        </button>
        <button
          onClick={() => setSelectedPole("Apprendre")}
          className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
            selectedPole === "Apprendre"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-500/50"
          }`}
        >
          <BookOpen className="size-3.5" />
          <span>📖 Assimiler</span>
        </button>
        <button
          onClick={() => setSelectedPole("S'entraîner")}
          className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
            selectedPole === "S'entraîner"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-500/50"
          }`}
        >
          <Target className="size-3.5" />
          <span>🎯 S'entraîner</span>
        </button>
        <button
          onClick={() => setSelectedPole("Examen")}
          className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
            selectedPole === "Examen"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-500/50"
          }`}
        >
          <GraduationCap className="size-3.5" />
          <span>🏛️ Maîtriser & Examen</span>
        </button>
      </div>

      <div className="mobile-tab-select-wrap">
        <select
          className="mobile-tab-select"
          value={activeTab}
          onChange={(e) => onChange(e.target.value)}
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
                onClick={() => onChange(t.id)}
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
    </>
  );
}
