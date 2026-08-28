"use client";

/**
 * Root wrapper for every /pst* route. Intentionally does NOT render the
 * site's Navbar/Footer (InnerPageLayout) — these are self-contained app
 * pages (quiz/flashcards), not editorial content, matching the standalone
 * HTML documents the original Astro pages were.
 */

import "./pst-globals.css";
import type { ReactNode } from "react";
import { PstThemeProvider } from "./PstThemeProvider";
import { CurrentCardProvider } from "./CurrentCardContext";
import { StudyTools } from "@/components/pst/study-tools/StudyTools";
import { Toaster } from "@/components/ui/sonner";

interface PstPageShellProps {
  moduleKey: string;
  children: ReactNode;
  /** Désactive le max-width: 760px de `.wrap` (cf. planning.css) pour les
   * pages qui ont besoin de toute la largeur de l'écran, comme la frise du
   * planning — inutile pour les pages quiz/flashcards, centrées à dessein. */
  wide?: boolean;
}

export function PstPageShell({ moduleKey, children, wide }: PstPageShellProps) {
  return (
    <PstThemeProvider moduleKey={moduleKey}>
      <CurrentCardProvider>
        <div className={`wrap${wide ? " wrap-wide" : ""}`}>{children}</div>
        <StudyTools moduleKey={moduleKey} />
        <Toaster />
      </CurrentCardProvider>
    </PstThemeProvider>
  );
}
