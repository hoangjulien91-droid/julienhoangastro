"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PONTS } from "@/lib/pst/data/ponts";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  POMO_WORK,
  POMO_BREAK,
  today,
  getLS,
  setLS,
  beepAudio,
  notifyBrowser,
  buildFullSnapshot,
  restoreSnapshot,
  getStaleModules,
} from "@/lib/pst/data/study-tools-helpers";

interface UseStudyToolsOptions {
  moduleKey: string;
}

export function useStudyTools({ moduleKey }: UseStudyToolsOptions) {
  const [open, setOpen] = useState(false);
  const [activePop, setActivePop] = useState<
    "none" | "pomo" | "search" | "bell" | "sync"
  >("none");
  const [syncText, setSyncText] = useState("");
  const [syncCopied, setSyncCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pomoMode, setPomoMode] = useState<"work" | "break">("work");
  const [pomoRemain, setPomoRemain] = useState(POMO_WORK);
  const [pomoRunning, setPomoRunning] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPomoCount(parseInt(getLS("st_pomo_" + today()) ?? "0", 10) || 0);
    setLS("st_visit_" + moduleKey, today());
  }, [moduleKey]);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3000);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    function handleDockState(e: Event) {
      const visible = Boolean((e as CustomEvent<{ visible?: boolean }>).detail?.visible);
      setDockVisible(visible);
    }
    function handleToggleTools() {
      setOpen((prev) => {
        const next = !prev;
        if (!next) setActivePop("none");
        return next;
      });
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setActivePop("none");
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pst:mobile-dock-state", handleDockState);
    window.addEventListener("pst:toggle-study-tools", handleToggleTools);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pst:mobile-dock-state", handleDockState);
      window.removeEventListener("pst:toggle-study-tools", handleToggleTools);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Fermeture au clic en dehors
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActivePop("none");
      }
    }
    if (open || activePop !== "none") {
      document.addEventListener("click", handleDocClick);
      return () => document.removeEventListener("click", handleDocClick);
    }
    return undefined;
  }, [open, activePop]);

  // Chrono Pomodoro
  useEffect(() => {
    if (!pomoRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setPomoRemain((r) => {
        if (r > 1) return r - 1;
        beepAudio();
        if (pomoMode === "work") {
          notifyBrowser("Pomodoro terminé !", "Prends 5 min de pause.");
          toast("Pomodoro terminé ! Prends 5 min de pause.");
          const next = pomoCount + 1;
          setPomoCount(next);
          setLS("st_pomo_" + today(), String(next));
          setPomoMode("break");
          setPomoRunning(false);
          return POMO_BREAK;
        }
        notifyBrowser("Pause terminée", "On repart pour 25 min ?");
        toast("Pause finie. On repart pour 25 min ?");
        setPomoRunning(false);
        return POMO_WORK;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pomoRunning, pomoMode, pomoCount, toast]);

  function resetPomo() {
    setPomoRunning(false);
    setPomoMode("work");
    setPomoRemain(POMO_WORK);
  }

  function togglePop(pop: "pomo" | "search" | "bell" | "sync") {
    playClickSound();
    setActivePop((prev) => (prev === pop ? "none" : pop));
  }

  function handleCopySnapshot() {
    const data = buildFullSnapshot();
    navigator.clipboard.writeText(data);
    setSyncCopied(true);
    playSuccessSound();
    triggerHaptic("success");
    toast("Progression complète copiée (prête pour Universal Clipboard Mac/iPhone) !");
    setTimeout(() => setSyncCopied(false), 2500);
  }

  function handleDownloadSnapshot() {
    const data = buildFullSnapshot();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pst-sync-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
    toast("Fichier de sauvegarde téléchargé.");
  }

  function handleRestoreSnapshotAction() {
    if (!syncText.trim()) {
      toast("Collez d'abord le code de synchronisation.");
      return;
    }
    try {
      const count = restoreSnapshot(syncText);
      playSuccessSound();
      triggerHaptic("success");
      setSyncText("");
      toast(`Synchronisation réussie (${count} clés restaurées) !`);
      setActivePop("none");
    } catch {
      toast("Format de sauvegarde invalide.");
    }
  }

  const [stale, setStale] = useState<{ id: string; days: number }[]>([]);
  useEffect(() => {
    setStale(getStaleModules());
  }, []);

  useEffect(() => {
    if (stale.length && typeof window !== "undefined") {
      try {
        const alreadyNotified = window.sessionStorage.getItem("pst_stale_notified");
        if (!alreadyNotified) {
          window.sessionStorage.setItem("pst_stale_notified", "true");
          const t = setTimeout(() => {
            toast(`${stale.length} module(s) à réviser — voir les rappels.`);
            notifyBrowser("Révisions en attente", `${stale.length} module(s) à revoir.`);
          }, 1400);
          return () => clearTimeout(t);
        }
      } catch {
        // ignore
      }
    }
    return undefined;
  }, [stale.length, toast]);

  function requestNotifications() {
    if (!("Notification" in window)) {
      toast("Notifications non supportées sur ce navigateur.");
      return;
    }
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        toast("Notifications activées.");
        const s = getStaleModules();
        if (s.length)
          notifyBrowser("Révisions en attente", `${s.length} module(s) à revoir.`);
      } else {
        toast("Notifications refusées.");
      }
    });
  }

  const results = PONTS.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    if (p.c.toLowerCase().includes(q)) return true;
    return Object.values(p.m).some((v) => v.toLowerCase().includes(q));
  });

  return {
    open,
    setOpen,
    activePop,
    setActivePop,
    syncText,
    setSyncText,
    syncCopied,
    toastMsg,
    pomoMode,
    pomoRemain,
    pomoRunning,
    setPomoRunning,
    pomoCount,
    searchQuery,
    setSearchQuery,
    wrapRef,
    showScrollTop,
    dockVisible,
    resetPomo,
    togglePop,
    handleCopySnapshot,
    handleDownloadSnapshot,
    handleRestoreSnapshotAction,
    stale,
    requestNotifications,
    results,
  };
}
