"use client";

import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Maximize2 } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { SvgFullScreenModal } from "./viewer/SvgFullScreenModal";

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

  const viewportRef = useRef<HTMLDivElement>(null);
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
    <SvgFullScreenModal
      title={title}
      subtitle={subtitle}
      children={children}
      activeInfo={activeInfo}
      zoom={zoom}
      showInfo={showInfo}
      setShowInfo={setShowInfo}
      isPortrait={isPortrait}
      viewportRef={viewportRef}
      onClose={handleClose}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onZoomReset={handleZoomReset}
      onDoubleTap={handleDoubleTap}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  ) : null;

  return (
    <div className={`relative ${className}`}>
      {/* Bouton Plein Écran intégré (affiché en haut à droite du conteneur du schéma) */}
      {!hideInlineButton && (
        <div className="flex justify-end mb-1.5">
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-900 hover:text-slate-950 dark:text-white border border-slate-200/90 dark:border-slate-800 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs min-h-[36px]"
            title="Afficher le schéma en plein écran avec zoom et mode paysage"
          >
            <Maximize2 className="size-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{buttonLabel}</span>
            <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 hidden sm:inline">
              (Pinch Zoom)
            </span>
          </button>
        </div>
      )}

      {/* Affichage normal ou espace réservé si actif en plein écran */}
      {isOpen ? (
        <div className="w-full p-5 sm:p-8 rounded-2xl border border-dashed border-cyan-500/40 bg-slate-50/90 dark:bg-slate-950/60 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 text-center min-h-[160px]">
          <div className="size-10 rounded-2xl bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
            <Maximize2 className="size-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white m-0">
              Schéma en mode Plein Écran
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 m-0">
              Le schéma haute résolution est actuellement actif sur tout votre
              écran.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="mt-1 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
