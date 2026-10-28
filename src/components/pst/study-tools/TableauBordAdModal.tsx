"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter,
  BarChart2,
  Calendar,
  Send,
  ExternalLink,
  Search,
  Check,
  Copy,
  Layers,
  GraduationCap,
} from "lucide-react";
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
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden">
        {/* En-tête */}
        <div className="p-3.5 sm:p-6 bg-gradient-to-r from-card via-card to-amber-500/[0.04] border-b border-border/70 flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl sm:rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Calendar className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="px-1.5 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 shrink-0">
                  Cockpit S1
                </span>
                <span className="text-[11px] sm:text-xs text-muted-foreground truncate hidden xs:inline">
                  13 Travaux Distants · PST106 · PST108 · PST123
                </span>
              </div>
              <h2 className="text-sm sm:text-xl font-serif font-bold text-foreground tracking-tight truncate">
                Tableau de Bord Unifié des Activités Distantes
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors shadow-2xs cursor-pointer"
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
              className="p-1.5 sm:p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Barre de KPI et progression globale */}
        <div className="p-3 sm:p-4 bg-muted/40 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-muted-foreground">Progression :</span>
              <span className="font-bold text-foreground font-mono text-xs sm:text-sm">
                {stats.completed}/{stats.total}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                ({stats.percent}%)
              </span>
            </div>

            <div className="h-4 w-px bg-border/80 hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-muted-foreground">
                <b className="text-foreground">{stats.submitted}</b> déposées
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span className="text-muted-foreground">
                <b className="text-foreground">{stats.draft}</b> brouillons
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/60 shrink-0" />
              <span className="text-muted-foreground">
                <b className="text-foreground">{stats.todo}</b> à faire
              </span>
            </div>
          </div>

          {/* Barre de progression visuelle */}
          <div className="w-full md:w-64 h-2 bg-muted rounded-full overflow-hidden border border-border/40">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>

        {/* Barre de filtres et recherche */}
        <div className="p-3 sm:p-4 bg-card border-b border-border/60 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Filtre par module (Apple Segmented Control) */}
          <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-muted/60 dark:bg-slate-900/80 rounded-xl sm:rounded-2xl border border-border/60 shadow-2xs overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
            {(
              [
                { key: "all", label: "Tous (13)" },
                { key: "pst106", label: "PST106 (3)" },
                { key: "pst108", label: "PST108 (6)" },
                { key: "pst123", label: "PST123 (4)" },
              ] as const
            ).map((m) => (
              <button
                key={m.key}
                onClick={() => {
                  playClickSound();
                  setModuleFilter(m.key);
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg sm:rounded-xl transition-all cursor-pointer shrink-0 ${
                  moduleFilter === m.key
                    ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs bg-muted/50 text-foreground border border-border/60 rounded-xl px-2.5 sm:px-3 py-1.5 focus:outline-none focus:border-border cursor-pointer flex-1 sm:flex-initial"
            >
              <option value="all">Tous statuts</option>
              <option value="todo">À faire</option>
              <option value="draft">Brouillon</option>
              <option value="ready">Prête</option>
              <option value="submitted">Déposée</option>
              <option value="corrected">Corrigée</option>
            </select>

            {/* Barre de recherche */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Rechercher une activité distante par thème, consigne ou module"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="pl-8 pr-3 py-1.5 text-xs bg-muted/40 text-foreground placeholder:text-muted-foreground border border-border/60 rounded-xl focus:outline-none focus:border-primary/60 w-full sm:w-48 md:w-60"
              />
            </div>
          </div>
        </div>

        {/* Liste des cartes d'AD (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredAds.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Aucune activité distante ne correspond aux critères de recherche.
            </div>
          ) : (
            filteredAds.map((ad) => {
              const cfg = AD_STATUS_CONFIG[ad.currentStatus];
              const moduleBadgeColors = {
                pst106: "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-500/30",
                pst108: "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/30",
                pst123: "bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-500/30",
              }[ad.moduleKey];

              return (
                <div
                  key={ad.id}
                  className="p-4 sm:p-5 bg-card/80 border border-border/70 rounded-2xl hover:border-border transition-all space-y-3 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border ${moduleBadgeColors}`}
                        >
                          {ad.moduleLabel}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {ad.enseignant}
                        </span>
                        <span className="text-border">·</span>
                        <span className="text-xs text-muted-foreground">
                          {ad.dateSeance}
                        </span>
                        {ad.dateLimite && (
                          <>
                            <span className="text-border">·</span>
                            <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 font-mono font-semibold">
                              <Clock className="w-3 h-3" />
                              {ad.dateLimite}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {ad.titre}
                      </h3>
                    </div>

                    {/* Statut & Sélecteur interactif */}
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={ad.currentStatus}
                        onChange={(e) =>
                          handleStatusChange(ad.id, e.target.value as AdStatus)
                        }
                        className={`text-xs font-semibold border rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer ${cfg.badgeClass}`}
                      >
                        {(Object.keys(AD_STATUS_CONFIG) as AdStatus[]).map((k) => (
                          <option key={k} value={k}>
                            {AD_STATUS_CONFIG[k].label}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleNavigateToAd(ad)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>Ouvrir</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Consigne courte et concepts clés */}
                  <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/60 font-sans">
                    {ad.consigne}
                  </div>

                  {/* Tags concepts & indicateur de brouillon */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/60 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {ad.conceptsCles.slice(0, 3).map((concept, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60"
                        >
                          {concept}
                        </span>
                      ))}
                      {ad.conceptsCles.length > 3 && (
                        <span className="text-[10px] text-muted-foreground/80 self-center">
                          +{ad.conceptsCles.length - 3} autres
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      {ad.hasDraft ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {ad.wordCount} mots sauvegardés
                        </span>
                      ) : (
                        <span className="text-muted-foreground italic">
                          Pas de brouillon rédigé
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pied de page */}
        <div className="p-4 bg-muted/30 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span className="hidden sm:inline">
            💡 Astuce : Vos rédactions sont sauvegardées sur votre navigateur et
            synchronisées en temps réel entre toutes les fenêtres.
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold transition-colors ml-auto sm:ml-0 cursor-pointer shadow-2xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
