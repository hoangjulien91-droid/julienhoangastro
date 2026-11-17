"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  MODULES as HUB_MODULES,
  moduleStats,
} from "@/lib/pst/hub-stats";
import { getNextEvent } from "@/lib/pst/planning-stats";
import { MODULE_LABELS } from "@/lib/pst/data/ponts";
import { type UeId } from "@/lib/pst/data/outils-par-ue";
import { MobileNavBar } from "./nav/MobileNavBar";
import { DesktopNavBar } from "./nav/DesktopNavBar";

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");
  const isUeActive = Boolean(active && /^pst(106|108|120|123|124)$/.test(active));
  const [toolsUeFilter, setToolsUeFilter] = useState<UeId | "global">(
    isUeActive ? (active as UeId) : "pst106",
  );
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (active && /^pst(106|108|120|123|124)$/.test(active)) {
      setToolsUeFilter(active as UeId);
    }
  }, [active]);

  // Mobile & Desktop dropdown states
  const [mobilePstOpen, setMobilePstOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [desktopToolsOpen, setDesktopToolsOpen] = useState(false);
  const [desktopPstOpen, setDesktopPstOpen] = useState(false);

  const mobilePstRef = useRef<HTMLDivElement>(null);
  const mobileToolsRef = useRef<HTMLDivElement>(null);
  const desktopToolsRef = useRef<HTMLDivElement>(null);
  const desktopPstRef = useRef<HTMLDivElement>(null);

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
    if (!mobilePstOpen && !mobileToolsOpen && !desktopToolsOpen && !desktopPstOpen) return;

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
      if (
        desktopPstRef.current &&
        !desktopPstRef.current.contains(target)
      ) {
        setDesktopPstOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobilePstOpen(false);
        setMobileToolsOpen(false);
        setDesktopToolsOpen(false);
        setDesktopPstOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobilePstOpen, mobileToolsOpen, desktopToolsOpen, desktopPstOpen]);

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
        className="relative p-1.5 sm:p-2 md:py-2 md:px-3 rounded-2xl md:rounded-3xl w-full max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        <MobileNavBar
          active={active}
          activeId={activeId}
          activeCourseLabel={activeCourseLabel}
          progressMap={progressMap}
          toolsUeFilter={toolsUeFilter}
          setToolsUeFilter={setToolsUeFilter}
          mobilePstOpen={mobilePstOpen}
          setMobilePstOpen={setMobilePstOpen}
          mobileToolsOpen={mobileToolsOpen}
          setMobileToolsOpen={setMobileToolsOpen}
          mobilePstRef={mobilePstRef}
          mobileToolsRef={mobileToolsRef}
        />

        <DesktopNavBar
          active={active}
          activeId={activeId}
          activeCourseLabel={activeCourseLabel}
          isUeActive={isUeActive}
          progressMap={progressMap}
          toolsUeFilter={toolsUeFilter}
          setToolsUeFilter={setToolsUeFilter}
          desktopToolsOpen={desktopToolsOpen}
          setDesktopToolsOpen={setDesktopToolsOpen}
          desktopPstOpen={desktopPstOpen}
          setDesktopPstOpen={setDesktopPstOpen}
          desktopToolsRef={desktopToolsRef}
          desktopPstRef={desktopPstRef}
          nextEvent={nextEvent}
        />
      </nav>
    </header>
  );
}
