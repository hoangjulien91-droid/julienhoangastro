"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  Target,
  GraduationCap,
  BarChart2,
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
  buhler: "Apprendre",

  cartes: "S'entraîner",
  qcm: "S'entraîner",
  qui: "S'entraîner",
  pieges: "S'entraîner",
  distinguer: "S'entraîner",
  cloze: "S'entraîner",
  feynman: "S'entraîner",
  simulateur: "S'entraîner",
  thermo: "S'entraîner",

  redac: "Examen",
  cas: "Examen",
  protocole: "Examen",
  atelier: "Examen",
  examen: "Examen",
  exam: "Examen",
  antiseche: "Examen",
  sosie: "Examen",
  deonto: "Examen",
  tribunal: "Examen",
  audit: "Examen",
};

export interface PillarDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PILLARS: PillarDef[] = [
  { id: "Suivi", label: "Suivi & Cadre", icon: BarChart2 },
  { id: "Apprendre", label: "Leçons & Fiches", icon: BookOpen },
  { id: "S'entraîner", label: "Quiz & Entraînement", icon: Target },
  { id: "Examen", label: "Épreuve & Examen", icon: GraduationCap },
];

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

  // Détermination du groupe actif
  const currentGroup = useMemo(() => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab?.group ?? GROUP_BY_ID[activeTab] ?? "Apprendre";
  }, [tabs, activeTab]);

  const [selectedPillar, setSelectedPillar] = useState<string>(currentGroup);

  // Synchronisation du pilier sélectionné lorsque activeTab change
  useEffect(() => {
    setSelectedPillar(currentGroup);
  }, [currentGroup]);

  // Lazy keep-alive : un panel est rendu à sa première activation puis conservé monté
  const visitedRef = useRef<Set<string>>(new Set());
  visitedRef.current.add(activeTab);

  const [visitedSet, setVisitedSet] = useState<Set<string>>(
    new Set([activeTab]),
  );
  useEffect(() => {
    setVisitedSet((prev) => {
      if (prev.has(activeTab)) return prev;
      const next = new Set(prev);
      next.add(activeTab);
      return next;
    });
  }, [activeTab]);

  const pendingHashRef = useRef<string | null>(null);

  // Adoption du hash initial (#cartes) ou query param (?tab=cartes)
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("tab") ?? "";
    const targetTab = fromHash || fromQuery;
    if (
      targetTab &&
      targetTab !== activeTab &&
      tabs.some((t) => t.id === targetTab)
    ) {
      pendingHashRef.current = targetTab;
      onChange(targetTab);
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

  // Sur mobile, garde l'onglet actif visible dans la barre de sous-onglets sans sauter la page verticalement
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const elLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;
    const parentScroll = parent.scrollLeft;
    const parentWidth = parent.clientWidth;
    if (elLeft < parentScroll) {
      parent.scrollTo({ left: Math.max(0, elLeft - 12), behavior: "smooth" });
    } else if (elLeft + elWidth > parentScroll + parentWidth) {
      parent.scrollTo({
        left: elLeft + elWidth - parentWidth + 12,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // Onglets appartenant au pilier actif
  const pillarTabs = useMemo(() => {
    const filtered = tabs.filter(
      (t) => (t.group ?? GROUP_BY_ID[t.id]) === selectedPillar,
    );
    return filtered.length > 0 ? filtered : tabs;
  }, [tabs, selectedPillar]);

  function handlePillarChange(pillarId: string) {
    playClickSound();
    setSelectedPillar(pillarId);
    // Sélectionne le premier onglet disponible de ce pilier s'il n'est pas déjà actif
    const firstInPillar = tabs.find(
      (t) => (t.group ?? GROUP_BY_ID[t.id]) === pillarId,
    );
    if (firstInPillar && firstInPillar.id !== activeTab) {
      onChange(firstInPillar.id);
    }
  }

  function selectTabWithFeedback(id: string) {
    playClickSound();
    onChange(id);
  }

  function jumpToTab(id: string) {
    selectTabWithFeedback(id);
    navTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const activeFullIdx = tabs.findIndex((t) => t.id === activeTab);
  const prevTab = activeFullIdx > 0 ? tabs[activeFullIdx - 1] : null;
  const nextTab =
    activeFullIdx >= 0 && activeFullIdx < tabs.length - 1
      ? tabs[activeFullIdx + 1]
      : null;

  const idxInPillar = pillarTabs.findIndex((t) => t.id === activeTab);

  return (
    <div ref={navTopRef} className="space-y-4">
      {/* ========================================================================= */}
      {/* 1. SÉLECTEUR DES 4 PILIERS APPLE (Level 1: Segmented Control Minimaliste)   */}
      {/* ========================================================================= */}
      <div className="flex justify-center sm:justify-start overflow-x-auto pb-1 scrollbar-none">
        <div
          role="group"
          aria-label="Piliers pédagogiques du module"
          className="inline-flex p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 backdrop-blur-md shadow-2xs text-xs font-bold"
        >
          {PILLARS.map((p) => {
            const isPillarActive = selectedPillar === p.id;
            const Icon = p.icon;
            // Compte combien d'onglets ce module possède dans ce pilier
            const pillarTabsList = tabs.filter(
              (t) => (t.group ?? GROUP_BY_ID[t.id]) === p.id,
            );
            const count = pillarTabsList.length;
            if (count === 0) return null;

            const visitedCount = pillarTabsList.filter((t) =>
              visitedSet.has(t.id),
            ).length;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePillarChange(p.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
                  isPillarActive
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`size-3.5 ${
                    isPillarActive
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-slate-400"
                  }`}
                />
                <span>{p.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                    visitedCount === count
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold"
                      : visitedCount > 0
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold"
                        : "opacity-60"
                  }`}
                  title={`${visitedCount} onglet(s) consulté(s) sur ${count} dans ce pilier`}
                >
                  {visitedCount === count
                    ? `✓ ${count}`
                    : `${visitedCount}/${count}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RUBAN DES SOUS-ONGLETS DU PILIER (Level 2: 3 à 6 boutons nets)           */}
      {/* ========================================================================= */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth w-full"
        role="tablist"
      >
        {pillarTabs.map((t) => {
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => selectTabWithFeedback(t.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap active:scale-95 min-h-[36px] ${
                isSelected
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                  : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {t.label.replace(" ◆", "").replace(" ✦", "")}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTENU DES PANNEAUX (Lazy keep-alive Apple)                            */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* 4. PIED DE PAGE SÉQUENTIEL ÉPURÉ                                          */}
      {/* ========================================================================= */}
      {tabs.length > 1 && activeFullIdx !== -1 && (
        <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap text-xs">
          {prevTab ? (
            <button
              type="button"
              onClick={() => jumpToTab(prevTab.id)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-amber-500/50 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <ChevronLeft className="size-4 text-amber-600" />
              <span>{prevTab.label.replace(" ◆", "").replace(" ✦", "")}</span>
            </button>
          ) : (
            <div />
          )}

          <span className="text-[11px] font-mono text-slate-400">
            {selectedPillar} · {idxInPillar >= 0 ? idxInPillar + 1 : 1} /{" "}
            {pillarTabs.length}
          </span>

          {nextTab ? (
            <button
              type="button"
              onClick={() => jumpToTab(nextTab.id)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <span>{nextTab.label.replace(" ◆", "").replace(" ✦", "")}</span>
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
