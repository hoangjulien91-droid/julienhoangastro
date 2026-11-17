"use client";

/**
 * Root wrapper for every /pst* route. Intentionally does NOT render the
 * site's Navbar/Footer (InnerPageLayout) — these are self-contained app
 * pages (quiz/flashcards), not editorial content, matching the standalone
 * HTML documents the original Astro pages were.
 */

import "./pst-globals.css";
import "./pst-hub.css";
import "./pst-legacy-modules.css";
import "./pst-overrides.css";
import { useEffect, useState, type ReactNode } from "react";
import { Columns2, Maximize2, Minimize2 } from "lucide-react";
import { PstThemeProvider } from "./PstThemeProvider";
import { CurrentCardProvider } from "./CurrentCardContext";
import { ModulesNav } from "./ModulesNav";
import { PstAccessGate } from "./PstAccessGate";
import { hasValidPstSession, clearPstSession } from "@/lib/pst/access-gate";
import { StudyTools } from "@/components/pst/study-tools/StudyTools";
import { ShellModalsHost } from "./ShellModalsHost";
import { useShellModals } from "./useShellModals";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { Toaster } from "@/components/ui/sonner";
import { SplitCalepinSidebar } from "./SplitCalepinSidebar";

interface PstPageShellProps {
  moduleKey: string;
  activeNav?: string;
  children?: ReactNode;
  /** Désactive le max-width: 760px de `.wrap` (cf. planning.css) pour les
   * pages qui ont besoin de toute la largeur de l'écran, comme la frise du
   * planning — inutile pour les pages quiz/flashcards, centrées à dessein. */
  wide?: boolean;
}

type LayoutMode = "standard" | "wide" | "split";

export function PstPageShell({
  moduleKey,
  activeNav,
  children,
  wide,
}: PstPageShellProps) {
  const [authStatus, setAuthStatus] = useState<
    "checking" | "locked" | "unlocked"
  >("checking");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("standard");

  const modals = useShellModals(moduleKey);
  const isWorkshopModule = /^pst(106|108|120|123|124)$/.test(moduleKey);

  useEffect(() => {
    setAuthStatus(hasValidPstSession() ? "unlocked" : "locked");
    const handleLock = () => {
      clearPstSession();
      setAuthStatus("locked");
    };
    window.addEventListener("pst:lock", handleLock);
    return () => window.removeEventListener("pst:lock", handleLock);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      import.meta.env.PROD
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!isWorkshopModule) return;
    try {
      const savedMode = localStorage.getItem(
        "pst_layout_mode_v1",
      ) as LayoutMode | null;
      if (
        savedMode === "standard" ||
        savedMode === "wide" ||
        savedMode === "split"
      ) {
        setLayoutMode(savedMode);
      }
    } catch {
      // ignore
    }
  }, [isWorkshopModule]);

  function changeLayoutMode(mode: LayoutMode) {
    playClickSound();
    setLayoutMode(mode);
    try {
      localStorage.setItem("pst_layout_mode_v1", mode);
    } catch {
      // ignore
    }
  }

  const isEffectiveWide =
    wide || layoutMode === "wide" || layoutMode === "split";

  if (authStatus === "checking") {
    return (
      <PstThemeProvider moduleKey={moduleKey}>
        <div
          className="min-h-[75vh] flex items-center justify-center"
          aria-busy="true"
          aria-label="Chargement de l'espace PST"
        >
          <div className="size-8 rounded-full border-2 border-slate-300 dark:border-slate-700 border-t-[#891B29] animate-spin" />
        </div>
      </PstThemeProvider>
    );
  }

  if (authStatus === "locked") {
    return (
      <PstThemeProvider moduleKey={moduleKey}>
        <PstAccessGate onUnlock={() => setAuthStatus("unlocked")} />
        <Toaster />
      </PstThemeProvider>
    );
  }

  return (
    <PstThemeProvider moduleKey={moduleKey}>
      <CurrentCardProvider>
        {/* Navigation principale PST - Pleine largeur 7xl sur Desktop */}
        <ModulesNav
          active={activeNav ?? (moduleKey === "pst" ? "hub" : moduleKey)}
        />

        {isWorkshopModule && (
          <div className="hidden lg:flex items-center justify-end gap-2 max-w-6xl mx-auto mb-3">
            <div className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1 rounded-xl shadow-2xs text-xs">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Disposition :
              </span>
              <button
                type="button"
                onClick={() => changeLayoutMode("standard")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "standard"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Colonne centrée de lecture (760px)"
              >
                <Minimize2 className="size-3.5" />
                <span>Confort</span>
              </button>
              <button
                type="button"
                onClick={() => changeLayoutMode("wide")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "wide"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Mode Large (1120px)"
              >
                <Maximize2 className="size-3.5" />
                <span>Large</span>
              </button>
              <button
                type="button"
                onClick={() => changeLayoutMode("split")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "split"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Double écran : Atelier à gauche + Calepin & Glossaire épinglé à droite"
              >
                <Columns2 className="size-3.5" />
                <span>Double Écran Calepin</span>
              </button>
            </div>
          </div>
        )}

        <div
          className={
            isWorkshopModule && layoutMode === "split"
              ? "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              : undefined
          }
        >
          <div
            className={
              isWorkshopModule && layoutMode === "split"
                ? "lg:col-span-8 min-w-0"
                : `wrap${isEffectiveWide ? " wrap-wide" : ""}`
            }
          >
            {children}
          </div>

          {isWorkshopModule && layoutMode === "split" && (
            <SplitCalepinSidebar moduleKey={moduleKey} />
          )}
        </div>

        <StudyTools moduleKey={moduleKey} />
        <ShellModalsHost
          state={modals.state}
          effectiveModalModule={modals.effectiveModalModule}
          fichePocheModule={modals.fichePocheModule}
          onSelectWorkshop={modals.setSelectedWorkshop}
          closeModal={modals.closeModal}
        />
        <Toaster />
      </CurrentCardProvider>
    </PstThemeProvider>
  );
}
