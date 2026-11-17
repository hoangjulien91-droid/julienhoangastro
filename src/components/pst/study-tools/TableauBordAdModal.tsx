"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Calendar, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  type UnifiedAdItem,
  type AdStatus,
  AD_STATUS_CONFIG,
  loadAdStatus,
  saveAdStatus,
  loadAdDraft,
} from "@/lib/pst/data/ad-common";
import { PST106_UNIFIED_ADS } from "@/lib/pst/data/pst106-ad";
import { PST108_UNIFIED_ADS } from "@/lib/pst/data/pst108-ad";
import { PST123_AD_DATA } from "@/lib/pst/data/pst123-ad";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { AdDashboardStatsBar } from "./tableau-ad/AdDashboardStatsBar";
import { AdDashboardFilterBar } from "./tableau-ad/AdDashboardFilterBar";
import { AdDashboardCard } from "./tableau-ad/AdDashboardCard";

interface TableauBordAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TableauBordAdModal({ isOpen, onClose }: TableauBordAdModalProps) {
  const [moduleFilter, setModuleFilter] = useState<"all" | "pst106" | "pst108" | "pst123">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | AdStatus>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tick, setTick] = useState<number>(0);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Toutes les AD du Semestre 1 réunies
  const allAds: UnifiedAdItem[] = useMemo(() => {
    return [...PST106_UNIFIED_ADS, ...PST108_UNIFIED_ADS, ...PST123_AD_DATA];
  }, []);

  // Écoute des mises à jour des ADs depuis les autres onglets / composants
  useEffect(() => {
    function handleUpdate() {
      setTick((t) => t + 1);
    }
    window.addEventListener("pst:ad-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("pst:ad-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Fermeture par Échap
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Statuts live pour chaque AD
  const adsWithLiveState = useMemo(() => {
    return allAds.map((ad) => {
      const status = loadAdStatus(ad.id, "todo");
      const draft = loadAdDraft(ad.id, "");
      const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
      return { ...ad, currentStatus: status, wordCount, hasDraft: draft.trim().length > 0 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAds, tick]);

  // Statistiques globales
  const stats = useMemo(() => {
    const total = adsWithLiveState.length;
    const todo = adsWithLiveState.filter((a) => a.currentStatus === "todo").length;
    const draft = adsWithLiveState.filter((a) => a.currentStatus === "draft").length;
    const ready = adsWithLiveState.filter((a) => a.currentStatus === "ready").length;
    const submitted = adsWithLiveState.filter((a) => a.currentStatus === "submitted").length;
    const corrected = adsWithLiveState.filter((a) => a.currentStatus === "corrected").length;
    const completed = submitted + corrected;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, todo, draft, ready, submitted, corrected, completed, percent };
  }, [adsWithLiveState]);

  // Filtrage
  const filteredAds = useMemo(() => {
    return adsWithLiveState.filter((ad) => {
      if (moduleFilter !== "all" && ad.moduleKey !== moduleFilter) return false;
      if (statusFilter !== "all" && ad.currentStatus !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = ad.titre.toLowerCase().includes(q);
        const matchProf = ad.enseignant.toLowerCase().includes(q);
        const matchConcepts = ad.conceptsCles.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchProf && !matchConcepts) return false;
      }
      return true;
    });
  }, [adsWithLiveState, moduleFilter, statusFilter, searchQuery]);

  function handleStatusChange(adId: string, newStatus: AdStatus) {
    playClickSound();
    saveAdStatus(adId, newStatus);
    setTick((t) => t + 1);
    toast.success(`Statut mis à jour : ${AD_STATUS_CONFIG[newStatus].label}`);
  }

  function handleNavigateToAd(ad: UnifiedAdItem) {
    playClickSound();
    onClose();
    if (typeof window !== "undefined") {
      window.location.href = `/${ad.moduleKey}?tab=ad`;
    }
  }

  function handleCopySummary() {
    playClickSound();
    const lines = [
      `📊 SUIVI DES ACTIVITÉS DISTANTES S1 (CNAM)`,
      `Progression globale : ${stats.completed}/${stats.total} terminées (${stats.percent}%)`,
      `Statuts : ${stats.submitted} déposées, ${stats.draft} en cours, ${stats.todo} à faire.`,
      "",
      ...adsWithLiveState.map(
        (ad) =>
          `- [${ad.moduleLabel}] ${ad.titre} (${ad.enseignant}) -> ${AD_STATUS_CONFIG[ad.currentStatus].label} (${ad.wordCount} mots)`,
      ),
    ];
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(lines.join("\n"));
      setCopiedSummary(true);
      playSuccessSound();
      triggerHaptic();
      toast.success("Synthèse copiée dans le presse-papier !");
      setTimeout(() => setCopiedSummary(false), 3000);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tableau de Bord Unifié des Activités Distantes S1"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">
        {/* En-tête */}
        <div className="px-3.5 py-3 sm:px-6 sm:py-5 bg-gradient-to-r from-amber-500/[0.06] via-transparent to-indigo-500/[0.04] border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl sm:rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Calendar className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="px-1.5 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 shrink-0">
                  Cockpit S1
                </span>
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 truncate hidden xs:inline">
                  13 Travaux Distants · PST106 · PST108 · PST123
                </span>
              </div>
              <h2 className="text-sm sm:text-xl font-serif font-bold text-slate-900 dark:text-white tracking-tight truncate">
                Tableau de Bord Unifié des Activités Distantes
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50/90 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Copié !
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copier la synthèse
                </>
              )}
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Barre de KPI et progression globale */}
        <AdDashboardStatsBar stats={stats} />

        {/* Barre de filtres et recherche */}
        <AdDashboardFilterBar
          allAdsCount={allAds.length}
          pst106Count={PST106_UNIFIED_ADS.length}
          pst108Count={PST108_UNIFIED_ADS.length}
          pst123Count={PST123_AD_DATA.length}
          moduleFilter={moduleFilter}
          onModuleFilterChange={setModuleFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* Liste des cartes d'AD (scrollable) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
          {filteredAds.length === 0 ? (
            <div className="p-10 sm:p-12 text-center text-slate-600 dark:text-slate-400 text-sm">
              Aucune activité distante ne correspond aux critères de recherche.
            </div>
          ) : (
            filteredAds.map((ad) => (
              <AdDashboardCard
                key={ad.id}
                ad={ad}
                onStatusChange={handleStatusChange}
                onNavigateToAd={handleNavigateToAd}
              />
            ))
          )}
        </div>

        {/* Pied de page */}
        <div className="px-3.5 py-3 sm:px-6 sm:py-4 bg-slate-50/90 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span className="hidden sm:inline">
            💡 Astuce : Vos rédactions sont sauvegardées sur votre navigateur et
            synchronisées en temps réel entre toutes les fenêtres.
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 font-semibold transition-colors ml-auto sm:ml-0 cursor-pointer shadow-2xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
