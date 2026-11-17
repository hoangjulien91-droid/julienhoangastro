"use client";

import {
  type TabDef,
  PILLARS,
  GROUP_BY_ID,
} from "./tabs/tabs-metadata";
import { TabsSubnavRibbon } from "./tabs/TabsSubnavRibbon";
import { TabsSequentialFooter } from "./tabs/TabsSequentialFooter";
import { TabsMobileFloatingDock } from "./tabs/TabsMobileFloatingDock";
import { useTabsNavigation } from "./tabs/useTabsNavigation";

export * from "./tabs/tabs-metadata";

interface TabsShellProps {
  tabs: TabDef[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabsShell({ tabs, activeTab, onChange }: TabsShellProps) {
  const {
    tabRefs,
    subtabsContainerRef,
    navTopRef,
    selectedPillar,
    pillarTabs,
    activePillarDef,
    activePillarDisplayLabel,
    visitedSet,
    visitedRef,
    showFloatingDock,
    canScrollLeft,
    canScrollRight,
    activeFullIdx,
    prevTab,
    nextTab,
    idxInPillar,
    handlePillarChange,
    selectTabWithFeedback,
    jumpToTab,
    scrollSubtabs,
    handleKeyDown,
  } = useTabsNavigation({ tabs, activeTab, onChange });

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
