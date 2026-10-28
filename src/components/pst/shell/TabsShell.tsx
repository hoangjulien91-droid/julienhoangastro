"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  Target,
  GraduationCap,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
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
  ad: "Suivi",
  errors: "Suivi",
  outils: "Suivi",

  schemas: "Apprendre",
  seances: "Apprendre",
  fiches: "Apprendre",
  lexique: "Apprendre",
  frise: "Apprendre",
  mindmap: "Apprendre",
  recits: "Apprendre",
  debats: "Apprendre",
  bonus: "Apprendre",
  buhler: "Apprendre",
  ressources: "Apprendre",
  ponts: "Apprendre",

  cartes: "S'entraîner",
  qcm: "S'entraîner",
  qui: "S'entraîner",
  pieges: "S'entraîner",
  distinguer: "S'entraîner",
  cloze: "S'entraîner",
  feynman: "S'entraîner",
  simulateur: "S'entraîner",
  matrice: "S'entraîner",
  thermo: "S'entraîner",
  langage: "S'entraîner",
  biographie: "S'entraîner",

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
  diagnostic: "Examen",
  iod: "Examen",
  autoconfrontation: "Examen",
  audit: "Examen",
};

export interface PillarDef {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
}

export const PILLARS: PillarDef[] = [
  {
    id: "Suivi",
    label: "Suivi & Cadre",
    shortLabel: "Suivi",
    icon: BarChart2,
    accentColor: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/20",
  },
  {
    id: "Apprendre",
    label: "Leçons & Fiches",
    shortLabel: "Leçons",
    icon: BookOpen,
    accentColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
  },
  {
    id: "S'entraîner",
    label: "Quiz & Entraînement",
    shortLabel: "Quiz",
    icon: Target,
    accentColor: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/20",
  },
  {
    id: "Examen",
    label: "Épreuve & Examen",
    shortLabel: "Examen",
    icon: GraduationCap,
    accentColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/20",
  },
];

export function cleanTabLabel(label: string): string {
  return label
    .replace(/\s*◆\s*/g, "")
    .replace(/\s*✦\s*/g, "")
    .trim();
}

/**
 * Libellés canoniques par défaut pour harmoniser l'expérience utilisateur
 * entre modules (Lot B).
 */
export const CANONICAL_LABELS: Record<string, string> = {
  accueil: "Accueil",
  parcours: "Parcours",
  errors: "Carnet d'Erreurs",
  ad: "Activités Distantes (AD)",
  outils: "Boîte à Outils",

  seances: "Séances & Cours",
  fiches: "Fiches de Cours",
  lexique: "Lexique",
  schemas: "Galerie Visuelle",
  mindmap: "Carte Mentale",
  frise: "Frise Chronologique",
  ressources: "Ressources Officielles",
  debats: "Débats & Controverses",
  recits: "Récits Cliniques",
  bonus: "Bonus & Approfondissements",

  cartes: "Flashcards",
  qcm: "QCM",
  cloze: "Citations à Trous",
  qui: "Qui a dit quoi ?",
  pieges: "Pièges Vrai/Faux",
  distinguer: "Distinguer",
  simulateur: "Simulateur de Cas",
  feynman: "Feynman Sandbox",

  examen: "Examen Blanc",
  exam: "Examen Blanc",
  redac: "Rédaction & Plan",
  cas: "Études de Cas",
  protocole: "Protocole d'Intervention",
  atelier: "Annales & Atelier",
  antiseche: "Antisèche",
  diagnostic: "Labo Diagnostic Clinique",
  autoconfrontation: "Simulateur Autoconfrontation",
  iod: "Négociation & Démarche IOD",
  langage: "Décodeur Langage & Performativité",
  matrice: "Matrice Dubar & Sainsaulieu",
  deonto: "Tribunal Déontologique",
  biographie: "Récits de Vie (Bourdieu & Hughes)",
};
const CANONICAL_TAB_ORDER: Record<string, number> = {
  // --- 1. Suivi & Cadre ---
  accueil: 10,
  parcours: 20,
  errors: 30,
  ad: 40,
  outils: 50,

  // --- 2. Leçons & Fiches (Apprendre) ---
  seances: 100,
  fiches: 110,
  lexique: 120,
  schemas: 130,
  mindmap: 140,
  frise: 150,
  ressources: 160,
  debats: 170,
  recits: 180,
  bonus: 190,
  buhler: 195,
  ponts: 198,

  // --- 3. Quiz & Entraînement (S'entraîner) ---
  cartes: 200,
  qcm: 210,
  cloze: 220,
  qui: 230,
  pieges: 240,
  distinguer: 250,
  simulateur: 260,
  matrice: 265,
  biographie: 270,
  langage: 275,
  thermo: 280,
  feynman: 290,

  // --- 4. Épreuve & Examen (Examen) ---
  examen: 300,
  exam: 300, // alias canonique
  redac: 310,
  cas: 320,
  protocole: 330,
  atelier: 340,
  antiseche: 350,
  diagnostic: 360,
  autoconfrontation: 365,
  iod: 370,
  deonto: 375,
  tribunal: 380,
  sosie: 385,
  audit: 390,
};

