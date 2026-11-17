"use client";

import React, { type ReactNode } from "react";
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Sparkles,
} from "lucide-react";

interface SvgFullScreenModalProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  activeInfo?: ReactNode;
  zoom: number;
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  isPortrait: boolean;
  viewportRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onDoubleTap: () => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export function SvgFullScreenModal({
  title,
  subtitle,
  children,
  activeInfo,
  zoom,
  showInfo,
  setShowInfo,
  isPortrait,
  viewportRef,
  onClose,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onDoubleTap,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: SvgFullScreenModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Mode plein écran : ${title}`}
      className="fixed inset-0 z-[99999] bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-2xl flex flex-col select-none overflow-hidden animate-in fade-in duration-200"
    >
      {/* 1. Barre Supérieure Flottante */}
      <header className="px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-b border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="size-8 rounded-xl bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Maximize2 className="size-4" />
          </div>
          <div className="truncate">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white m-0 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 m-0 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Commandes de Zoom & Fermeture */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Zoom Stepper */}
          <div className="flex items-center bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-0.5 text-xs">
            <button
              type="button"
              onClick={onZoomOut}
              className="p-1 sm:px-2 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 active:scale-95 transition-all text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
              title="Zoom arrière (-)"
              disabled={zoom <= 0.75}
            >
              <ZoomOut className="size-3.5 sm:size-4" />
            </button>

            <button
              type="button"
              onClick={onZoomReset}
              className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 cursor-pointer min-w-[38px] sm:min-w-[42px] text-center"
              title="Cliquer pour réinitialiser à 100%"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              onClick={onZoomIn}
              className="p-1 sm:px-2 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 active:scale-95 transition-all text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
              title="Zoom avant (+)"
              disabled={zoom >= 3}
            >
              <ZoomIn className="size-3.5 sm:size-4" />
            </button>

            {zoom !== 1 && (
              <button
                type="button"
                onClick={onZoomReset}
                className="p-1 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Réinitialiser (100%)"
              >
                <RotateCcw className="size-3" />
              </button>
            )}
          </div>

          {/* Bouton Quitter */}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <Minimize2 className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </header>

      {/* 2. BANNIÈRE CONSEIL PAYSAGE (Uniquement en portrait sur smartphone) */}
      {isPortrait && (
        <div className="sm:hidden px-3.5 py-1.5 bg-gradient-to-r from-cyan-50/90 to-indigo-50/90 dark:from-cyan-950/60 dark:to-indigo-950/60 border-b border-cyan-200/80 dark:border-cyan-800/40 text-[11px] text-cyan-800 dark:text-cyan-300 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <Smartphone className="size-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 rotate-90" />
            <span className="truncate">
              Pivotez en paysage pour afficher le schéma en très grand
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-200 shrink-0">
            Plein écran
          </span>
        </div>
      )}

      {/* 3. ZONE D'AFFICHAGE DU SCHÉMA (Canvas tactile haute précision avec Pinch-to-Zoom) */}
      <div
        ref={viewportRef}
        onClick={onDoubleTap}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="flex-1 w-full h-full overflow-auto touch-pan-x touch-pan-y scrollbar-none flex items-center justify-center p-3 sm:p-6 pst-diagram-svg-fullscreen"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          className="transition-all duration-150 ease-out flex items-center justify-center origin-center"
          style={{
            width: `${Math.max(100, Math.round(zoom * 100))}%`,
            minWidth: zoom > 1 ? `${Math.round(zoom * 680)}px` : undefined,
          }}
        >
          <div className="w-full max-w-5xl select-none">{children}</div>
        </div>
      </div>

      {/* 4. TIROIR INFÉRIEUR : DÉFINITIONS DU NŒUD SÉLECTIONNÉ (Optionnel) */}
      {activeInfo && (
        <footer className="border-t border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0">
          <div className="px-3.5 sm:px-6 py-1.5 border-b border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="size-3 text-cyan-600 dark:text-cyan-400" />
              <span>Détails &amp; Analyse du concept sélectionné</span>
            </span>
            <button
              type="button"
              onClick={() => setShowInfo((s) => !s)}
              className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>{showInfo ? "Masquer" : "Afficher"}</span>
              {showInfo ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronUp className="size-3" />
              )}
            </button>
          </div>
          {showInfo && (
            <div className="p-3 sm:p-5 max-h-36 overflow-y-auto text-xs animate-in fade-in">
              {activeInfo}
            </div>
          )}
        </footer>
      )}
    </div>
  );
}
