"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  type TabDef,
  PILLARS,
  GROUP_BY_ID,
} from "./tabs/tabs-metadata";
import { TabsSubnavRibbon } from "./tabs/TabsSubnavRibbon";
import { TabsSequentialFooter } from "./tabs/TabsSequentialFooter";
import { TabsMobileFloatingDock } from "./tabs/TabsMobileFloatingDock";

export * from "./tabs/tabs-metadata";

interface TabsShellProps {
  tabs: TabDef[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabsShell({ tabs, activeTab, onChange }: TabsShellProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const subtabsContainerRef = useRef<HTMLDivElement>(null);
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

  // Détection du débordement pour les dégradés et flèches de défilement
  const checkSubtabsOverflow = () => {
    const el = subtabsContainerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 4;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(
      hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 6,
    );
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

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("pst:mobile-dock-state", {
        detail: { visible: showFloatingDock },
      }),
    );
  }, [showFloatingDock]);

  useEffect(() => {
    return () => {
      window.dispatchEvent(
        new CustomEvent("pst:mobile-dock-state", {
          detail: { visible: false },
        }),
      );
    };
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
  const hasTrainingHub = useMemo(
    () => tabs.some((t) => t.id === "entrainement"),
    [tabs],
  );

  // Redirection transparente des anciens onglets d'entraînement
  useEffect(() => {
    if (!hasTrainingHub) return;
    if (
      activeTab === "qcm" ||
      activeTab === "pieges" ||
      activeTab === "qui" ||
      activeTab === "distinguer" ||
      activeTab === "cloze"
    ) {
      const mode = activeTab;
      onChange("entrainement");
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("pst:select-training-mode", { detail: { mode } }),
        );
      }, 0);
    }
  }, [activeTab, hasTrainingHub, onChange]);

  // Adoption du hash initial ou query param
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("tab") ?? "";
    const rawTarget = fromHash || fromQuery;
    const isTrainingAlias =
      hasTrainingHub &&
      (rawTarget === "qcm" ||
        rawTarget === "pieges" ||
        rawTarget === "qui" ||
        rawTarget === "distinguer" ||
        rawTarget === "cloze");
    const targetTab = isTrainingAlias ? "entrainement" : rawTarget;

    if (isTrainingAlias) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("pst:select-training-mode", {
            detail: { mode: rawTarget },
          }),
        );
      }, 0);
    }

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

  // Navigation par hash après le chargement
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
  }, [tabs, onChange]);

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

  // Sur mobile, garde l'onglet actif visible dans la barre de sous-onglets
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

    const currentTabGroup =
      tabs.find((t) => t.id === activeTab)?.group ?? GROUP_BY_ID[activeTab];
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

  function scrollSubtabs(direction: -1 | 1) {
    const el = subtabsContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  // Navigation clavier fléchée (WCAG roving tabIndex)
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
      {/* 1 & 2. SÉLECTEUR DES PILIERS & RUBAN SOUS-ONGLETS */}
      <div className="sticky top-[54px] md:top-[64px] z-30 -mx-2 px-2 sm:-mx-6 sm:px-6 pt-1.5 pb-2.5 bg-background/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 space-y-2.5 shadow-2xs">
        {/* Sélecteur des 4 Piliers */}
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

        {/* Ruban des sous-onglets */}
        <TabsSubnavRibbon
          pillarTabs={pillarTabs}
          activeTab={activeTab}
          selectedPillar={selectedPillar}
          activePillarDef={activePillarDef}
          activePillarDisplayLabel={activePillarDisplayLabel}
          onSelectTab={selectTabWithFeedback}
          tabRefs={tabRefs}
          subtabsContainerRef={subtabsContainerRef}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScrollSubtabs={scrollSubtabs}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 3. CONTENU DES PANNEAUX */}
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

      {/* 4. PIED DE PAGE SÉQUENTIEL */}
      <TabsSequentialFooter
        tabs={tabs}
        activeFullIdx={activeFullIdx}
        prevTab={prevTab}
        nextTab={nextTab}
        selectedPillar={selectedPillar}
        activePillarDisplayLabel={activePillarDisplayLabel}
        idxInPillar={idxInPillar}
        pillarTabsLength={pillarTabs.length}
        onJumpToTab={jumpToTab}
      />

      {/* 5. BARRE FLOTTANTE BAS DE PAGE MOBILE */}
      <TabsMobileFloatingDock
        showFloatingDock={showFloatingDock}
        selectedPillar={selectedPillar}
        onPillarChange={(pId) => {
          handlePillarChange(pId);
          navTopRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
