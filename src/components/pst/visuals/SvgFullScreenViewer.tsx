"use client";

import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
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
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface SvgFullScreenViewerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Légende ou boîte d'explication interactive du nœud actif */
  activeInfo?: ReactNode;
  className?: string;
  /** Bouton déclencheur customisé ou position */
  buttonLabel?: string;
  hideInlineButton?: boolean;
  isOpenControlled?: boolean;
  onCloseControlled?: () => void;
}

export function SvgFullScreenViewer({
  title,
  subtitle,
  children,
  activeInfo,
  className = "",
  buttonLabel = "Plein écran",
  hideInlineButton = false,
  isOpenControlled,
  onCloseControlled,
}: SvgFullScreenViewerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);

  const isControlled = typeof isOpenControlled === "boolean";
  const isOpen = isControlled ? isOpenControlled : internalOpen;

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef<number>(0);
  const initialTouchDistRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Détection de l'orientation portrait sur mobile
  useEffect(() => {
    function checkOrientation() {
      if (typeof window !== "undefined") {
        setIsPortrait(
          window.innerHeight > window.innerWidth && window.innerWidth < 768,
        );
      }
    }
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  // Gestion du scroll du body & des touches clavier
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleZoomReset();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleOpen() {
    triggerHaptic("medium");
    playClickSound();
    setZoom(1);
    setShowInfo(true);
    if (isControlled) {
      // noop
    } else {
      setInternalOpen(true);
    }
  }

  function handleClose() {
    triggerHaptic("light");
    playClickSound();
    if (isControlled && onCloseControlled) {
      onCloseControlled();
    } else {
      setInternalOpen(false);
    }
  }

  function handleZoomIn() {
    triggerHaptic("light");
    playClickSound();
    setZoom((z) => Math.min(3, Number((z + 0.25).toFixed(2))));
  }

  function handleZoomOut() {
    triggerHaptic("light");
    playClickSound();
    setZoom((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))));
  }

  function handleZoomReset() {
    triggerHaptic("medium");
    playClickSound();
    setZoom(1);
  }

  // Double tap pour basculer rapidement entre 100% et 175%
  function handleDoubleTap() {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      triggerHaptic("medium");
      playClickSound();
      setZoom((z) => (z > 1 ? 1 : 1.75));
    }
    lastTapRef.current = now;
  }

  // Support pincement tactile (pinch-to-zoom) sur smartphone
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      initialTouchDistRef.current = dist;
      initialZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && initialTouchDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const factor = dist / initialTouchDistRef.current;
      const targetZoom = Math.min(
        3,
        Math.max(0.75, Number((initialZoomRef.current * factor).toFixed(2))),
      );
      setZoom(targetZoom);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      initialTouchDistRef.current = null;
    }
  };

  const modalContent = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Mode plein écran : ${title}`}
      className="fixed inset-0 z-[99999] bg-slate-950/98 backdrop-blur-2xl text-slate-100 flex flex-col select-none overflow-hidden animate-in fade-in duration-200"
    >
      {/* 1. Barre Supérieure Flottante */}
      <header className="px-3 py-2.5 sm:px-5 sm:py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Maximize2 className="size-4" />
          </div>
          <div className="truncate">
            <h3 className="font-bold text-xs sm:text-sm text-white m-0 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] sm:text-xs text-slate-400 m-0 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Commandes de Zoom & Fermeture */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Zoom Stepper */}
          <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl p-0.5 text-xs">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 sm:px-2 rounded-lg hover:bg-slate-700 active:scale-95 transition-all text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
              title="Zoom arrière (-)"
              disabled={zoom <= 0.75}
            >
              <ZoomOut className="size-3.5 sm:size-4" />
            </button>

            <button
              type="button"
              onClick={handleZoomReset}
              className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer min-w-[42px] text-center"
              title="Cliquer pour réinitialiser à 100%"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 sm:px-2 rounded-lg hover:bg-slate-700 active:scale-95 transition-all text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
              title="Zoom avant (+)"
              disabled={zoom >= 3}
            >
              <ZoomIn className="size-3.5 sm:size-4" />
            </button>

            {zoom !== 1 && (
              <button
                type="button"
                onClick={handleZoomReset}
                className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                title="Réinitialiser (100%)"
              >
                <RotateCcw className="size-3" />
              </button>
            )}
          </div>

          {/* Bouton Quitter */}
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs font-bold text-white flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <Minimize2 className="size-3.5 text-amber-400" />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </header>

      {/* 2. BANNIÈRE CONSEIL PAYSAGE (Uniquement en portrait sur smartphone) */}
      {isPortrait && (
        <div className="sm:hidden px-3 py-1.5 bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border-b border-cyan-800/40 text-[11px] text-cyan-300 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <Smartphone className="size-3.5 text-cyan-400 shrink-0 rotate-90" />
            <span className="truncate">
              Pivotez en paysage pour afficher le schéma en très grand
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-200 shrink-0">
            Plein écran
          </span>
        </div>
      )}

      {/* 3. ZONE D'AFFICHAGE DU SCHÉMA (Canvas tactile haute précision avec Pinch-to-Zoom) */}
      <div
        ref={viewportRef}
        onClick={handleDoubleTap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 w-full h-full overflow-auto touch-pan-x touch-pan-y scrollbar-none flex items-center justify-center p-2 sm:p-6 pst-diagram-svg-fullscreen"
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
        <footer className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-md shrink-0">
          <div className="px-3.5 py-1.5 border-b border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="size-3 text-cyan-400" />
              <span>Détails &amp; Analyse du concept sélectionné</span>
            </span>
            <button
              type="button"
              onClick={() => setShowInfo((s) => !s)}
              className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
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
            <div className="p-3 sm:p-4 max-h-36 overflow-y-auto text-xs animate-in fade-in">
              {activeInfo}
            </div>
          )}
        </footer>
      )}
    </div>
  ) : null;

  return (
    <div className={`relative ${className}`}>
      {/* Bouton Plein Écran intégré (affiché en haut à droite du conteneur du schéma) */}
      {!hideInlineButton && (
        <div className="flex justify-end mb-1.5">
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs min-h-[36px]"
            title="Afficher le schéma en plein écran avec zoom et mode paysage"
          >
            <Maximize2 className="size-3.5 text-cyan-400" />
            <span>{buttonLabel}</span>
            <span className="text-[10px] font-mono opacity-60 hidden sm:inline">
              (Pinch Zoom)
            </span>
          </button>
        </div>
      )}

      {/* Affichage normal ou espace réservé si actif en plein écran */}
      {isOpen ? (
        <div className="w-full p-6 sm:p-8 rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-950/20 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 text-center min-h-[160px]">
          <div className="size-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Maximize2 className="size-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-cyan-200 m-0">
              Schéma en mode Plein Écran
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 m-0">
              Le schéma haute résolution est actuellement actif sur tout votre
              écran.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="mt-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            Revenir à l&apos;affichage réduit
          </button>
        </div>
      ) : (
        children
      )}

      {/* Modal Plein Écran injecté dans le body via Portal */}
      {mounted && modalContent
        ? createPortal(modalContent, document.body)
        : modalContent}
    </div>
  );
}