/**
 * Annote chaque onglet avec sa famille et trie les onglets selon l'ordre
 * canonique par pilier, puis selon l'ordre défini dans CANONICAL_TAB_ORDER.
 */
export function groupTabs(tabs: TabDef[]): TabDef[] {
  const annotated = tabs.map((t) => {
    const rawLabel = cleanTabLabel(t.label);
    const displayLabel =
      rawLabel.startsWith("Carnet d'Erreurs")
        ? rawLabel
        : CANONICAL_LABELS[t.id] ?? rawLabel;
    return {
      ...t,
      label: displayLabel,
      group: t.group ?? GROUP_BY_ID[t.id] ?? "S'entraîner",
    };
  });
  return annotated
    .slice()
    .sort((a, b) => {
      const groupDiff =
        TAB_GROUP_ORDER.indexOf(a.group) - TAB_GROUP_ORDER.indexOf(b.group);
      if (groupDiff !== 0) return groupDiff;
      const orderA = CANONICAL_TAB_ORDER[a.id] ?? 999;
      const orderB = CANONICAL_TAB_ORDER[b.id] ?? 999;
      return orderA - orderB;
    });
}

interface TabsShellProps {
  tabs: TabDef[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabsShell({ tabs, activeTab, onChange }: TabsShellProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const subtabsContainerRef = useRef<HTMLDivElement | null>(null);
  const navTopRef = useRef<HTMLDivElement | null>(null);

  // Mémorisation du dernier sous-onglet visité par pilier pour éviter les resets intempestifs
  const lastActiveByPillar = useRef<Record<string, string>>({});

  // Détermination du groupe actif
  const currentGroup = useMemo(() => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab?.group ?? GROUP_BY_ID[activeTab] ?? "Apprendre";
  }, [tabs, activeTab]);

  const [selectedPillar, setSelectedPillar] = useState<string>(currentGroup);
  const [showFloatingDock, setShowFloatingDock] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mise à jour de la mémoire du pilier dès que activeTab change
  useEffect(() => {
    lastActiveByPillar.current[currentGroup] = activeTab;
  }, [activeTab, currentGroup]);

  // Détection du débordement pour les dégradés et flèches de défilement (Affordance C3)
  const checkSubtabsOverflow = () => {
    const el = subtabsContainerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 4;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  useEffect(() => {
    const el = subtabsContainerRef.current;
    if (!el) return;
    checkSubtabsOverflow();
    const handleScroll = () => checkSubtabsOverflow();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkSubtabsOverflow);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkSubtabsOverflow);
    };
  }, [selectedPillar, tabs]);

  useEffect(() => {
    function onScroll() {
      setShowFloatingDock(window.scrollY > 360);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    
    // Si on est déjà dans ce pilier, on ne force pas de reset
    const currentTabGroup = tabs.find((t) => t.id === activeTab)?.group ?? GROUP_BY_ID[activeTab];
    if (currentTabGroup === pillarId) return;

    // 1. Tente de restaurer le dernier sous-onglet visité dans ce pilier
    const rememberedTabId = lastActiveByPillar.current[pillarId];
    if (rememberedTabId && tabs.some((t) => t.id === rememberedTabId)) {
      onChange(rememberedTabId);
      return;
    }

    // 2. Sinon, prend le premier disponible
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

  // Navigation tactile du ruban via chevrons
  function scrollSubtabs(direction: -1 | 1) {
    const el = subtabsContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  // Gestion de la navigation clavier fléchée (WCAG roving tabIndex)
  function handleKeyDown(e: React.KeyboardEvent, currentId: string) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const curIdx = pillarTabs.findIndex((t) => t.id === currentId);
    if (curIdx === -1) return;
    const nextIdx =
      e.key === "ArrowRight"
        ? (curIdx + 1) % pillarTabs.length
        : (curIdx - 1 + pillarTabs.length) % pillarTabs.length;
    const nextTabItem = pillarTabs[nextIdx];
    if (nextTabItem) {
      selectTabWithFeedback(nextTabItem.id);
      tabRefs.current[nextTabItem.id]?.focus();
    }
  }

  const activeFullIdx = tabs.findIndex((t) => t.id === activeTab);
  const prevTab = activeFullIdx > 0 ? tabs[activeFullIdx - 1] : null;
  const nextTab =
    activeFullIdx >= 0 && activeFullIdx < tabs.length - 1
      ? tabs[activeFullIdx + 1]
      : null;

  const idxInPillar = pillarTabs.findIndex((t) => t.id === activeTab);

  const activePillarDef = PILLARS.find((p) => p.id === selectedPillar);
  const activePillarDisplayLabel = activePillarDef?.label ?? selectedPillar;

  return (
    <div ref={navTopRef} className="space-y-3.5">
      {/* ========================================================================= */}
      {/* 1 & 2. SÉLECTEUR DES PILIERS & RUBAN SOUS-ONGLETS (Sticky Top & Backdrop) */}
      {/* ========================================================================= */}
      <div className="sticky top-0 z-30 -mx-2 px-2 sm:-mx-6 sm:px-6 pt-1.5 pb-2.5 bg-background/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 space-y-2.5 shadow-2xs">
        {/* Sélecteur des 4 Piliers (Master Control avec identité visuelle distincte) */}
        <div className="flex justify-start overflow-x-auto pb-0.5 scrollbar-none">
          <div
            role="group"
            aria-label="Piliers pédagogiques du module"
            className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/70 dark:border-slate-700/70 backdrop-blur-md shadow-2xs text-xs font-bold shrink-0"
          >
            {PILLARS.map((p) => {
              const isPillarActive = selectedPillar === p.id;
              const Icon = p.icon;
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
                  aria-pressed={isPillarActive}
                  onClick={() => handlePillarChange(p.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                    isPillarActive
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-300/40 dark:border-slate-700/50"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    className={`size-3.5 transition-colors ${
                      isPillarActive ? p.accentColor : "text-slate-400"
                    }`}
                  />
                  <span className="hidden sm:inline font-bold">{p.label}</span>
                  <span className="sm:hidden font-bold">{p.shortLabel}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors border ${
                      isPillarActive
                        ? p.badgeBg
                        : "bg-slate-300/50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-transparent"
                    }`}
                    title={`${count} modules dans ce pilier (${visitedCount} consultés)`}
                  >
                    {visitedCount === count ? `✓ ${count}` : count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ruban des sous-onglets avec indicateur de pilier et affordance scroll */}
        <div className="relative group/subtabs w-full">
          {/* Dégradé & Chevron gauche */}
          {canScrollLeft && (
            <div className="absolute left-0 inset-y-0 z-10 flex items-center pr-4 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={() => scrollSubtabs(-1)}
                aria-label="Faire défiler les onglets vers la gauche"
                className="pointer-events-auto p-1.5 rounded-lg bg-card/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-border shadow-xs hover:bg-card transition-all cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
              </button>
            </div>
          )}

          {/* Conteneur défilable */}
          <div
            ref={subtabsContainerRef}
            role="tablist"
            aria-label={`Onglets du pilier ${activePillarDisplayLabel}`}
            className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none scroll-smooth w-full px-0.5"
          >
            {/* Badge de contexte de pilier sur grand écran pour matérialiser la relation Parent -> Enfant */}
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
              <span className={`size-1.5 rounded-full ${
                selectedPillar === "Suivi" ? "bg-sky-500" :
                selectedPillar === "Apprendre" ? "bg-amber-500" :
                selectedPillar === "S'entraîner" ? "bg-purple-500" : "bg-rose-500"
              }`} />
              <span>{activePillarDef?.shortLabel ?? selectedPillar}</span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-[10px]">{pillarTabs.length}</span>
            </div>

            {pillarTabs.map((t) => {
              const isSelected = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  aria-controls={`panel-${t.id}`}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, t.id)}
                  onClick={() => selectTabWithFeedback(t.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap active:scale-95 min-h-[40px] shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs font-bold"
                      : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <span className={`size-1.5 rounded-full ${
                      selectedPillar === "Suivi" ? "bg-sky-400" :
                      selectedPillar === "Apprendre" ? "bg-amber-400" :
                      selectedPillar === "S'entraîner" ? "bg-purple-400" : "bg-rose-400"
                    }`} />
                  )}
                  <span>{t.label.replace(" ◆", "").replace(" ✦", "")}</span>
                </button>
              );
            })}
          </div>

          {/* Dégradé & Chevron droit */}
          {canScrollRight && (
            <div className="absolute right-0 inset-y-0 z-10 flex items-center pl-4 bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none">
              <button
                type="button"
                onClick={() => scrollSubtabs(1)}
                aria-label="Faire défiler les onglets vers la droite"
                className="pointer-events-auto p-1.5 rounded-lg bg-card/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-border shadow-xs hover:bg-card transition-all cursor-pointer"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTENU DES PANNEAUX (Lazy keep-alive Apple & ARIA link)                 */}
      {/* ========================================================================= */}
      {tabs.map((t) => (
        <section
          key={t.id}
          id={`panel-${t.id}`}
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
              <div className="flex flex-col items-start leading-tight">
                {prevTab.group !== selectedPillar && (
                  <span className="text-[9px] font-mono uppercase text-amber-600 dark:text-amber-400">
                    ← {PILLARS.find((p) => p.id === prevTab.group)?.label ?? prevTab.group}
                  </span>
                )}
                <span>{prevTab.label.replace(" ◆", "").replace(" ✦", "")}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {activePillarDisplayLabel} · {idxInPillar >= 0 ? idxInPillar + 1 : 1} /{" "}
            {pillarTabs.length}
          </span>

          {nextTab ? (
            <button
              type="button"
              onClick={() => jumpToTab(nextTab.id)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <div className="flex flex-col items-end leading-tight">
                {nextTab.group !== selectedPillar && (
                  <span className="text-[9px] font-mono uppercase text-amber-400 dark:text-amber-600">
                    {PILLARS.find((p) => p.id === nextTab.group)?.label ?? nextTab.group} →
                  </span>
                )}
                <span>{nextTab.label.replace(" ◆", "").replace(" ✦", "")}</span>
              </div>
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. BARRE FLOTTANTE BAS DE PAGE MOBILE (apparaît au scroll > 360px)         */}
      {/* ========================================================================= */}
      {showFloatingDock && (
        <div className="sm:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 z-40 flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {PILLARS.map((p) => {
              const isAct = selectedPillar === p.id;
              const Icon = p.icon;
              const shortLabel =
                p.id === "Suivi"
                  ? "Suivi"
                  : p.id === "Apprendre"
                    ? "Leçons"
                    : p.id === "S'entraîner"
                      ? "Quiz"
                      : "Examen";
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    handlePillarChange(p.id);
                    navTopRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 ${
                    isAct
                      ? "bg-amber-500 text-slate-950 shadow-2xs"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="size-3 shrink-0" />
                  <span className="truncate">{shortLabel}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Remonter en haut de page"
            title="Remonter en haut de page"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 active:scale-95"
          >
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
